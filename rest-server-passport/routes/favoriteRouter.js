var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favorite = require('../models/favorites');
var Verify = require('./verify');

var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());
favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.find({postedBy: req.decoded._doc._id})
        .populate('postedBy')
        .populate('dishes')
        .exec(function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.findOne({postedBy: req.decoded._doc._id})
        .exec(function (err, favorite) {
        if (err) throw err;

        if (favorite == null) {
            var dishId = req.body._id;

            req.body._id = null; 
            req.body.postedBy = req.decoded._doc._id;
            req.body.dishes = [];
            req.body.dishes.push(dishId);
            Favorite.create(req.body, function (err, favorite) {
                if (err) throw err;
                    console.log('Add Favorite!');
                    res.json(favorite);  
            });
        } else {
            favorite.dishes.push(req.body);
            favorite.save(function (err, favorite) {
                if (err) throw err;
                console.log('Add Favorite!');
                res.json(favorite);
            });   
        }
    });
})

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

favoriteRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.findOne({postedBy: req.decoded._doc._id})
        .exec(function (err, favorite) {
        for (var i = 0; i < favorite.dishes.length; i++) {
            if (req.params.dishId == favorite.dishes[i]) {
                favorite.dishes.splice(i, 1);
                break;
            }
        };
        favorite.save(function (err, resp) {
            if (err) throw err;
            res.json(favorite);
        });
    });
});

module.exports = favoriteRouter;