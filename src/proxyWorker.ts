import * as net from 'net'
import { Process, ProxyConfig } from './types'

export class ProxyWorker {
  private source: Process
  private target: Process

  constructor({ source, target }: ProxyConfig) {
    this.source = source
    this.target = target

    console.log(this.target)
  }

  // Start proxy server
  public start() {
    const server = net.createServer(client => {
      client.on('data', data => {
        console.log('Server received data: ', data)
      })
    })

    server.listen(this.source.port, () => {
      server.on('close', () => {
        console.log('TCP server socket is closed.')
      })
    })
  }
}
