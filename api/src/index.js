import mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'

import Celebrity from './models/celebrity'

async function main() {
  await mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
  const db = mongoose.connection

  const celeb = new Celebrity({
    name: 'dan',
    avatarPath: 'nowhere'
  })

  try {
    await celeb.save()
    console.log(`Saved ${celeb.toString()}.`)
  } catch (err) {
    console.log(err)
  }

  const app = express()

  app.use(bodyParser())

  app.get('/celebrity', async (req, res) => {
    const query = new RegExp(req.query.name ?? '', 'i')

    const celebs = await Celebrity.find({ name: query }).exec()

    res.status(200)
    res.json(celebs)
  })

  app.post('/celebrity', async(req, res) => {
    const celeb = new Celebrity({
      name: req.body.name
    })

    await celeb.save()

    res.status(201)
    res.json(celeb)
  })

  app.listen(3000, (err) => {
  if (err) {
    console.log(err)
  }
  console.log("App is listening on port 3000")
  })
}

main()