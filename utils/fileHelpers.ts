
/**
 * Optimizes an image file by resizing and converting to WebP.
 * @param file The input file (JPEG, PNG, etc.)
 * @param maxWidth Maximum width in pixels (default 1920)
 * @param quality Quality from 0 to 1 (default 0.8)
 * @returns Promise resolving to the Base64 Data URL of the optimized image
 */
export const optimizeImage = (file: File, maxWidth = 1920, quality = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file.type.match(/image.*/)) {
      reject(new Error('File is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Resize logic
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
        }

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP
        // If the browser supports WebP (most modern ones do), this reduces size significantly
        const dataUrl = canvas.toDataURL('image/webp', quality);
        resolve(dataUrl);
      };
      
      img.onerror = (err) => reject(err);
    };
    
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Validates file size and type.
 * @param file The file to validate
 * @param type 'image' | 'video'
 * @returns Error string or null if valid
 */
export const validateFile = (file: File, type: 'image' | 'video'): string | null => {
    const maxSize = type === 'image' ? 10 * 1024 * 1024 : 50 * 1024 * 1024; // 10MB for img, 50MB for video
    
    if (file.size > maxSize) {
        return `File too large. Max size for ${type} is ${type === 'image' ? '10MB' : '50MB'}.`;
    }

    if (type === 'image' && !file.type.startsWith('image/')) {
        return 'Invalid file type. Please upload an image.';
    }

    if (type === 'video' && !file.type.startsWith('video/')) {
        return 'Invalid file type. Please upload a video.';
    }

    return null;
};
