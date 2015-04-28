FROM node
MAINTAINER m.maatkamp@gmail.com version: 0.1

# ---
# add libraries

RUN npm install native-dns
RUN npm install amqp

# ---
# add sources 

ADD js data

ENTRYPOINT      ["node", "server.js"]
