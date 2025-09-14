import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Download,
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

interface CareerApplication {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  currentCompany: string;
  expectedSalary: string;
  noticePeriod: string;
  coverLetter: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  createdAt: string;
  resume: {
    filename: string;
    contentType: string;
  };
}

const CareerTable: React.FC = () => {
  const [applications, setApplications] = useState<CareerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<CareerApplication | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career`);
      const data = await response.json();
      if (data.success) {
        setApplications(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id: string, newStatus: CareerApplication['status']) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        setApplications(applications.map(app => 
          app._id === id ? { ...app, status: newStatus } : app
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
    if (!window.confirm('Are you sure you want to delete this application?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setApplications(applications.filter(app => app._id !== id));
        setNotification({
          type: 'success',
          message: 'Application deleted successfully'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to delete application'
      });
    }
  };

  // Handle resume download
  const handleDownload = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career/${id}/resume`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Failed to download resume'
      });
    }
  };

  // Handle update
  const handleUpdate = async (id: string, updatedData: Partial<CareerApplication>) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      const data = await response.json();
      if (data.success) {
        setApplications(applications.map(app => 
          app._id === id ? { ...app, ...updatedData } : app
        ));
        setNotification({
          type: 'success',
          message: 'Application updated successfully'
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to update application'
      });
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(16);
    doc.text('Career Applications', 14, 15);
    
    // Add date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

    // Add table
    autoTable(doc, {
      startY: 30,
      head: [['Name', 'Email', 'Position', 'Experience', 'Status', 'Applied On']],
      body: applications.map(app => [
        app.name,
        app.email,
        app.position,
        app.experience,
        app.status,
        new Date(app.createdAt).toLocaleDateString()
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
    doc.save('career-applications.pdf');
  };

  const exportToExcel = () => {
    // Prepare data for Excel
    const data = applications.map(app => ({
      Name: app.name,
      Email: app.email,
      Position: app.position,
      Experience: app.experience,
      'Current Company': app.currentCompany,
      'Expected Salary': app.expectedSalary,
      'Notice Period': app.noticePeriod,
      Status: app.status,
      'Applied On': new Date(app.createdAt).toLocaleDateString()
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Career Applications');

    // Save the Excel file
    XLSX.writeFile(wb, 'career-applications.xlsx');
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

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Career Applications</h2>
              <p className="text-gray-600 mt-2">Manage job applications and candidates</p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToPDF}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-5 h-5 mr-2" />
                Export PDF
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={exportToExcel}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Table className="w-5 h-5 mr-2" />
                Export Excel
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="block sm:hidden space-y-4 p-4">
          {applications.map((application) => (
            <div key={application._id} className="bg-white rounded-lg shadow p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900">{application.name}</h3>
                  <p className="text-sm text-gray-500">{application.email}</p>
                  <p className="text-sm text-gray-500">{application.phone}</p>
                </div>
                <select
                  value={application.status}
                  onChange={(e) => handleStatusUpdate(application._id, e.target.value as CareerApplication['status'])}
                  className={`text-sm rounded-full px-3 py-1 font-medium ${
                    application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                    application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}
                >
                  <option value="pending">Pending</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm">
                  <span className="font-medium">Position:</span> {application.position}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Experience:</span> {application.experience}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Current Company:</span> {application.currentCompany}
                </p>
                <p className="text-sm text-gray-500">
                  Applied: {new Date(application.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-2 border-t">
                <button
                  onClick={() => handleDownload(application._id)}
                  className="text-blue-600 hover:text-blue-900"
                  title="Download Resume"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedApplication(application);
                    setIsViewModalOpen(true);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedApplication(application);
                    setIsEditModalOpen(true);
                  }}
                  className="text-yellow-600 hover:text-yellow-900"
                  title="Edit Application"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(application._id)}
                  className="text-red-600 hover:text-red-900"
                  title="Delete Application"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applied On
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((application) => (
                  <tr key={application._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{application.name}</div>
                        <div className="text-sm text-gray-500">{application.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={application.status}
                        onChange={(e) => handleStatusUpdate(application._id, e.target.value as CareerApplication['status'])}
                        className={`text-sm rounded-full px-3 py-1 font-medium ${
                          application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          application.status === 'shortlisted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleDownload(application._id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Download Resume"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setIsViewModalOpen(true);
                          }}
                          className="text-gray-600 hover:text-gray-900"
                          title="View Details"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedApplication(application);
                            setIsEditModalOpen(true);
                          }}
                          className="text-yellow-600 hover:text-yellow-900"
                          title="Edit Application"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(application._id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete Application"
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
      </div>

      {/* View Modal */}
      {isViewModalOpen && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedApplication.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedApplication.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedApplication.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="font-medium">{selectedApplication.position}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{selectedApplication.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Company</p>
                  <p className="font-medium">{selectedApplication.currentCompany}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Expected Salary</p>
                  <p className="font-medium">{selectedApplication.expectedSalary}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Notice Period</p>
                  <p className="font-medium">{selectedApplication.noticePeriod}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cover Letter</p>
                <p className="mt-1 text-gray-900 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
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
      {isEditModalOpen && selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Edit Application</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={selectedApplication.name}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
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
                    value={selectedApplication.email}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
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
                    value={selectedApplication.phone}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        phone: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Position</label>
                  <input
                    type="text"
                    value={selectedApplication.position}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        position: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience</label>
                  <input
                    type="text"
                    value={selectedApplication.experience}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        experience: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Company</label>
                  <input
                    type="text"
                    value={selectedApplication.currentCompany}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        currentCompany: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expected Salary</label>
                  <input
                    type="text"
                    value={selectedApplication.expectedSalary}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        expectedSalary: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Notice Period</label>
                  <input
                    type="text"
                    value={selectedApplication.noticePeriod}
                    onChange={(e) => {
                      setSelectedApplication({
                        ...selectedApplication,
                        noticePeriod: e.target.value
                      });
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Letter</label>
                <textarea
                  value={selectedApplication.coverLetter}
                  onChange={(e) => {
                    setSelectedApplication({
                      ...selectedApplication,
                      coverLetter: e.target.value
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
                    const { _id, createdAt, resume, ...updateData } = selectedApplication;
                    handleUpdate(_id, updateData);
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

export default CareerTable; 