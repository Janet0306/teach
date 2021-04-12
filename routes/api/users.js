const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const auth  = require('../../middleware/auth');
const admin  = require('../../middleware/admin');


const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');



// @route    POST api/users
// @desc     Register user
// @access   Public

router.post(
  '/',
  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


// @route    GET /api/users
// @desc     GET all users
// @access   Private/admin

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({}).select('-password')
    res.json(users)
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


// @route    DELETE /api/users/:id
// @desc     Delete user
// @access   Private/admin

router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if(user || user.admin === true) {
      await Promise.all([
      Post.deleteMany({ user: req.user.id }),
      Post.deleteMany({ comments: { user: req.user.id }}),
      Profile.findOneAndRemove({ user: req.user.id }),
      User.findOneAndRemove({ _id: req.user.id })
    ]);
    } else {
      res.status(404).send('User not found')
    }
    
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


// @route    GET /api/users/:id
// @desc     GET user by ID
// @access   Private/admin

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await USer.findById(req.params.id).select('-password')

    if(user) {
      res.json(user)
    } else {
      res.status(404).send('User not found')
    }
    
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})


// @route    PUT /api/users/:id
// @desc     UPDATE user
// @access   Private/admin

router.put('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)

    if(user) {
      user.name = req.body.name || user.name
      user.email = req.body.email || user.email
      user.isAdmin = req.body.isAdmin

      const updatedUser = await user.save()

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUsser.email,
        isAdmin: updatedUser.isAdmin,
      })
    } else {
      res.status(404).send('User not found')
    }
    
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})








module.exports = router;
