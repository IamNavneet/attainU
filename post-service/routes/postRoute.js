const express = require('express')
const router = express.Router()
const Post = require('../models/posts')
const isAuthenticated = require('../../isAuthenticated')
const { validateCreate, validateId } = require("../utils")




router.post('/create', isAuthenticated, async (req, res) => {
    console.log(req.user)
    if (req.user.userType != 'admin') return res.json({ message: "You are not authorized to create post" })

    const { error } = await validateCreate(req.body)
    if (error) return res.send(error.details[0].message)

    const { postTitle, postContent } = req.body


    const newPost = new Post({
        postTitle,
        postContent
    })

    newPost.save()

    res.json({ message: "post created successfully", post: newPost })
})

router.put('/:id/update', isAuthenticated, async (req, res) => {
    if (req.user.userType != 'admin') return res.json({ message: "You are not authorized to update post" })


    const { error } = await validateId(req.params.id)
    if (error) return res.send(error.details[0].message)

    const postId = req.params.id
    const { postTitle, postContent } = req.body
    const postEdit = await Post.findOneAndUpdate(postId, { $set: { postTitle: postTitle, postContent: postContent } })
    if (!postEdit) return res.json({ message: "no post with this id found" })
    return res.json({ message: "updated successfully" })

})

router.get('/allposts', async (req, res) => {
    let page = req.query.page, rows = req.query.rows,
        skip = (Number(page) - 1) * (Number(rows)),
        condition = [{ $skip: skip }, {$limit:rows}]

    const posts = await Post.aggregate(condition)
    res.json(posts)
})

router.delete('/:id', isAuthenticated, async (req, res) => {
    if (req.user.userType != 'admin') return res.json({ message: "You are not authorized to delete post" })

    const { error } = await validateId(req.params.id)
    if (error) return res.send(error.details[0].message)
    const id = req.params.id
    const post = await Post.findOneAndDelete(id)
    if (!post) return res.json({ message: "no such post" })
    res.json({ message: "post deleted successfully", post: post })
})

module.exports = router