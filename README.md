```
 $ docker run -d \
    --name node-dns \
    --link rabbitmq:rabbitmq \
    -e AMQP_HOST=rabbitmq \
    -e AMQP_PORT=5672
    -e DNS_PORT=5335 \
    -p 5335:5335/udp \
    marcelmaatkamp/nodejs-dns
```
