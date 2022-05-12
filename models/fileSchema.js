import mongoose from 'mongoose'

const required = true

const userSchema = new mongoose.Schema({
    username:   {type: String},
    ip:       {required, type: String}
})

const fileScheme = new mongoose.Schema({
    filename:   {required, type: String},
    path:       {required, type: String},
    tags:       {required, type: Array},
    user:       userSchema
}, { timestamps: true })

const File = mongoose.model("file", fileScheme)
export default File