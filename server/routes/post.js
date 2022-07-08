const express = require('express');
const Post = require('../models/post');

const router = express.Router();

router
    .post('/view', async (req, res) => {
        try{
            const post = await Post.viewPost(req.body.user_id);
            res.send({post});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .post('/create', async (req, res) => {
        try{
            const post = await Post.createPost(req.body.user_id, req.body.content);
            res.send({post});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .put('/update', async (req, res) => {
        try{
            const post = await Post.updatePost(req.body.post_id, req.body.user_id, req.body.content, req.body.likes);
            res.send({post});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    })

    .delete('/delete', async (req, res) => {
        try{
            const user = await Post.deletePost(req.body.post_id);
            res.send({success: "Post deleted!"});
        } catch(error) {
            res.status(401).send({message: error.message});
        }
    });

    module.exports = router;