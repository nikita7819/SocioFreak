const router = require("express").Router();
const Conversation = require("../models/Conversation.js");

//NEW CONVERSATION
router.post("/", async (req, res) => {
  const newConv = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConv = await newConv.save();
    res.status(200).json(savedConv);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET A CONVERSATION
router.get("/:userId", async (req, res) => {
  try {
    const convo = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(convo);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//GET CONVO INCLUDES TWO USERID
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
