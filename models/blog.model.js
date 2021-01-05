import mongoose from "mongoose"

const blog_format = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: Date, default: Date.now },
    id_blog: { type: String }
})

blog_format.pre("save", function (next) {
    const blog = this;
    const time_stamp = Date.now()
    const id_blog = blog.author + "-" + time_stamp;
    blog.id_blog = id_blog

    next()
})
const Blog = mongoose.model(
    "Blog", blog_format
)

module.exports = Blog