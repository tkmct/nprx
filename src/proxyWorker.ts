import * as net from 'net'
import { Process, ProxyConfig } from './types'

export class ProxyWorker {
  private source: Process
  private target: Process
  private server: net.Server

  constructor({ source, target }: ProxyConfig) {
    this.source = source
    this.target = target
    this.server = net.createServer(sock => {
      sock.on('data', (data: Buffer) => {
        this.onReceiveData(data, sock)
      })
    })
  }

  public onReceiveData = (sdata: Buffer, sock: net.Socket) => {
    console.log('Server received data: ')
    console.log(sdata.toString())
    const connection = net.createConnection(
      {
        host: this.target.host || 'localhost', // TODO: set default host for target object
        port: this.target.port
      },
      () => {
        connection.write(sdata)
      }
    )

    connection.on('data', cdata => {
      sock.write(cdata.toString())
      connection.end()
    })

    connection.on('end', () => {
      console.log('disconnected from server')
    })
  }

  public start = () => {
    this.server.listen({
      host: this.source.host || 'localhost', // TODO: set default host for source object
      port: this.source.port
    })
  }

  public close() {
    this.server.close(() => {
      console.log('Server is closed')
    })
  }
}
