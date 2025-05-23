import express, { Express, Request, Response } from "express";

import kvsRouter from './routers/kvs';
import viewRouter from './routers/view';
import { socket, view } from "./util/store";
import statusRouter from "./routers/status";
import resetRouter from "./routers/reset";
import { calculateHeartbeatSocket, HEARTBEAT_INITIAL_DELAY_MS } from "./util/heartbeat";

const app: Express = express()
const port = 8090
const host = '0.0.0.0'

app.use(express.json())

app.use('/kvs', kvsRouter)

app.use('/view', viewRouter)

app.use('/reset', resetRouter)

app.use('/status', statusRouter)

app.all('*', (req, res) => {
  res.status(404).send({ error: 'Endpoint does not exist' })
})

app.listen(port, host, () => {
  console.log(`Key-Value Store running on http://${host}:${port}`)

  const connectedSockets = [...view].filter((sock) => sock !== socket)

  if (connectedSockets.length > 0) {
    // Send to a connected socket, let them broadcast
    console.log(
      `INITIALIZING ${socket}, sending add request to ${connectedSockets[0]}`,
    )
    fetch(`http://${connectedSockets[0]}/view`, {
      method: 'PUT',
      body: JSON.stringify({
        'socket-address': socket,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((_) => {})
  }

  setTimeout(() => {
    calculateHeartbeatSocket()
  }, HEARTBEAT_INITIAL_DELAY_MS)
})
