let User = require('./userModel');
let Post = require('./postModel');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

module.exports.getUsers = function(req, res) {
    let promise = User.find().exec();
    promise.then(
        function(users) {
            res.json(users);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.getUserDetails = function(req, res) {
    let id = req.params.id;
    let promise = User.findOne(
        {
            _id: id
        }).exec();

    promise.then(
        function(user) {
            res.json(user);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.setUser = function(req, res){
    let newUser = new User({
        _id: new mongoose.mongo.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        senha: bcrypt.hashSync(req.body.senha, 5)
    })

    let promise = User.create(newUser);
    promise.then(
        function(c) {
            res.status(201).json("Usuário registrado com sucesso. Id: " + c._id);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.getPosts = function(req, res) {
    let promise = Post.find().exec();
    promise.then(
        function(posts) {
            res.json(posts);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}

module.exports.setPost = function(req, res){
    let newPost = new Post({
        _id: new mongoose.mongo.ObjectId(),
        title: req.body.title,
        text: req.body.text
    })

    let promise = Post.create(newPost);
    promise.then(
        function(c) {
            res.status(201).json("Post registrado com sucesso. Id: " + c._id);
        },
        function(e) {
            res.status(500).json(e);
        }
    );
}