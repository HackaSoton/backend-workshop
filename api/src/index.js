import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import { Storage } from '@google-cloud/storage'
import Celebrity from './models/celebrity'

const upload = multer({ storage: multer.memoryStorage() })
const projectId = 'hackasoton-workshops'
const bucketName = 'backend-workshop-testing'
const storage = new Storage({
  keyFilename: './workshop-keyfile.json'
})
const bucket = storage.bucket(bucketName)


async function main() {
  await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

  // const celeb = new Celebrity({
  //   name: 'dan',
  //   avatarPath: 'nowhere'
  // })

  // try {
  //   await celeb.save()
  //   console.log(`Saved ${celeb.toString()}.`)
  // } catch (err) {
  //   console.log(err)
  // }

  const app = express()

  app.use(bodyParser.json())

  app.get('/celebrity', async (req, res) => {
    const query = new RegExp(req.query.name ?? '', 'i')

    const celebs = await Celebrity.find({ name: query }).exec()

    res.status(200)
    res.json(celebs)
  })

  app.post('/celebrity', upload.single('avatar'), async(req, res) => {
    if (req.file !== undefined) {
      const fileName = `${Date.now()}-${req.file.originalname}`
      const file = bucket.file(fileName)

      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype
        }
      })

      stream.on('error', (err) => {
        console.log(err)
        res.status(500).send('Unable to upload the given file.')
      })

      stream.on('finish', () => {
        respondPostRequest(req, res, fileName)
      })

      stream.end(req.file.buffer)
    } else {
      respondPostRequest(req, res)
    }
  })

  app.listen(3000, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("App is listening on port 3000")
  })
}

async function respondPostRequest(req, res, fileName = 'default.png') {
  const celeb = new Celebrity({
    name: req.body.name,
    avatarPath: `https://storage.googleapis.com/${bucketName}/${fileName}`
  })

  await celeb.save()

  res.status(201)
  res.json(celeb)
}

main()