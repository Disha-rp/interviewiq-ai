import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { uploadResume } from '../../services/resumeService';
import { getResumes } from '../../services/resumeListService';

function ResumeUploadSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [resumes, setResumes] = useState([]);

  const loadResumes = async () => {
    try {
      const response = await getResumes();
      setResumes(response.data ?? []);
    } catch (loadError) {
      setError('Unable to load resumes.');
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('resume', selectedFile);

    setIsUploading(true);
    setError('');
    setMessage('');

    try {
      await uploadResume(formData);
      setMessage('Resume uploaded successfully.');
      setSelectedFile(null);
      await loadResumes();
    } catch (uploadError) {
      setError('Unable to upload the resume.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-[#0F172A]">Upload Resume</h3>
          <p className="mt-2 text-sm leading-6 text-[#64748B]">
            Upload your latest resume in PDF format.
          </p>
        </div>

        <label className="flex cursor-pointer flex-col items-start gap-2 rounded-[20px] border border-dashed border-[#E2E8F0] bg-[#F8FAFC] px-4 py-5 text-sm text-[#64748B]">
          <span className="font-medium text-[#0F172A]">Choose PDF file</span>
          <input
            type="file"
            accept=".pdf"
            className="sr-only"
            onChange={handleFileChange}
          />
          <span>Select a PDF file from your device.</span>
        </label>

        {selectedFile ? (
          <p className="text-sm font-medium text-[#0F4C81]">Selected file: {selectedFile.name}</p>
        ) : null}

        <Button type="button" variant="primary" className="w-full sm:w-auto" onClick={handleUpload} disabled={isUploading} loading={isUploading}>
          {isUploading ? 'Uploading...' : 'Upload Resume'}
        </Button>

        {message ? <p className="text-sm font-medium text-[#22C55E]">{message}</p> : null}
        {error ? <p className="text-sm font-medium text-[#EF4444]">{error}</p> : null}

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-[#0F172A]">Uploaded resumes</h4>
          {resumes.length === 0 ? (
            <p className="text-sm text-[#64748B]">No resumes uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {resumes.map((resume) => {
                const fileName = resume.resume?.split('/').pop() ?? 'Resume file';
                const uploadedDate = resume.uploaded_at
                  ? new Date(resume.uploaded_at).toLocaleDateString()
                  : 'Unknown date';

                return (
                  <li key={resume.id} className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                    <p className="text-sm font-medium text-[#0F172A]">{fileName}</p>
                    <p className="text-xs text-[#64748B]">Upload date: {uploadedDate}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ResumeUploadSection;
