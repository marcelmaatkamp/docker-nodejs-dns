FROM node
MAINTAINER m.maatkamp@gmail.com version: 0.1

# ---
# add libraries

RUN npm install native-dns amqp

# ---
# add sources 

ADD js data
WORKDIR data

ENTRYPOINT      ["node", "server.js"]
