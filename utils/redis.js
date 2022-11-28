const { createClient } = require('redis');

class RedisConnector {
    _client = null
    constructor(options) {
        this.options = options || {}
        this.host = this.options.host || "localhost"
        this.port = this.options.port || 6379
        this.username = this.options.username || ""
        this.password = this.options.password || ""
        this.isConnected = false

        this.init()
    }

    get client() {
        return this._client
    }

    init = () => {
        this._client = createClient({
            socket: {
                host: this.host,
                port: this.port
            },
            username: this.username,
            password: this.password
        })

        if(this._client) {
            this._client.on("connect", () => {
                console.log("connected")
                this.isConnected = true
            })

            this._client.on("error", (error) => {
                this.isConnected = false
            })

            this._client.on("end", () => {
                console.log("end")
                this.isConnected = false
            })
        }

        this._client.connect()
    }
}

module.exports = (_options) => new RedisConnector(_options)
