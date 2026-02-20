import { useState, useRef } from 'react';

function UploadModal({ onClose, onSuccess }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile || !title.trim()) {
      setError('Title and video file are required');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('duration', duration.trim() || '0:00');
    formData.append('isShort', isShort);
    formData.append('video', videoFile);
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Upload failed');
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <div className="upload-overlay" onClick={onClose} />
      <div className="upload-modal">
        <div className="upload-modal-header">
          <h2>Upload video</h2>
          <button className="upload-close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#fff" d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          {!videoFile ? (
            <div
              className={`upload-dropzone${dragOver ? ' dragover' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current.click()}
            >
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="#aaa" d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/>
              </svg>
              <p>Drag and drop a video file or click to select</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                style={{ display: 'none' }}
                onChange={(e) => e.target.files[0] && setVideoFile(e.target.files[0])}
              />
            </div>
          ) : (
            <>
              <div className="upload-file-info">
                <span>{videoFile.name}</span>
                <button type="button" onClick={() => setVideoFile(null)}>Change</button>
              </div>

              <label className="upload-label">
                Title *
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Add a title"
                  className="upload-input"
                />
              </label>

              <label className="upload-label">
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell viewers about your video"
                  className="upload-textarea"
                />
              </label>

              <label className="upload-label">
                Duration
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 10:30"
                  className="upload-input"
                />
              </label>

              <label className="upload-label">
                Thumbnail
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files[0] && setThumbnailFile(e.target.files[0])}
                  className="upload-file-input"
                />
              </label>

              <label className="upload-checkbox-label">
                <input
                  type="checkbox"
                  checked={isShort}
                  onChange={(e) => setIsShort(e.target.checked)}
                />
                This is a Short
              </label>

              {error && <p className="upload-error">{error}</p>}

              <button
                type="submit"
                className="upload-submit-btn"
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default UploadModal;
