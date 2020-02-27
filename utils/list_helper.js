
const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total,amount) => total + amount.likes,0)
}

const favoriteBlog = blogs => {
    let topBlog = blogs[0]

    blogs.forEach(blog => {
        if (blog.likes > topBlog.likes) {
            topBlog = blog
        }
    })

    return topBlog
}

module.exports = {dummy,totalLikes,favoriteBlog}