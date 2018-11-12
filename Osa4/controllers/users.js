const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()


usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({})
    .populate('blogs')
    response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const existingUser = await User.find({username: body.username})
        if (body.password.length < 3) {
            return (response.status(400).json({error: 'Password has to be atleast 3 characters long!'}))
        }
        if (existingUser.length > 0) {
            return (response.status(400).json({error: 'Username is taken!'}))
        }
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            passwordHash,
            name: body.name,
            adult: body.adult === undefined ? true : body.adult
        })

        const savedUser = await user.save()

        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception)
        response.status(500).json({error: 'Something went wrong...'})
    }
})

module.exports = usersRouter