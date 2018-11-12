const {Promise} = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../index')
const {blogs, format, nonExistingId, blogsInDb, usersInDb} = require('./test_helper')
const users = require('../testData/testUsers')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

describe('when there is initially some blogs saved', async () => {
    beforeAll(async () => {
        await Blog.remove({})

        const blogObjects = blogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('all notes are returned as json by GET /api/blogs', async () => {
        const blogsInDatabase = await blogsInDb()
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.length).toBe(blogsInDatabase.length)

        const returnedTitles = response.body.map(blog => blog.title)
        blogsInDatabase.forEach(blog => {
            expect(returnedTitles).toContain(blog.title)
        })
})

describe('addiditon of a new blog', async () => {
    test('POST /api/blogs succeeds with valid data', async () => {
        const blogsAtStart = await blogsInDb()
        
        const newBlog = {
            title: 'Uusi otsikko',
            author: 'Bloggaaja',
            url: 'blogsite.com',
            likes: 9000
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length + 1)
        
        const titles = blogsAfterOperation.map(blog => blog.title)
        expect(titles).toContain('Uusi otsikko')

    })

    test('If likes undefined likes is set to 0', async () => {
        const blogsAtStart = await blogsInDb()

        const newBlog = {
            title: 'Likes is set to zero',
            author: 'Bloggaaja',
            url: 'blogsite.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAfterOperation = await blogsInDb()

        const likes = blogsAfterOperation.map(blog => blog.likes)

        expect(likes[likes.length -1]).toBe(0)
    })

    test('POST If content and url are missing return status 400', async () => {
        const blogsAtStart = await blogsInDb()
        const newBlog = {
            likes: 1234
        }
        await api  
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const blogsAfterOperation = await blogsInDb()

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
    })
})

describe('deletion of a blog', async () => {
    let addedBlog

    beforeAll(async () => {
        addedBlog = new Blog ({
            title: 'Poistettava',
            author: 'Poistetaan',
            url: 'Poistoon',
            likes: 9000
        })
        await addedBlog.save()
    })
    
    test('DELETE /api/blogs/:id succees with proper status code', async () =>  {
        const blogsAtStart = await blogsInDb()

        await api
            .delete(`/api/blogs/${addedBlog._id}`)
            .expect(204)

        const blogsAfterOperation = await blogsInDb()

        const titles = blogsAfterOperation.map(blog => blog.title)

        expect(titles).not.toContain(addedBlog.title)
        expect(blogsAfterOperation.length).toBe(blogsAtStart.length - 1)
    })
})

describe('updating a blog', async () => {

    test('updating a blog', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToBeUpdated = blogsAtStart[0]
    updatedBlog = {
        title: blogToBeUpdated.title,
        author: blogToBeUpdated.author,
        url: blogToBeUpdated.url,
        likes: blogToBeUpdated.likes +1
    }

    await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .send(updatedBlog)
        .expect(200)

        const blogsAfterOperation = await blogsInDb()

        expect(blogsAfterOperation.length).toBe(blogsAtStart.length)
        expect(blogsAfterOperation[0].likes).toBe(blogToBeUpdated.likes + 1)
    })    
})
})

describe('user tests when there are two users initially', async () => {
    beforeAll(async () => {
        await User.remove({})

        const userObjects = users.map(user => new User(user))
        const promiseArray = userObjects.map(user => user.save())
        await Promise.all(promiseArray)
    })

    test('adding a new user', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: "lisaystestiUkko",
            password: "Salasana",
            name: "matti"
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfterOperation = await usersInDb()

        const usernames = usersAfterOperation.map(user => user.username)

        expect(usersAfterOperation.length).toBe(usersAtStart.length + 1)
        expect(usernames).toContain(newUser.username)
    })
    

    test('adding a user with a taken name', async () => {
        const usersAtStart = await usersInDb()
        
        const newUser = {
            username: "hellas",
            password: "sekerd",
            name: "duplikaatti"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

            const usersAfterOperation = await usersInDb()
            const names = usersAfterOperation.map(user => user.name)

            expect(usersAfterOperation.length).toBe(usersAtStart.length)
            expect(names).not.toContain(newUser.name)
    })

    test('addind a user with short password', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: "hellas",
            password: "sd",
            name: "duplikaatti"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

            const usersAfterOperation = await usersInDb()
            const names = usersAfterOperation.map(user => user.name)

            expect(usersAfterOperation.length).toBe(usersAtStart.length)
            expect(names).not.toContain(newUser.name)
    })
})

afterAll(() => {
    server.close()
})
