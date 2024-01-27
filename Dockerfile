FROM node:current-alpine3.19

WORKDIR "/app"

COPY ./be/package.json .
RUN npm install
COPY be .

CMD ["npm", "run", "dev"]
