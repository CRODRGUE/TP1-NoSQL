FROM node:slim

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl nano

WORKDIR /app_mongodb

COPY package-lock.json .
COPY package.json .
COPY crud_mongodb.js .
COPY fake_data.js .
COPY index.js .

RUN npm i


EXPOSE 8989
CMD ["node", "index.js"]