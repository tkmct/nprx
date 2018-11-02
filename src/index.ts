import * as fs from 'fs'
import * as net from 'net'

const DEFAULT_CONF_PATH = '/Users/uu107017/.ghq/github.com/tkmct/nprx'
const CONF_PATH = process.env.NPRX_CONF_PATH || DEFAULT_CONF_PATH

const confData = fs.readFileSync(CONF_PATH)
console.info(confData.toString('utf-8', 0, confData.length))

const server = net.createServer(client => {
  client.on('data', data => {
    console.log('Server received data: ', data)
  })
})

server.listen(20000, () => {
  server.on('close', () => {
    console.log('TCP server socket is closed.')
  })
})
