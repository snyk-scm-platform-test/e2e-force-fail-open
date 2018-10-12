FROM node:alpine

WORKDIR "/app/be"

COPY ./be/package.json .
RUN npm install
COPY be .

CMD ["npm", "run", "dev"]
