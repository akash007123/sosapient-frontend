import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2,
  AlertCircle,
  CheckCircle,
  X,
  FileText,
  Table
} from 'lucide-react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

interface ContactSubmission {
  _id: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

const PAGE_SIZE = 10;

const ContactTable: React.FC = () => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Search, filter, and pagination
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ContactSubmission['status']>('all');
  const [page, setPage] = useState(1);

  // Fetch submissions
  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contact`);
      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Filtering and searching
  useEffect(() => {
    let filtered = submissions;
    if (statusFilter !== 'all') {
      filtered = filtered.filter(sub => sub.status === statusFilter);
    }
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      filtered = filtered.filter(sub =>
        sub.name.toLowerCase().includes(s) ||
        sub.email.toLowerCase().includes(s) ||
        (sub.subject && sub.subject.toLowerCase().includes(s)) ||
        (sub.company && sub.company.toLowerCase().includes(s)) ||
        (sub.phone && sub.phone.toLowerCase().includes(s))
      );
    }
    setFilteredSubmissions(filtered);
    setPage(1); // Reset to first page on filter/search change
  }, [submissions, search, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / PAGE_SIZE);
  const paginatedSubmissions = filteredSubmissions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: ContactSubmission['status']) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmissions(submissions.map(sub => 
          sub._id === id ? { ...sub, status: newStatus } : sub
        ));
        setNotification({
          type: 'success',
          message: 'Status updated successfully'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update status'
      });
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contact/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setSubmissions(submissions.filter(sub => sub._id !== id));
        setNotification({
          type: 'success',
          message: 'Submission deleted successfully'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete submission'
      });
    }
  };

  // Handle update
  const handleUpdate = async (id: string, updatedData: Partial<ContactSubmission>) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.success) {
        setSubmissions(submissions.map(sub => 
          sub._id === id ? { ...sub, ...updatedData } : sub
        ));
        setNotification({
          type: 'success',
          message: 'Contact information updated successfully'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update contact information'
      });
    }
  };

  // Enhanced PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Contact Submissions', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    // Add table
    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Email', 'Phone', 'Company', 'Subject', 'Status', 'Received On']],
      body: filteredSubmissions.map(sub => [
        sub.name,
        sub.email,
        sub.phone || '-',
        sub.company || '-',
        sub.subject,
        sub.status,
        new Date(sub.createdAt).toLocaleDateString()
      ]),
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontSize: 10,
        fontStyle: 'bold',
      },
    });

    // Save the PDF
    doc.save('contact_submissions.pdf');
  };

  // Excel Export
  const handleExportExcel = () => {
    // Prepare data for Excel
    const data = filteredSubmissions.map(sub => ({
      Name: sub.name,
      Email: sub.email,
      Phone: sub.phone || '-',
      Company: sub.company || '-',
      Subject: sub.subject,
      Message: sub.message,
      Budget: sub.budget || '-',
      Timeline: sub.timeline || '-',
      Status: sub.status,
      'Received On': new Date(sub.createdAt).toLocaleDateString()
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Contact Submissions');

    // Save the Excel file
    XLSX.writeFile(wb, 'contact_submissions.xlsx');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Search, Filter, Export */}
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name, email, subject..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportPDF}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FileText className="w-4 h-4" />
            Export PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleExportExcel}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Table className="w-4 h-4" />
            Export Excel
          </motion.button>
        </div>
      </div>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-6 p-4 rounded-lg flex items-center space-x-3 ${
            notification.type === 'success'
              ? 'bg-green-50 border border-green-200'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <p className={
            notification.type === 'success'
              ? 'text-green-700'
              : 'text-red-700'
          }>
            {notification.message}
          </p>
        </motion.div>
      )}

      {/* Mobile Card View */}
      <div className="block sm:hidden space-y-4">
        {paginatedSubmissions.map((submission) => (
          <div key={submission._id} className="bg-white rounded-lg shadow p-4 space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{submission.name}</h3>
                <p className="text-sm text-gray-500">{submission.email}</p>
                {submission.phone && (
                  <p className="text-sm text-gray-500">{submission.phone}</p>
                )}
              </div>
              <select
                value={submission.status}
                onChange={(e) => handleStatusUpdate(submission._id, e.target.value as ContactSubmission['status'])}
                className={`text-sm rounded-full px-3 py-1 font-medium ${
                  submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                  submission.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                  submission.status === 'replied' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Subject:</span> {submission.subject}
              </p>
              {submission.budget && (
                <p className="text-sm">
                  <span className="font-medium">Budget:</span> {submission.budget}
                </p>
              )}
              {submission.timeline && (
                <p className="text-sm">
                  <span className="font-medium">Timeline:</span> {submission.timeline}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Received: {new Date(submission.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-2 border-t">
              <button
                onClick={() => {
                  setSelectedSubmission(submission);
                  setIsViewModalOpen(true);
                }}
                className="text-gray-600 hover:text-gray-900"
                title="View Details"
              >
                <Eye className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  setSelectedSubmission(submission);
                  setIsEditModalOpen(true);
                }}
                className="text-yellow-600 hover:text-yellow-900"
                title="Edit Submission"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(submission._id)}
                className="text-red-600 hover:text-red-900"
                title="Delete Submission"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden sm:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Received On
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSubmissions.map((submission) => (
                <tr key={submission._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">{submission.name}</div>
                      <div className="text-sm text-gray-500">{submission.email}</div>
                      {submission.phone && (
                        <div className="text-sm text-gray-500">{submission.phone}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{submission.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      {submission.budget && (
                        <div className="text-sm text-gray-900">Budget: {submission.budget}</div>
                      )}
                      {submission.timeline && (
                        <div className="text-sm text-gray-500">Timeline: {submission.timeline}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={submission.status}
                      onChange={(e) => handleStatusUpdate(submission._id, e.target.value as ContactSubmission['status'])}
                      className={`text-sm rounded-full px-3 py-1 font-medium ${
                        submission.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        submission.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                        submission.status === 'replied' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="replied">Replied</option>
                      <option value="archived">Archived</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setIsViewModalOpen(true);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSubmission(submission);
                          setIsEditModalOpen(true);
                        }}
                        className="text-yellow-600 hover:text-yellow-900"
                        title="Edit Submission"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(submission._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Submission"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * PAGE_SIZE + 1}-
          {Math.min(page * PAGE_SIZE, filteredSubmissions.length)} of {filteredSubmissions.length}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-2 py-1">{page} / {totalPages || 1}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0}
            className="px-3 py-1 rounded bg-gray-100 text-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4"
          >
            <h3 className="text-xl font-bold mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedSubmission.email}</p>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{selectedSubmission.phone}</p>
                  </div>
                )}
                {selectedSubmission.company && (
                  <div>
                    <p className="text-sm text-gray-500">Company</p>
                    <p className="font-medium">{selectedSubmission.company}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{selectedSubmission.subject}</p>
                </div>
                {selectedSubmission.budget && (
                  <div>
                    <p className="text-sm text-gray-500">Budget</p>
                    <p className="font-medium">{selectedSubmission.budget}</p>
                  </div>
                )}
                {selectedSubmission.timeline && (
                  <div>
                    <p className="text-sm text-gray-500">Timeline</p>
                    <p className="font-medium">{selectedSubmission.timeline}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && selectedSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Edit Contact Information</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={selectedSubmission.name}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        name: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={selectedSubmission.email}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        email: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={selectedSubmission.phone || ''}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        phone: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    value={selectedSubmission.company || ''}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        company: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    value={selectedSubmission.subject}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        subject: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Budget</label>
                  <select
                    value={selectedSubmission.budget || ''}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        budget: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-10k">Under $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="over-100k">Over $100,000</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeline</label>
                  <select
                    value={selectedSubmission.timeline || ''}
                    onChange={(e) => {
                      setSelectedSubmission({
                        ...selectedSubmission,
                        timeline: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  >
                    <option value="">Select timeline</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={selectedSubmission.message}
                  onChange={(e) => {
                    setSelectedSubmission({
                      ...selectedSubmission,
                      message: e.target.value
                    });
                  }}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const { status, ...updateData } = selectedSubmission;
                    handleUpdate(selectedSubmission._id, updateData);
                    setIsEditModalOpen(false);
                  }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ContactTable;