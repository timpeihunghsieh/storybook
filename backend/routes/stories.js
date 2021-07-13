const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc  Process add form
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
  console.log("Processing add story");
  try {
    console.log(req.body);
    req.body.user = req.user.id;
    const story = await Story.create(req.body);
    res.json({success: true, msg: 'Story added'});
  } catch (err) {
    console.log("Cannot add story");
    console.error(err);
    res.json({success: false, msg: 'Cannot add story'});
  }
});

// @desc  Show all stories
// @route GET /stories
router.get('/', ensureAuth, async (req, res) => {
  console.log("Processing show all stories");
  try {
    const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean();
    res.json(stories);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
    console.log("Get all stories error");
    console.log(err);
  }
});

// @desc  Show single story
// @route GET /stories/one-story/:id
router.get('/one-story/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id)
      .populate('user')
      .lean();

    if (!story) {
      console.log("Get a single story error");
      res.json({});
    }
    res.json(story);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
    console.log("Get a single story error");
    console.error(err);
  }
});

// @desc  Show all the stories belong to a logged in user
// @route GET /stories/my-stories
router.get('/my-stories', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();

    if (!stories) {
      console.log("Get my stories error");
      res.json({});
    }
    res.json(stories);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
    console.log("Get my stories error");
    console.error(err);
  }
});

module.exports = router;