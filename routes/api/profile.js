const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const admin = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');
const checkObjectId = require('../../middleware/checkObjectId');
const path = require('path');
const multer = require('multer');
const fs = require('fs');


const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');



const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'client/public/uploads');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype === 'image/gif' || file.mimetype ==='image/jfif' ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb( new Error('Only .png, .jpg and .jpeg format allowed!' ));
      
    }
  }
});


// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name']).populate('topics.topic', ['subject', 'level']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  '/',
  upload.single('file'),
  auth,
  check('location', 'Location is required').not().isEmpty(),
  check('interests', 'Interests are required').not().isEmpty(),
  async (req, res) => {
  
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructure the request
    const {
      location,
      bio,
      interests,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    // build a profile
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.file !== undefined) {
      let fileUrl = "/" + req.file.path.replace(/\\/g, "/");
      let file = fileUrl.replace("/client/public/uploads", "/uploads");
      if (path) profileFields.path = file;
      if (location) profileFields.location = req.body.location;
      if (bio) profileFields.bio = req.body.bio;
      if (interests) {
        profileFields.interests = interests.split(',').map(interest => interest.trim());
      }
    } else {
      if (location) profileFields.location = req.body.location;
      if (bio) profileFields.bio = req.body.bio;
      if (interests) {
        profileFields.interests = interests.split(',').map(interest => interest.trim());
      }
    }

   // Build social object
   const socialFields = {youtube, twitter, instagram, linkedin, facebook}


    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) 
      socialFields[key] = normalize(value, { forceHttps: true });
    }

    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get(
  '/user/:user_id',
  checkObjectId('user_id'),
  async ({ params: { user_id } }, res) => {
    try {
      const profile = await Profile.findOne({
        user: user_id
      }).populate('user', ['name']);

      if (!profile) return res.status(400).json({ msg: 'Profile not found' });

      return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server error' });
    }
  }
);


// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private

router.delete('/', auth, admin, async (req, res) => {
  try {
    // Remove user posts
    // Remove user comments
    // Remove profile
    // Remove user
    await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Post.deleteMany({ comments: { user: req.user.id }}),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    Put api/profile/saveScore/:id
// @desc     Save users quiz score to profile
// @access   Private

router.put('/saveScore/:id', auth, async (req, res) => {
      const {
        score,
        subjectType,
    } = req.body;

    const topic = req.params.id

    const newUserTopic = {
      score,
      subjectType,
      topic,
    }

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.topics.unshift(newUserTopic);

    await profile.save();

    res.json(profile)
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

})


// @route    Delete api/profile/topic/:top_id
// @desc     Delete topic from profile
// @access   Private


router.delete('/topic/:top_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });

    foundProfile.topics = foundProfile.topics.filter(
      (top) => top.id.toString() !== req.params.top_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error'});
  }
});

module.exports = router;












