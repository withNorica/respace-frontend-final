import React from 'react';

interface Props {
  id: string;
  onFileSelect: (file: File) => void;
  imageUrl: string | null;
}

const ImageUploader: React.FC<Props> = ({ onFileSelect, imageUrl }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      {imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
    </div>
  );
};

export default ImageUploader;