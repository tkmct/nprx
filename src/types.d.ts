// TODO: maye it's good to use namespace and split directory from src
export interface Process {
  host?: string
  port: number
}

export interface ProxyConfig {
  source: Process
  target: Process
}

export interface RawConfig {
  proxy?: ProxyConfig[]
}
