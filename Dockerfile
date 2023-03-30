FROM node:19-alpine3.17

WORKDIR "/app"

COPY ./be/package.json .
RUN npm install
COPY be .

CMD ["npm", "run", "dev"]
