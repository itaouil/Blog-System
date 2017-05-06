var express = require('express');
var router = express.Router();

// DB stuff
var mongo = require('mongodb');
var db    = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next) {

    res.render('addcategory', {
      'title': 'Add Category'
    });

});

router.post('/add', function(req, res, next) {

  // Get name field
  var name = req.body.name;

  // Form validation
  req.checkBody('name', 'Name field is required.').notEmpty();

  // Validation errors
  var errors = req.validationErrors();
  if (errors) {
    res.render('addcategory', { errors: errors});
  }
  else {
    // Get collection
    var category = db.get('categories');

    // Insert new item
    category.insert({
      'name': name
    }, function(err, category) {
      if (err) {
        res.send(err);
      }
      else {
        req.flash('success', 'Category Added');
        res.location('/');
        res.redirect('/');
      }
    });
  }

});

module.exports = router;