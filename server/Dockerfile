FROM node:16

WORKDIR /opt/server

COPY ./ /opt/server/

EXPOSE 8080

RUN npm i

CMD npm run build && npm run start
