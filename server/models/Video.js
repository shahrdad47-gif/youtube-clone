import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  thumbnailUrl: { type: String, default: '' },
  videoUrl: { type: String, required: true },
  duration: { type: String, default: '0:00' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isShort: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Video', videoSchema);
