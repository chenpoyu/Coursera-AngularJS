var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaderships = require('../models/leadership');

var leadershipRouter = express.Router();
leadershipRouter.use(bodyParser.json());
leadershipRouter.route('/')
.get(function (req, res, next) {
    Leaderships.find({}, function (err, leadership) {
        if (err) throw err;
        res.json(leadership);
    });
})

.post(function (req, res, next) {
    Leaderships.create(req.body, function (err, leadership) {
        if (err) throw err;
        console.log('Leadership created!');
        var id = leadership._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leadership with id: ' + id);
    });
})

.delete(function (req, res, next) {
    Leaderships.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leadershipRouter.route('/:leaderId')
.get(function (req, res, next) {
    Leaderships.findById(req.params.leaderId, function (err, leadership) {
        if (err) throw err;
        res.json(leadership);
    });
})

.put(function (req, res, next) {
    Leaderships.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leadership) {
        if (err) throw err;
        res.json(leadership);
    });
})

.delete(function (req, res, next) {
    Leaderships.findByIdAndRemove(req.params.leaderId, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leadershipRouter;
