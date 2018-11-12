const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map (blog => blog.likes)
    const indexOfFavoriteBlog = likes.indexOf(Math.max.apply(Math, likes))
    return blogs[indexOfFavoriteBlog]
}

module.exports = {
    dummy, 
    totalLikes,
    favoriteBlog
}