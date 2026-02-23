import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import jwt from 'jsonwebtoken';
import Video from '../models/Video.js';
import User from '../models/User.js';

const router = Router();

// Multer config
const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dest = file.fieldname === 'thumbnail' ? 'server/uploads/thumbnails' : 'server/uploads/videos';
    cb(null, dest);
  },
  filename(req, file, cb) {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter(req, file, cb) {
    if (file.fieldname === 'video') {
      cb(null, /^video\//.test(file.mimetype));
    } else if (file.fieldname === 'thumbnail') {
      cb(null, /^image\//.test(file.mimetype));
    } else {
      cb(null, false);
    }
  },
});

// GET /api/videos
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.shorts === 'true') filter.isShort = true;
    else if (req.query.shorts === 'false') filter.isShort = false;

    const videos = await Video.find(filter)
      .populate('author', 'username handle avatar subscriberCount')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/videos/:id  (no increment — just fetch)
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('author', 'username handle avatar subscriberCount');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/videos/:id/view  (increment views by 1)
router.post('/:id/view', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true },
    ).populate('author', 'username handle avatar subscriberCount');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Optional auth middleware — allows unauthenticated uploads for demo
const optionalAuth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return next();
  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
  } catch {}
  next();
};

// POST /api/videos (optional auth — assigns to first demo user if no token)
router.post('/', optionalAuth, upload.fields([
  { name: 'video', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 },
]), async (req, res) => {
  try {
    const { title, description, duration, isShort } = req.body;

    if (!title || !req.files?.video) {
      return res.status(400).json({ message: 'Title and video file are required' });
    }

    let authorId = req.user?.id;
    if (!authorId) {
      const demoUser = await User.findOne();
      if (!demoUser) return res.status(400).json({ message: 'No users in database' });
      authorId = demoUser._id;
    }

    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail?.[0];

    const video = await Video.create({
      title,
      description,
      duration,
      isShort: isShort === 'true',
      videoUrl: `/uploads/videos/${videoFile.filename}`,
      thumbnailUrl: thumbnailFile ? `/uploads/thumbnails/${thumbnailFile.filename}` : '',
      author: authorId,
    });

    const populated = await video.populate('author', 'username handle avatar subscriberCount');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
