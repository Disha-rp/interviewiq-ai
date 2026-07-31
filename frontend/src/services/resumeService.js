import api from './api';

export function uploadResume(formData) {
  return api.post('/resumes/upload/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
