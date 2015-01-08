var dns = require('native-dns')
server = dns.createServer()
var amqp = require('amqp')

var url = process.env.AMQP_URL || "amqp://localhost"
var dns_port = process.env.DNS_PORT||53

console.log("Starting dns server on port "+dns_port+" and send to " + url)

function connected() {
  console.log("connected on " + url)
  server.on('request', function (request, response) {
    // console.log(request)
    console.log("["+request.address.address+"] class["+request.question[0].class+"] type["+request.question[0].type+"] "+request.question[0].name)
    conn.publish('dns', { 
      header: request.header,
      question: request.question,
      answer: request.answer,
      authority: request.authority,
      additional: request.additional,
      edns_options: request.edns_options,
      payload: request.payload,
      edns: request.edns,
      edns_version: request.edns_version,
      address: request.address
    })
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

  console.log("Starting on port " +dns_port)
  server.serve(dns_port)
}

var conn = amqp.createConnection({ url: url }, {
  reconnect: true,
  reconnectBackoffStrategy: 'linear',
  reconnectBackoffTime: 500,
  defaultExchangeName: "dns"
})

conn.on('ready', connected)
