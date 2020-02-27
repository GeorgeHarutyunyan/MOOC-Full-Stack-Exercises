
const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    return blogs.reduce((total,amount) => total + amount.likes,0)
}

module.exports = {dummy,totalLikes}