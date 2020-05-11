import React, { useContext, createContext } from 'react'

export const SocketContext = createContext<{ socket?: WebSocket }>({ socket: undefined })
export const useSocket = () => useContext(SocketContext)

export default class SocketProvider extends React.Component<{ url: string, children: React.ReactNode }, { socket?: WebSocket }> {
  constructor(props: any) {
    super(props)
    this.state = { socket: null }
    this.setSocket = this.setSocket.bind(this)
  }

  setSocket(attempt: number): void {
    const ws = new WebSocket(this.props.url)
    let reconnectTimeout
    const url = this.props.url

    ws.onclose = (e) => {
      console.log(`Socket [${url}] connection closed. Reason: [${e.reason}]`)
      this.setState({ socket: null }, () => {
        console.log("Reconnecting ...")

        reconnectTimeout = setTimeout(
          () => {
            if (attempt < 10) { if (!ws || ws.readyState == WebSocket.CLOSED) this.setSocket(attempt + 1) } 
            else {
              console.log(`Socket [${url}] crashed, please restart app later`)
            }
          }, 
          250)
      })
    }

    ws.onerror = (e) => {
      this.setState({ socket: null }, () => {
        console.error(`Socket [${url}] error: [${JSON.stringify(e)}]. Please restart your Client`)
      })
    }

    ws.onopen = () => {
      this.setState({ socket: ws }, () => {
        clearTimeout(reconnectTimeout)
        console.log(`Socket [${url}] connection established`)
      })
    }
  }

  componentDidMount() {
    this.setSocket(1)
  }

  render() {
    const { socket } = this.state

    return (
      <SocketContext.Provider value={{ socket }}>
        {this.props.children}
      </SocketContext.Provider>
    )
  }
}
