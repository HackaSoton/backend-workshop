import Celebrity from '../models/celebrity'

export async function searchCelebrities(req, res) {
    const query = new RegExp(req.query.name ?? '', 'i')

    const celebs = await Celebrity.find({ name: query }).exec()

    res.status(200)
    res.json(celebs)
}

export function createCelebrity({ bucket, bucketName }) {
  return async (req, res) => {
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
        respondPostRequest(req, res, bucketName, fileName)
      })

      stream.end(req.file.buffer)
    } else {
      respondPostRequest(req, res, bucketName)
    }
  }
}

async function respondPostRequest(req, res, bucketName, fileName = 'default.png') {
  const celeb = new Celebrity({
    name: req.body.name,
    avatarPath: `https://storage.googleapis.com/${bucketName}/${fileName}`
  })

  await celeb.save()

  res.status(201)
  res.json(celeb)
}