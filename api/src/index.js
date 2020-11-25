import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import { Storage } from '@google-cloud/storage'
import { searchCelebrities, createCelebrity } from './controllers/celebrity'

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

  app.get('/celebrity', searchCelebrities)

  app.post('/celebrity', upload.single('avatar'), createCelebrity({ bucket, bucketName }))

  app.listen(3000, (err) => {
    if (err) {
      console.log(err)
    }
    console.log("App is listening on port 3000")
  })
}


main()