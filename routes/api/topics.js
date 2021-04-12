const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const path = require('path');

const User = require('../../models/User');
const Topic = require('../../models/Topic');


// @desc    Fetch all Topics
// @route   GET /api/topics
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const pageSize = 9
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
      subject: {
        $regex: req.query.keyword,
        $options: 'i'
      }
    } : {}

    const count = await Topic.countDocuments({ ...keyword })
    const topics = await Topic.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ topics, page, pages: Math.ceil(count / pageSize)});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @desc    Fetch single Topic
// @route   GET /api/topics/:id
// @access  Private

router.get('/:id', auth, async (req, res) => {
    try {
        const topic = await Topic.findById(req.params.id)
        
        if (topic) {
            res.json(topic)
        } else {
            res.status(404).send('Topic not found')
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @desc    Delete a topic
// @route   DELETE /api/topics/:id
// @access  Private/Admin

router.delete('/:id', auth, async (req, res) => {
        try {
        const topic = await Topic.findById(req.params.id)
        
        if (topic) {
            await topic.remove
            res.json({ message: 'Topic Removed'})
        } else {
            res.status(404).send('Topic not found')
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});


// @desc    Create a topic
// @route   POST /api/topics
// @access  Private/Admin

router.post(
  '/',
  auth,
  check('subject', 'Subject is required').not().isEmpty(),
  check('level', 'level is required').not().isEmpty(),
  check('factSheetText', 'Fact Sheet Text is required').not().isEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newTopic = new Topic({
        subject: req.body.subject,
        title: req.body.title,
        level: req.body.level,
        factSheetText: req.body.factSheetText,
        name: user.name,
        user: req.user.id
      });

      const topic = await newTopic.save();

      res.json(topic);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @desc    Update a topic
// @route   PUT /api/topics/:id
// @access  Private/Admin

router.put('/:id', auth, async (req, res) => {
    try {
        const {
            subject,
            title,
            level,
            factSheetText
        } = req.body

        const topic = await Topic.findById(req.params.id)

        if (topic) {
            topic.subject = subject
            topic.title = title
            topic.level = level
            topic.factSheetText = factSheetText

            const updatedTopic = await topic.save()
            res.json(updatedTopic)
        } else {
            res.status(404).json({ message: 'Topic not found'})
        }
        
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// @desc    Create a quiz
// @route   POST /api/topics/:id/quiz
// @access  Private/Admin

router.post('/:id/quiz', auth, async (req, res) => {
    try {
    const { question, answers, correctAnswer } = req.body

    const topic = await Topic.findById(req.params.id)

    if (topic) {

    const quiz = {
        user: req.user.id,
        question,
        answers: answers.split(',').map(answer => answer.trim()),
        correctAnswer
    }

    topic.quiz.push(quiz)
    await topic.save()
    res.status(201).json({ message: 'Quiz Added' })
    } else {
        res.status(404).json({ message: 'Topic not found'})
    } 
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});


// @desc    Update a quiz
// @route   PUT /api/topics/:id/quiz
// @access  Private/Admin

router.put('/:id/quiz', auth, async (req, res) => {
    try {
    const { question, answers, correctAnswer } = req.body
     
    const topic = await Topic.findById(req.params.id)

    if (topic) {

        topic.quiz.splice(0)

        const quiz = {
            user: req.user._id,
            question,
            answers: answers.split(',').map(answer => answer.trim()),
            correctAnswer
        }
        
        topic.quiz.push(quiz)
        await topic.save()
        res.status(201).json({ message: 'Quiz updated' })
        
    } else {
        res.status(404).json({ message: 'Topic not found' })
    }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

router.get('/download/:id', async (req, res) => {
  try {
        const topic = await Topic.findById(req.params.id);
        res.set({
            'Content-Type': topic.fileMimeType
        });
        res.sendFile(path.join(__dirname, '..', topic.filePath));
    
  } catch (err) {
    console.error(err.message);
    res.status(400).send('Error while downloaing file.  Please try again later.');
    
  }
})





module.exports = router;