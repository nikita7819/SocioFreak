const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//UPDATE USER
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        res.status(500).json(error);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Updated successfully.");
      // console.log(user)
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("unauthorized");
  }
});

//DELETE USER
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully.");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(403).json("unauthorized");
  }
});

//GET A USER
router.get("/", async (req, res) => {
  try {
    const username = req.query.username;
    const userId = req.query.userId;
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, createdAt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET FRIENDS OF A USER
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture })
    });
    res.status(200).json(friendList);
  } catch (error) {
    res.status(500).json(error)
  }
})

//FOLLOW USER
router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("followed");
      } else {
        res.status(403).json("you already followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.json("You cannot follow youself");
  }
});

//UNFOLLOW USER
router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("unfollowed");
      } else {
        res.status(403).json("you do not follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.json("You cannot unfollow youself");
  }
});

module.exports = router;
