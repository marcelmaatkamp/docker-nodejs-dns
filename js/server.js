var dns = require('native-dns')
server = dns.createServer()
var amqp = require('amqp')

var url = process.env.AMQP_URL || "amqp://localhost"
var dns_port = process.env.DNS_PORT||53

console.log("Starting dns server on port "+dns_port+" and send to " + url)

function connected() {
  console.log("connected on " + url)
  server.on('request', function (request, response) {
    console.log(request)
    console.log("name: " + request.question[0].name)
    conn.publish('dns', request.question)
    response.answer.push(dns.A({
      name: request.question[0].name,
      address: '127.0.0.1',
      ttl: 600,
    }))
    response.send()
  })

  server.on('error', function (err, buff, req, res) {
    console.log(err.stack)
  })

  server.serve(dns_port)
}

var conn = amqp.createConnection({ url: url }, {
  reconnect: true,
  reconnectBackoffStrategy: 'linear',
  reconnectBackoffTime: 500,
  defaultExchangeName: "dns"
})

conn.on('ready', connected)
