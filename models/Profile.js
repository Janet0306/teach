const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  topics: [
    {
    topic: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'topic'
  },
  score: {
    type: Number
  },
  subjectType: {
   type: String,
  },
    }],
  location: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  originalname: {
    type: String,
  },
  path: {
    type: String,
  },
  mimetype: {
    type: String,
  },
  interests: {
    type: [String],
    required: true
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  },
},

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('profile', ProfileSchema);
