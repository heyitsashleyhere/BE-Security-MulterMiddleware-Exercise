import express from "express"
import multer from "multer"
import File from '../models/fileSchema.js'
import path from "path" // this is a built in function from node

// Configured multer
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024*1024 } })

const apiRouter = express.Router()

const handleUpload = upload.fields([{ name: "file", maxCount: 1 }])

apiRouter
    .post("/uploadImage", handleUpload, async (req, res) => {

        // https://stackoverflow.com/questions/8107856/how-to-determine-a-users-ip-address-in-node
        // https://stackoverflow.com/questions/10849687/express-js-how-to-get-remote-client-address
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        // console.log(req.headers['user-agent']);
        // console.log('ip :>> ', ip);; // ip address of the user
        // console.log('req.body.tags :>> ', req.body.tags);
        // console.log('req.files :>> ', req.files);
        let tagArr = []
        if(req.body.tags.includes(",")){
            tagArr = (req.body.tags).split(',')
        } else if (req.body.tags.includes(' ')){
            tagArr = (req.body.tags).split(' ')
        }

        try {
            await File.create({
                filename: req.files.file[0].filename,
                path: req.files.file[0].path,
                tags: tagArr,
                user: { ip }
            })
            res.json({ success: true })
          } catch (error) {
            res.status(500).json({ error: error.message })
            console.log('error :>> ', error);
          }
    })
    .get("/recentUploads", async (req, res) => {
        const recentFive = await File.find().sort({'createdAt' : "descending"}).limit(5)
        console.log('recentFive :>> ', recentFive);
        res.send(recentFive)
    })
    .get("/:fileId", async (req, res) => {
        const file = await File.findById(req.params.fileId)
        const absolutePath = path.resolve(file.path)
        console.log('file.path :>> ', file.path);
        res.sendFile(absolutePath)
    })  

export default apiRouter