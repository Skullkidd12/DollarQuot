# syntax=docker/dockerfile:1

FROM node:latest
WORKDIR /dolarquotfront
COPY . .
RUN rm -rf node_modules
RUN npm install
CMD ["npm","run","dev"]
EXPOSE 5173