FROM node:current-alpine
WORKDIR /home-service
COPY . .
RUN npm i

EXPOSE 3000
RUN npm run build
