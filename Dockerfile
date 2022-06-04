FROM node:16-alpine
WORKDIR /app
EXPOSE 3000:3000
VOLUME "/app"
COPY package.json /app
COPY . /app
RUN npm i
CMD npm run dev