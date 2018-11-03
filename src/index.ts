import { ProxyWorker } from './proxyWorker'
import { RawConfig } from './types'

const workerQueue: ProxyWorker[] = []

async function main() {
  const DEFAULT_CONF_PATH = '../nprx.config.json'
  const CONF_PATH = process.env.NPRX_CONF_PATH || DEFAULT_CONF_PATH

  // TODO: implement parsing function from raw json file
  // using decoder library
  const config: RawConfig = await import(CONF_PATH).then(data => data)

  if (config.proxy) {
    // TODO: check which is higher speed single thread or spawn new thread/process
    config.proxy.forEach(p => {
      const pw = new ProxyWorker(p)
      pw.start()
      workerQueue.push(pw)
    })
  }
}

main()
