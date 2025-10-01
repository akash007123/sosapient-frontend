import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, IndianRupee, Send, CheckCircle, AlertCircle, Share2, Copy, UploadCloud, FileText   } from 'lucide-react';

const JobDetails: React.FC = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: '',
    position: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = job ? `${job.title} at SoSapient` : 'Job at SoSapient';
  // const encodedUrl = encodeURIComponent(pageUrl);
  // const encodedTitle = encodeURIComponent(shareTitle);
  // const shareLinks = {
  //   linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  //   twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
  //   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
  //   whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
  //   email: `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`
  // };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setNotification({ type: 'success', message: 'Link copied to clipboard!' });
      setTimeout(() => setNotification(null), 2000);
    } catch (_) {
      setNotification({ type: 'error', message: 'Unable to copy link' });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const nativeShare = async () => {
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: shareTitle, url: pageUrl });
      } else {
        copyLink();
      }
    } catch (_) {}
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/jobs/${jobId}`);
        const data = await res.json();
        if (!data?.success) throw new Error(data?.message || 'Failed to load job');
        setJob(data.data);
        setApplicationData(prev => ({ ...prev, position: data.data?.title || '' }));
      } catch (e: any) {
        setError(e?.message || 'Error fetching job');
      } finally {
        setLoading(false);
      }
    };
    if (jobId) fetchJob();
  }, [jobId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setNotification(null);
    try {
      const currentErrors: Record<string, string> = {};
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!applicationData.name.trim()) currentErrors.name = 'Full name is required';
      if (!applicationData.email.trim()) currentErrors.email = 'Email is required';
      else if (!emailRegex.test(applicationData.email)) currentErrors.email = 'Please enter a valid email';
      if (!applicationData.phone.trim()) currentErrors.phone = 'Phone is required';
      if (!applicationData.experience.trim()) currentErrors.experience = 'Experience is required';
      if (!applicationData.resume) currentErrors.resume = 'Resume is required';
      if (applicationData.expectedSalary && isNaN(Number(applicationData.expectedSalary))) currentErrors.expectedSalary = 'Expected salary must be a number';

      if (Object.keys(currentErrors).length > 0) {
        setErrors(currentErrors);
        throw new Error('Please fill in all required fields');
      }
      const formData = new FormData();
      Object.entries(applicationData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (key === 'resume' && value instanceof File) {
            formData.append('resume', value, value.name);
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/career`, {
        method: 'POST',
        body: formData
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || 'Failed to submit application');
      setNotification({ type: 'success', message: 'Application submitted successfully!' });
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        resume: null,
        coverLetter: '',
        position: job?.title || '',
        experience: '',
        currentCompany: '',
        expectedSalary: '',
        noticePeriod: ''
      });
      setErrors({});
    } catch (err: any) {
      setNotification({ type: 'error', message: err?.message || 'Failed to submit application' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="max-w-5xl mx-auto p-6">Loading...</div>;
  }
  if (error || !job) {
    return <div className="max-w-5xl mx-auto p-6 text-red-600">{error || 'Job not found'}</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">{job.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" /> {job.location}</span>
              <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" /> {job.experience}</span>
              {job.salary ? (
                <span className="inline-flex items-center gap-2"><IndianRupee className="w-4 h-4" /> {job.salary}</span>
              ) : null}
              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">{job.type}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Posted {new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }).format(-Math.round((Date.now() - new Date(job.createdAt).getTime())/ (1000*60*60*24)), 'day')}</span>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button onClick={nativeShare} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800">
                <Share2 className="w-4 h-4" /> Share
              </button>
              {/* <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white text-sm"><i className="bi bi-linkedin"></i></a>
              <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-black text-white text-sm"><i className="bi bi-twitter-x"></i></a>
              <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[#1877F2] text-white text-sm"><i className="bi bi-facebook"></i></a>
              <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-sm"><i className="bi bi-whatsapp"></i></a>
              <a href={shareLinks.email}target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm"><i className="bi bi-envelope-at"></i></a> */}
              
              <button onClick={copyLink} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm">
                <Copy className="w-4 h-4" /> Copy link
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">About the role</h2>
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{job.description}</p>
              </div>

              {Array.isArray(job.requirements) && job.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Requirements</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    {job.requirements.map((req: string, idx: number) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Responsibilities</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    {job.responsibilities.map((item: string, idx: number) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {Array.isArray(job.benefits) && job.benefits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Benefits</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    {job.benefits.map((b: string, idx: number) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Apply for this job</h3>

                {notification && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800'}`}>
                    {notification.type === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                    <span className={notification.type === 'success' ? 'text-green-700 dark:text-green-300 text-sm' : 'text-red-700 dark:text-red-300 text-sm'}>
                      {notification.message}
                    </span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Full Name *"
                      value={applicationData.name}
                      onChange={e => { setApplicationData({ ...applicationData, name: e.target.value }); if (errors.name) setErrors(prev => ({ ...prev, name: '' })); }}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name}</p> : null}
                  </div>

                  <div>
                    <input
                      type="email"
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Email *"
                      value={applicationData.email}
                      onChange={e => { setApplicationData({ ...applicationData, email: e.target.value }); if (errors.email) setErrors(prev => ({ ...prev, email: '' })); }}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
                  </div>

                  <div>
                    <input
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Phone *"
                      value={applicationData.phone}
                      onChange={e => { setApplicationData({ ...applicationData, phone: e.target.value }); if (errors.phone) setErrors(prev => ({ ...prev, phone: '' })); }}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone}</p> : null}
                  </div>

                  <div>
                    <input
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.experience ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Experience *"
                      value={applicationData.experience}
                      onChange={e => { setApplicationData({ ...applicationData, experience: e.target.value }); if (errors.experience) setErrors(prev => ({ ...prev, experience: '' })); }}
                      aria-invalid={Boolean(errors.experience)}
                    />
                    {errors.experience ? <p className="mt-1 text-xs text-red-600">{errors.experience}</p> : null}
                  </div>

                  <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Current Company" value={applicationData.currentCompany} onChange={e => setApplicationData({ ...applicationData, currentCompany: e.target.value })} />

                  <div>
                    <input
                      className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${errors.expectedSalary ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'}`}
                      placeholder="Expected Salary"
                      value={applicationData.expectedSalary}
                      onChange={e => { setApplicationData({ ...applicationData, expectedSalary: e.target.value }); if (errors.expectedSalary) setErrors(prev => ({ ...prev, expectedSalary: '' })); }}
                      aria-invalid={Boolean(errors.expectedSalary)}
                    />
                    {errors.expectedSalary ? <p className="mt-1 text-xs text-red-600">{errors.expectedSalary}</p> : null}
                  </div>

                  <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Notice Period" value={applicationData.noticePeriod} onChange={e => setApplicationData({ ...applicationData, noticePeriod: e.target.value })} />
                  <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Cover Letter" value={applicationData.coverLetter} onChange={e => setApplicationData({ ...applicationData, coverLetter: e.target.value })} />
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Resume *
                    </label>
                    <div className="flex items-center justify-between rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <FileText className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {applicationData.resume ? applicationData.resume.name : 'Upload your resume'}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-300">PDF, DOC, DOCX up to 5MB</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="resume-upload" className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-primary-600 hover:bg-primary-700 text-white text-sm cursor-pointer">
                          <UploadCloud className="w-4 h-4" />
                          Browse
                        </label>
                        <input
                          id="resume-upload"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          required
                          onChange={e => {
                            const file = e.target.files?.[0] || null;
                            if (file && file.size > 5 * 1024 * 1024) {
                              setErrors(prev => ({ ...prev, resume: 'File too large. Max size is 5MB.' }));
                              e.currentTarget.value = '';
                              return;
                            }
                            setApplicationData({ ...applicationData, resume: file });
                            if (errors.resume) setErrors(prev => ({ ...prev, resume: '' }));
                          }}
                          className="sr-only"
                        />
                      </div>
                    </div>
                    {errors.resume ? <p className="mt-2 text-xs text-red-600">{errors.resume}</p> : null}
                  </div>

                  <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: isSubmitting ? 1 : 1.02 }} whileTap={{ scale: isSubmitting ? 1 : 0.98 }} className="w-full py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50">
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Application</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;


