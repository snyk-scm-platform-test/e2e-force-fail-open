FROM node:18-alpine

WORKDIR "/app"

COPY ./be/package.json .
RUN npm install
COPY be .

CMD ["npm", "run", "dev"]
