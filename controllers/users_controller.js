const User = require("../models/user");

// render user profile page
module.exports.profile = function (req, res) {
  // res.end("<h1>User Profile</h1>");
  // return res.render("user_profile", {
  //   title: "User Profile",
  // });

  if (req.cookies.user_id) {
    User.findById(req.cookies.user_id, function (err, user) {
      if (err) {
        console.log("Error while finding the user!!");
        return;
      }
      if (user) {
        return res.render("user_profile", {
          title: "User Profile",
          user: user,
        });
      }
      return res.redirect("/users/sign-in");
    });
  } else {
    return res.redirect("/users/sign-in");
  }
};

// render the sign up page
module.exports.signUp = function (req, res) {
  return res.render("user_sign_up", {
    title: "Connecti | Sign Up",
  });
};

// render the sign in page
module.exports.signIn = function (req, res) {
  return res.render("user_sign_in", {
    title: "Connecti | Sign In",
  });
};

// create the user / get the sign up data
module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user while signing up!");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("Error in creating the user while signing up!");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// create the session for user/ sing in
module.exports.createSession = function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("Error in finding the user while signing up!");
      return;
    }
    if (user) {
      if (user.password != req.body.password) {
        return res.redirect("back");
      }
      // handle session creation
      res.cookie("user_id", user.id);
      return res.redirect("/users/profile");
    } else {
      return res.redirect("back");
    }
  });
};
