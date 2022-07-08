const mongoose = require('mongoose');
const User = require('../models/user');

const postSchema = new mongoose.Schema({
    user_id: { 
        type: String, 
        ref: 'User' 
    },
    content: {
        type: String
    },
    likes: {
        type: Number,
        default: 0
    }
});

const Post = mongoose.model("Post", postSchema);

async function createPost(user_id, content){
    const newPost = await Post.create({
        user_id: user_id,
        content: content
    });
    return newPost;
}

async function viewPost(user_id){
    const post = await Post.find({"user_id": user_id});
    return post;
}

async function updatePost(post_id, user_id, content, likes){
    const post = await Post.updateOne({"_id": post_id, "user_id": user_id}, {$set: {content: content, likes: likes}});
    return post;
}

async function deletePost(post_id){
    await Post.deleteOne({"_id": post_id});
}


module.exports = {
    createPost,
    viewPost,
    updatePost,
    deletePost
}