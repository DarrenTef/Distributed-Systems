const express = require('express')
const app = express()
const port = 8090

const isMainServer = !process.env.FORWARDING_ADDRESS

const store = {}

const proxy = async (req, res, next) => {
  if (isMainServer) {
    return next()
  }

  const { method, body } = req
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }

  if (method != 'GET' && method != 'HEAD') {
    options.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(
      `http://${process.env.FORWARDING_ADDRESS}${req.path}`,
      options,
    )
    const result = await response.json()
    const status = response.status
    res.status(status).send(result)
  } catch (e) {
    res.status(503).send({ error: 'Cannot forward request' })
  }
}

app.use(express.json())

app.use(proxy)

app.put('/kvs/:key', async (req, res) => {
  const key = req.params.key
  const value = req.body.value
  if (!value) {
    return res
      .status(400)
      .json({ error: 'PUT request does not specify a value' })
  }
  if (key.length > 50) {
    return res.status(400).json({ error: 'Key is too long' })
  }
  if (key in store) {
    store[key] = value
    res.status(200).json({ result: 'replaced' })
  } else {
    store[key] = value
    res.status(201).json({ result: 'created' })
  }
})

app.get('/kvs/:key', (req, res) => {
  const key = req.params.key

  if (key in store) {
    return res.send({ result: 'found', value: store[key] })
  }
  res.status(404).send({ error: 'Key does not exist' })
})

app.delete('/kvs/:key', (req, res) => {
  const key = req.params.key
  if (key in store) {
    delete store[key]
    return res.status(200).json({ result: 'deleted' })
  }
  return res.status(404).json({ error: 'Key does not exist' })
})

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Endpoint does not exist' })
})

app.listen(port, () => {
  console.log(`Key-Value Store running on http://localhost:${port}`)
})