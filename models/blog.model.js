import mongoose from "mongoose"

const blog_format = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    posting_date: { type: Date, default: Date.now },
    date_modified: { type: Date, default: Date.now },
    id_blog: { type: String, required: true }
})

const Blog = mongoose.model(
    "Blog", blog_format
)

module.exports = Blog