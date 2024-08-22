# syntax=docker/dockerfile:1

FROM node
WORKDIR /dolarquotserver
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD ["npm","run","start"]
EXPOSE 3000