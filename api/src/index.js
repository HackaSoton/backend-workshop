import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import multer from 'multer'
import { Storage } from '@google-cloud/storage'
import { searchCelebrities, createCelebrity } from './controllers/celebrity'

const PORT = process.env.PORT ?? 3000
const DB_URL = process.env.DB_URL ?? 'mongodb://localhost/test'

const upload = multer({ storage: multer.memoryStorage() })
const bucketName = 'backend-workshop-testing'
const storage = new Storage({
  keyFilename: './workshop-keyfile.json'
})
const bucket = storage.bucket(bucketName)


async function main() {
  await mongoose.connect(DB_URL, {useNewUrlParser: true})

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

  app.use(cors())
  app.use(bodyParser.json())

  app.get('/celebrity', searchCelebrities)

  app.post('/celebrity', upload.single('avatar'), createCelebrity({ bucket, bucketName }))

  app.listen(PORT, (err) => {
    if (err) {
      console.log(err)
    }
    console.log(`App is listening on port ${PORT}`)
  })
}


main()