/**
 * Upload service for handling file uploads to the server
 */

const UPLOAD_API_URL = 'https://hair-aura.debesties.com/api/upload.php';

export interface UploadResponse {
  url: string;
  error?: string;
}

/**
 * Uploads a file to the server
 * @param file The file to upload
 * @returns Promise with the public URL of the uploaded file
 */
export const uploadFile = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(UPLOAD_API_URL, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(errorData.error || 'Upload failed');
    }

    const data: UploadResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    if (!data.url) {
      throw new Error('No URL returned from server');
    }

    return data.url;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

/**
 * Uploads multiple files and returns their URLs
 * @param files Array of files to upload
 * @returns Promise with array of public URLs
 */
export const uploadFiles = async (files: File[]): Promise<string[]> => {
  const uploadPromises = files.map(file => uploadFile(file));
  return Promise.all(uploadPromises);
};

