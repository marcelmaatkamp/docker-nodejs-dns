$ docker run --name node-dns -ti --link rabbitmq:rabbitmq -e DNS_PORT=5335 -p 5335:5335/udp -e AMQP_URL=amqp://*:*@rabbitmq marcelmaatkamp/nodejs-dns
