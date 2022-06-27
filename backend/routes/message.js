const router = require('express').Router();
const Message = require("../models/Message.js");

//ADD A MESSAGE
router.post("/", async (req, res)=> {
  const newMsg = await Message(req.body);
  try {
    const savedMsg = await newMsg.save();
    res.status(200).json(savedMsg);
  } catch (error) {
    res.status(500).json(error.message)
  }
})

//GET A MESSAGE
router.get("/:conversationId", async (req, res) => {
  try {
    const msgs = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(msgs);
  }catch (error) {
    res.status(500).json(error.message);
  }
})

module.exports = router;