import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';
import Video from './models/Video.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/youtube-clone';

const videos = [
  {
    title: 'Big Buck Bunny - Blender Open Movie',
    description: 'A large and lovable rabbit deals with three bullying rodents in this award-winning short film made with Blender.',
    thumbnailUrl: '/images/thumbnails/big_buck_bunny.jpg',
    videoUrl: '/uploads/videos/big_buck_bunny.mp4',
    duration: '9:56',
    views: 12400000,
    isShort: false,
  },
  {
    title: 'Elephants Dream - First Open Movie Ever Made',
    description: 'Two characters explore a strange mechanical world, the first movie made entirely with open-source software.',
    thumbnailUrl: '/images/thumbnails/elephants_dream.jpg',
    videoUrl: '/uploads/videos/elephants_dream.mp4',
    duration: '10:53',
    views: 3800000,
    isShort: false,
  },
  {
    title: 'Sintel - Blender Fantasy Short Film',
    description: 'A lonely young woman searches for her lost baby dragon in this epic fantasy short film by the Blender Foundation.',
    thumbnailUrl: '/images/thumbnails/sintel.jpg',
    videoUrl: '/uploads/videos/sintel.mp4',
    duration: '14:47',
    views: 8900000,
    isShort: false,
  },
  {
    title: 'Tears of Steel - Blender Sci-Fi Short',
    description: 'In a dystopian future, a group of warriors and scientists try to save the world using robots and mechs.',
    thumbnailUrl: '/images/thumbnails/tears_of_steel.jpg',
    videoUrl: '/uploads/videos/tears_of_steel.mp4',
    duration: '12:14',
    views: 5200000,
    isShort: false,
  },
  {
    title: 'Subaru Outback - Street and Dirt Review',
    description: 'Taking the Subaru Outback through city streets and off-road trails to see how it handles both terrains.',
    thumbnailUrl: '/images/thumbnails/subaru.jpg',
    videoUrl: '/uploads/videos/subaru.mp4',
    duration: '9:54',
    views: 2100000,
    isShort: false,
  },
  {
    title: 'Volkswagen GTI Review - The Ultimate Hot Hatch',
    description: 'A detailed look at the Volkswagen GTI, covering performance, interior, and whether it lives up to the hype.',
    thumbnailUrl: '/images/thumbnails/volkswagen.jpg',
    videoUrl: '/uploads/videos/volkswagen.mp4',
    duration: '9:53',
    views: 1750000,
    isShort: false,
  },
];

const shorts = [
  {
    title: 'Chromecast burns up a robot',
    thumbnailUrl: '/images/thumbnails/for_bigger_blazes.jpg',
    videoUrl: '/uploads/videos/for_bigger_blazes.mp4',
    duration: '0:15',
    views: 45000000,
    isShort: true,
  },
  {
    title: 'Chromecast escape pod launch',
    thumbnailUrl: '/images/thumbnails/for_bigger_escapes.jpg',
    videoUrl: '/uploads/videos/for_bigger_escapes.mp4',
    duration: '0:15',
    views: 12000000,
    isShort: true,
  },
  {
    title: 'Chromecast pool party time',
    thumbnailUrl: '/images/thumbnails/for_bigger_fun.jpg',
    videoUrl: '/uploads/videos/for_bigger_fun.mp4',
    duration: '1:00',
    views: 8200000,
    isShort: true,
  },
  {
    title: 'Chromecast joyride through the desert',
    thumbnailUrl: '/images/thumbnails/for_bigger_joyrides.jpg',
    videoUrl: '/uploads/videos/for_bigger_joyrides.mp4',
    duration: '0:15',
    views: 23000000,
    isShort: true,
  },
  {
    title: 'Chromecast meltdown in the lab',
    thumbnailUrl: '/images/thumbnails/for_bigger_meltdowns.jpg',
    videoUrl: '/uploads/videos/for_bigger_meltdowns.mp4',
    duration: '0:15',
    views: 67000000,
    isShort: true,
  },
  {
    title: 'We are going on Bullrun!',
    thumbnailUrl: '/images/thumbnails/we_are_going_on_bullrun.jpg',
    videoUrl: '/uploads/videos/we_are_going_on_bullrun.mp4',
    duration: '0:47',
    views: 31000000,
    isShort: true,
  },
  {
    title: 'Big Buck Bunny meets the squirrels',
    thumbnailUrl: '/images/thumbnails/big_buck_bunny.jpg',
    videoUrl: '/uploads/videos/big_buck_bunny.mp4',
    duration: '9:56',
    views: 19000000,
    isShort: true,
  },
  {
    title: 'Sintel finds the dragon cave',
    thumbnailUrl: '/images/thumbnails/sintel.jpg',
    videoUrl: '/uploads/videos/sintel.mp4',
    duration: '14:47',
    views: 41000000,
    isShort: true,
  },
  {
    title: 'Tears of Steel robot battle scene',
    thumbnailUrl: '/images/thumbnails/tears_of_steel.jpg',
    videoUrl: '/uploads/videos/tears_of_steel.mp4',
    duration: '12:14',
    views: 15000000,
    isShort: true,
  },
  {
    title: 'What car can you get for a grand?',
    thumbnailUrl: '/images/thumbnails/what_car_can_you_get.jpg',
    videoUrl: '/uploads/videos/what_car_can_you_get.mp4',
    duration: '9:27',
    views: 27000000,
    isShort: true,
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Video.deleteMany({});

    // Create demo users matching the original channel names
    const users = await User.create([
      { username: 'Blender Foundation', email: 'blender@demo.com', password: 'demo123', handle: '@blenderfoundation', avatar: '/images/profiles/channels4_profile.jpg' },
      { username: 'Open Movies', email: 'openmovies@demo.com', password: 'demo123', handle: '@openmovies', avatar: '/images/profiles/channels4_profile 2.jpg' },
      { username: 'Sintel Official', email: 'sintel@demo.com', password: 'demo123', handle: '@sintelofficial', avatar: '/images/profiles/channels4_profile (1).jpg' },
      { username: 'Mango Open Movie', email: 'mango@demo.com', password: 'demo123', handle: '@mangomovie', avatar: '/images/profiles/unnamed.jpg' },
      { username: 'AutoReview', email: 'autoreview@demo.com', password: 'demo123', handle: '@autoreview', avatar: '/images/profiles/channels4_profile (2).jpg' },
      { username: 'CarTech Daily', email: 'cartech@demo.com', password: 'demo123', handle: '@cartechdaily', avatar: '/images/profiles/channels4_profile (3).jpg' },
    ]);

    // Create videos with matching authors
    for (let i = 0; i < videos.length; i++) {
      await Video.create({ ...videos[i], author: users[i]._id });
    }

    // Create shorts — distribute among users
    for (let i = 0; i < shorts.length; i++) {
      await Video.create({ ...shorts[i], author: users[i % users.length]._id });
    }

    console.log(`Seeded ${users.length} users, ${videos.length} videos, ${shorts.length} shorts`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();
