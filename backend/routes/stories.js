const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const Story = require('../models/Story');

// @desc  Process add form
// @route POST /stories
router.post('/', ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const story = await Story.create(req.body);
    res.json({success: true, msg: 'Story added'});
  } catch (err) {
    res.json({success: false, msg: 'Cannot add story'});
  }
});

// @desc  Show all stories
// @route GET /stories
router.get('/', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({status: 'public'})
        .populate('user')
        .sort({createdAt: 'desc'})
        .lean();
    res.json(stories);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
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
      res.json({});
    }
    res.json(story);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
    console.error(err);
  }
});

// @desc  Show all the stories belong to a logged in user
// @route GET /stories/my-stories
router.get('/my-stories', ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();

    if (!stories) {
      res.json({});
    }
    res.json(stories);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
    console.log("Get my stories error");
    console.error(err);
  }
});

// @desc  Update story
// @route PUT /stories/:id
router.put('/:id', ensureAuth, async (req, res) => {
  try {
    let story = await Story.findById(req.params.id).lean();
    if (!story) {
      res.json({});
    }

    if (story.user != req.user.id) {
      res.json({});
    } else {
      story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true
      });

      res.json({success: true});
    }
  } catch (error) {
    console.error(err);
    res.json({});
  }
});

// @desc  Delete story
// @route DELETE /stories/:id
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    let storyId = req.params.id
    let story = await Story.findById(storyId).lean();
    if (!story) {
      return;
    }

    if (story.user != req.user.id) {
      return;
    } else {
      await Story.remove({_id: storyId});

      console.log("Delete story success");
      res.status(200);
    }
  } catch (err) {
    console.error(err);
  }
});

// TODO(timhsieh): Move this out of this file
// @desc  GET this user's uid
// @route GET /stories/myuid
router.get('/myuid', ensureAuth, async (req, res) => {
  try {
    res.json(req.user.id);
  } catch (err) {
    // TODO(timhsieh): Figure out what to do when error.
    console.log("Get show myuid error");
    console.log(err);
  }
});

module.exports = router;