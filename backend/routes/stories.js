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

module.exports = router;