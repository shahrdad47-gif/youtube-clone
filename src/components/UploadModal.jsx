import { useState, useRef } from 'react';

const STEPS = ['Details', 'Video elements', 'Checks', 'Visibility'];

function captureVideoThumbnail(file) {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.src = URL.createObjectURL(file);
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(1, video.duration * 0.1);
    });
    video.addEventListener('seeked', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(video.src);
        resolve(blob);
      }, 'image/jpeg', 0.85);
    });
    video.addEventListener('error', () => resolve(null));
  });
}

function UploadModal({ onClose, onSuccess }) {
  const [phase, setPhase] = useState('select'); // select | form | uploading | done
  const [step, setStep] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isShort, setIsShort] = useState(false);
  const [visibility, setVisibility] = useState('public');
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');
  const [duration, setDuration] = useState('0:00');

  const fileInputRef = useRef(null);
  const thumbInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith('video/')) return;
    setVideoFile(file);
    setTitle(file.name.replace(/\.[^/.]+$/, ''));
    const previewUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(previewUrl);
    setPhase('form');
    setStep(0);

    // Auto-detect Short and duration from metadata
    const videoEl = document.createElement('video');
    videoEl.preload = 'metadata';
    videoEl.src = previewUrl;
    videoEl.addEventListener('loadedmetadata', () => {
      if (videoEl.videoHeight > videoEl.videoWidth) setIsShort(true);
      const secs = Math.floor(videoEl.duration);
      const m = Math.floor(secs / 60);
      const s = String(secs % 60).padStart(2, '0');
      setDuration(`${m}:${s}`);
    });

    // Auto-capture a thumbnail from the video
    const blob = await captureVideoThumbnail(file);
    if (blob) {
      const thumbFile = new File([blob], 'thumbnail.jpg', { type: 'image/jpeg' });
      setThumbnailFile(thumbFile);
      setThumbnailPreview(URL.createObjectURL(blob));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handlePublish = () => {
    if (!title.trim()) { setError('Title is required'); return; }
    setError('');
    setPhase('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('duration', duration);
    formData.append('isShort', isShort);
    formData.append('video', videoFile);
    if (thumbnailFile) formData.append('thumbnail', thumbnailFile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/videos');
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) setUploadProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress(100);
        setPhase('done');
      } else {
        setPhase('form');
        try { setError(JSON.parse(xhr.responseText).message || 'Upload failed'); } catch { setError('Upload failed'); }
      }
    };
    xhr.onerror = () => { setPhase('form'); setError('Upload failed. Please try again.'); };
    xhr.send(formData);
  };

  // ── Select phase ──────────────────────────────────────────────────────────
  if (phase === 'select') {
    return (
      <div className="yt-upload-overlay">
        <div className="yt-upload-dialog">
          <div className="yt-upload-dialog-header">
            <span>Upload videos</span>
            <button className="yt-upload-close" onClick={onClose}>✕</button>
          </div>

          <div
            className={`yt-upload-drop${dragOver ? ' dragover' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div className="yt-upload-drop-icon">
              <svg viewBox="0 0 24 24" width="64" height="64">
                <path fill="#909090" d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
              </svg>
            </div>
            <p className="yt-upload-drop-title">Drag and drop video files to upload</p>
            <p className="yt-upload-drop-sub">Your videos will be private until you publish them.</p>
            <button className="yt-upload-select-btn" onClick={() => fileInputRef.current.click()}>
              SELECT FILES
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />
          </div>

          <p className="yt-upload-terms">
            By submitting your videos to YouTube, you acknowledge that you agree to YouTube's{' '}
            <a href="#">Terms of Service</a> and <a href="#">Community Guidelines</a>.
          </p>
        </div>
      </div>
    );
  }

  // ── Uploading phase ───────────────────────────────────────────────────────
  if (phase === 'uploading') {
    return (
      <div className="yt-upload-overlay">
        <div className="yt-upload-dialog yt-upload-dialog--full">
          <div className="yt-upload-dialog-header">
            <span>Upload videos</span>
            <button className="yt-upload-close" onClick={onClose}>✕</button>
          </div>
          <div className="yt-uploading-body">
            <div className="yt-uploading-thumb">
              {thumbnailPreview
                ? <img src={thumbnailPreview} alt="" />
                : <video src={videoPreviewUrl} />}
            </div>
            <p className="yt-uploading-title">{title}</p>
            <p className="yt-uploading-sub">
              {uploadProgress < 100 ? `Uploading… ${uploadProgress}%` : 'Upload complete. Processing…'}
            </p>
            <div className="yt-uploading-bar-bg">
              <div className="yt-uploading-bar" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── Done phase ────────────────────────────────────────────────────────────
  if (phase === 'done') {
    return (
      <div className="yt-upload-overlay">
        <div className="yt-upload-dialog yt-upload-dialog--full">
          <div className="yt-upload-dialog-header">
            <span>Your video is published</span>
            <button className="yt-upload-close" onClick={onSuccess}>✕</button>
          </div>
          <div className="yt-done-body">
            <div className="yt-done-check">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="#2ba640" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <p className="yt-done-title">Your video is published!</p>
            {thumbnailPreview && <img className="yt-done-thumb" src={thumbnailPreview} alt="" />}
            <p className="yt-done-filename">{videoFile?.name}</p>
            <button className="yt-done-btn" onClick={onSuccess}>Done</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Form phase ────────────────────────────────────────────────────────────
  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="yt-upload-overlay">
      <div className="yt-upload-dialog yt-upload-dialog--full">

        {/* Header */}
        <div className="yt-upload-dialog-header">
          <span>Video details</span>
          <div className="yt-upload-header-actions">
            <button className="yt-upload-draft-btn">Save draft</button>
            <button className="yt-upload-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* Step tabs */}
        <div className="yt-upload-tabs">
          {STEPS.map((label, i) => (
            <button
              key={i}
              className={`yt-upload-tab${i === step ? ' active' : ''}${i < step ? ' done' : ''}`}
              onClick={() => setStep(i)}
            >
              <span className="yt-tab-num">{i < step ? '✓' : i + 1}</span>
              {label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="yt-upload-body">

          {/* Left: form content */}
          <div className="yt-upload-left">

            {step === 0 && (
              <div className="yt-upload-section">
                <p className="yt-upload-section-title">Details</p>

                <label className="yt-upload-field-label">
                  Title (required)
                  <input
                    className="yt-upload-field-input"
                    type="text"
                    value={title}
                    maxLength={100}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a title that describes your video"
                  />
                  <span className="yt-upload-char-count">{title.length}/100</span>
                </label>

                <label className="yt-upload-field-label">
                  Description
                  <textarea
                    className="yt-upload-field-textarea"
                    value={description}
                    maxLength={5000}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell viewers about your video"
                    rows={5}
                  />
                  <span className="yt-upload-char-count">{description.length}/5000</span>
                </label>

                <div className="yt-upload-field-label">
                  Thumbnail
                  <div className="yt-upload-thumbnail-area">
                    {thumbnailPreview ? (
                      <div className="yt-upload-thumb-preview">
                        <img src={thumbnailPreview} alt="" />
                        <button className="yt-upload-thumb-change" onClick={() => thumbInputRef.current.click()}>Change</button>
                      </div>
                    ) : (
                      <button className="yt-upload-thumb-btn" type="button" onClick={() => thumbInputRef.current.click()}>
                        <svg viewBox="0 0 24 24" width="24" height="24">
                          <path fill="#aaa" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                        </svg>
                        Upload thumbnail
                      </button>
                    )}
                    <input
                      ref={thumbInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleThumbnailChange}
                    />
                  </div>
                </div>

                <div className="yt-upload-field-label">
                  <label className="yt-upload-short-toggle">
                    <input type="checkbox" checked={isShort} onChange={(e) => setIsShort(e.target.checked)} />
                    <div className="yt-upload-short-toggle-text">
                      <span className="yt-upload-short-label">
                        Mark as Short
                        {isShort && <span className="yt-upload-short-badge">#Shorts</span>}
                      </span>
                      <span className="yt-upload-short-desc">
                        {isShort
                          ? 'Auto-detected as a Short (vertical video). Uncheck to upload as a regular video.'
                          : 'Short videos are vertical and up to 60 seconds. Check to upload as a Short.'}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 1 && (
              <div className="yt-upload-section">
                <p className="yt-upload-section-title">Video elements</p>
                <p className="yt-upload-section-sub">Add cards and an end screen to show viewers related videos, websites, and calls to action.</p>
                <div className="yt-upload-element-row">
                  <div>
                    <p className="yt-upload-element-name">Add subtitles</p>
                    <p className="yt-upload-element-desc">Help more people discover your video when you add subtitles and captions.</p>
                  </div>
                  <button className="yt-upload-element-btn" type="button">Add</button>
                </div>
                <div className="yt-upload-element-row">
                  <div>
                    <p className="yt-upload-element-name">Add an end screen</p>
                    <p className="yt-upload-element-desc">Promote related content at the end of your video.</p>
                  </div>
                  <button className="yt-upload-element-btn" type="button">Add</button>
                </div>
                <div className="yt-upload-element-row">
                  <div>
                    <p className="yt-upload-element-name">Add cards</p>
                    <p className="yt-upload-element-desc">Use cards to suggest related videos, playlists, channels, or links.</p>
                  </div>
                  <button className="yt-upload-element-btn" type="button">Add</button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="yt-upload-section">
                <p className="yt-upload-section-title">Checks</p>
                <p className="yt-upload-section-sub">We're checking whether your video may contain copyrighted content.</p>
                <div className="yt-upload-check-row">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#2ba640" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <div>
                    <p className="yt-upload-element-name">Copyright</p>
                    <p className="yt-upload-element-desc">No issues found.</p>
                  </div>
                </div>
                <div className="yt-upload-check-row">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#2ba640" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  <div>
                    <p className="yt-upload-element-name">Ad suitability</p>
                    <p className="yt-upload-element-desc">This video may be suitable for most advertisers.</p>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="yt-upload-section">
                <p className="yt-upload-section-title">Visibility</p>
                <p className="yt-upload-section-sub">Choose when to publish and who can see your video</p>
                {[
                  { value: 'private', label: 'Private', desc: 'Only you and people you choose can watch your video' },
                  { value: 'unlisted', label: 'Unlisted', desc: 'Anyone with the video link can watch your video' },
                  { value: 'public', label: 'Public', desc: 'Everyone can watch your video' },
                ].map(opt => (
                  <label key={opt.value} className="yt-upload-radio-row">
                    <input
                      type="radio"
                      name="visibility"
                      value={opt.value}
                      checked={visibility === opt.value}
                      onChange={() => setVisibility(opt.value)}
                    />
                    <div>
                      <p className="yt-upload-radio-label">{opt.label}</p>
                      <p className="yt-upload-radio-desc">{opt.desc}</p>
                    </div>
                  </label>
                ))}
                {error && <p className="yt-upload-error">{error}</p>}
              </div>
            )}
          </div>

          {/* Right: video preview */}
          <div className="yt-upload-right">
            <div className="yt-upload-preview">
              {thumbnailPreview
                ? <img src={thumbnailPreview} alt="" className="yt-upload-preview-img" />
                : <video src={videoPreviewUrl} className="yt-upload-preview-video" />}
            </div>
            <p className="yt-upload-preview-filename">{videoFile?.name}</p>
            <p className="yt-upload-preview-size">
              {videoFile ? `${(videoFile.size / 1024 / 1024).toFixed(1)} MB` : ''}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="yt-upload-footer">
          <button
            className="yt-upload-footer-back"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
          >
            Back
          </button>
          <button
            className="yt-upload-footer-next"
            onClick={isLastStep ? handlePublish : () => setStep(s => s + 1)}
          >
            {isLastStep ? 'Publish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
