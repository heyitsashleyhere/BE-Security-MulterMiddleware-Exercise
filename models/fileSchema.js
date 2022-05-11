import mongoose from 'mongoose'

const required = true

const fileScheme = new mongoose.Schema({
    filename:   {required, type: String},
    path:       {required, type: String},
    tags:       {required, type: Array},
    user:       new mongoose.Schema({ username: { type: String }, ip: { required, type: String}})
}, { timestamps: true })

const File = mongoose.model("file", fileScheme)
export default File