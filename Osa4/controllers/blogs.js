const {blogs, format, nonExistingId, blogsInDb, usersInDb} = require('../tests/test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')

  blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate('user')
      response.json(blogs.map(Blog.format))     
  })

  blogRouter.post('/', async (request, response) => {
    const body = request.body
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }  

    if (body.title === undefined && body.url === undefined) {
      return (response.status(400).json({error: 'content and url missing!'}))
    }

    const user = await User.findById(decodedToken.id) 


    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.json(Blog.format(blog))

    } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      response.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
  })

  blogRouter.delete('/:id', async (request, response) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'token missing or invalid' })
    } else {
      await Blog.findByIdAndRemove(request.params.id)
    }

    response.status(204).end()
  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
})

  blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(User.format(updatedBlog))
  })

  module.exports = blogRouter