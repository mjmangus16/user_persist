const router = require("express").Router();
const dbUsers = require("./users-model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res) => {
  const newUser = {
    name: req.body.name,
    password: req.body.password
  };

  newUser.password = bcrypt.hashSync(newUser.password, 10);
  dbUsers
    .addUser(newUser)
    .then(addedUser => {
      res.status(201).json({
        message: `Your account has been created successfully! Please sign in.`
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        signup_message: `There was an issue creating this account. Please try again.`
      });
    });
});

router.post("/signin", (req, res) => {
  const user = {
    name: req.body.name,
    password: req.body.password
  };

  dbUsers.getUserByName(user.name).then(foundUser => {
    if (foundUser && bcrypt.compareSync(user.password, foundUser.password)) {
      const payload = {
        id: foundUser.id,
        name: foundUser.name
      };

      jwt.sign(payload, "dev_key_001", { expiresIn: 10 }, (err, token) => {
        res.status(200).json({
          success: true,
          token: token
        });
      });
    }
  });
});

module.exports = router;
