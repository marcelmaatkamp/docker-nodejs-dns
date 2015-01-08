$ docker run --name node-dns -ti --link rabbitmq:rabbitmq -e DNS_PORT=5353 -p 5353:5353/udp -e AMQP_URL=amqp://*:*@rabbitmq marcelmaatkamp/nodejs-dns
