import * as net from 'net'

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
