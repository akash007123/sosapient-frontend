import React, { useEffect, useState } from "react";

interface JobPayload {
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  experience: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  status: "open" | "closed";
}

const emptyJob: JobPayload = {
  title: "",
  department: "",
  location: "",
  type: "Full-time",
  salary: "",
  experience: "",
  description: "",
  requirements: [],
  responsibilities: [],
  benefits: [],
  status: "open",
};

const JobAdmin: React.FC = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<JobPayload>(emptyJob);
  const [activeTab, setActiveTab] = useState<"form" | "list">("form");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/jobs`);
      const data = await res.json();
      if (data?.success) setJobs(data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editing ? "PATCH" : "POST";
    const url = editing
      ? `${import.meta.env.VITE_BASE_URL}/api/jobs/${editing._id}`
      : `${import.meta.env.VITE_BASE_URL}/api/jobs`;
    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(emptyJob);
    setEditing(null);
    fetchJobs();
  };

  const onDelete = async (id: string) => {
    await fetch(`${import.meta.env.VITE_BASE_URL}/api/jobs/${id}`, {
      method: "DELETE",
    });
    fetchJobs();
  };

  const toArray = (value: string) =>
    value
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

  const onChangeStatus = async (id: string, status: 'open' | 'closed') => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/jobs/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      // Optimistic UI: update local state
      setJobs(prev => prev.map(j => j._id === id ? { ...j, status } : j));
    } catch (_) {
      // Fallback: refetch
      fetchJobs();
    }
  };

  const formatPosted = (iso?: string) => {
    if (!iso) return '';
    try {
      const d = new Date(iso).getTime();
      const diff = Date.now() - d;
      const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
      const sec = Math.round(diff / 1000);
      const min = Math.round(sec / 60);
      const hr = Math.round(min / 60);
      const day = Math.round(hr / 24);
      const week = Math.round(day / 7);
      const month = Math.round(day / 30);
      const year = Math.round(day / 365);
      if (Math.abs(sec) < 60) return rtf.format(-sec, 'second');
      if (Math.abs(min) < 60) return rtf.format(-min, 'minute');
      if (Math.abs(hr) < 24) return rtf.format(-hr, 'hour');
      if (Math.abs(day) < 7) return rtf.format(-day, 'day');
      if (Math.abs(week) < 5) return rtf.format(-week, 'week');
      if (Math.abs(month) < 12) return rtf.format(-month, 'month');
      return rtf.format(-year, 'year');
    } catch {
      return '';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Job Postings Admin</h1>

      <div className="mb-6 flex gap-2 border-b">
        <button
          className={`px-4 py-2 -mb-px border-b-2 ${
            activeTab === "form"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("form")}
        >
          Post a Job
        </button>
        <button
          className={`px-4 py-2 -mb-px border-b-2 ${
            activeTab === "list"
              ? "border-primary-600 text-primary-600"
              : "border-transparent text-gray-600"
          }`}
          onClick={() => setActiveTab("list")}
        >
          Job Listings
        </button>
      </div>

      {activeTab === "form" && (
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            className="border p-2 rounded"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Type (Full-time/Part-time)"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
          />
          <input
            className="border p-2 rounded"
            placeholder="Experience"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            required
          />
          <textarea
            className="border p-2 rounded md:col-span-2"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Requirements (one per line)"
            value={form.requirements.join("\n")}
            onChange={(e) =>
              setForm({ ...form, requirements: toArray(e.target.value) })
            }
          />
          <textarea
            className="border p-2 rounded"
            placeholder="Responsibilities (one per line)"
            value={form.responsibilities.join("\n")}
            onChange={(e) =>
              setForm({ ...form, responsibilities: toArray(e.target.value) })
            }
          />
          <textarea
            className="border p-2 rounded md:col-span-2"
            placeholder="Benefits (one per line)"
            value={form.benefits.join("\n")}
            onChange={(e) =>
              setForm({ ...form, benefits: toArray(e.target.value) })
            }
          />
          <select
            className="border p-2 rounded"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value as any })
            }
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
          <div className="md:col-span-2 flex gap-2">
            <button
              className="px-4 py-2 bg-primary-600 text-white rounded"
              type="submit"
            >
              {editing ? "Update Job" : "Create Job"}
            </button>
            {editing && (
              <button
                className="px-4 py-2 border rounded"
                type="button"
                onClick={() => {
                  setEditing(null);
                  setForm(emptyJob);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {activeTab === "list" && (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
             <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-2">Title</th>
                <th className="text-left p-2">Department</th>
                <th className="text-left p-2">Location</th>
                <th className="text-left p-2">Type</th>
                 <th className="text-left p-2">Posted</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="p-2" colSpan={6}>
                    Loading...
                  </td>
                </tr>
              ) : jobs.length === 0 ? (
                <tr>
                  <td className="p-2" colSpan={6}>
                    No jobs
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job._id} className="border-t">
                    <td className="p-2">{job.title}</td>
                    <td className="p-2">{job.department}</td>
                    <td className="p-2">{job.location}</td>
                   <td className="p-2">{job.type}</td>
                   <td className="p-2">{formatPosted(job.createdAt)}</td>
                     <td className="p-2">
                       <select
                         className="border p-1 rounded"
                         value={job.status}
                         onChange={(e) => onChangeStatus(job._id, e.target.value as 'open' | 'closed')}
                       >
                         <option value="open">open</option>
                         <option value="closed">closed</option>
                       </select>
                     </td>
                    <td className="p-2 flex gap-2">
                      <button
                        className="px-2 py-1 border rounded"
                        onClick={() => {
                          setEditing(job);
                          const {
                            title,
                            department,
                            location,
                            type,
                            salary,
                            experience,
                            description,
                            requirements,
                            responsibilities,
                            benefits,
                            status,
                          } = job;
                          setForm({
                            title,
                            department,
                            location,
                            type,
                            salary,
                            experience,
                            description,
                            requirements: requirements || [],
                            responsibilities: responsibilities || [],
                            benefits: benefits || [],
                            status,
                          });
                          setActiveTab("form");
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 border rounded text-red-600"
                        onClick={() => onDelete(job._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default JobAdmin;
