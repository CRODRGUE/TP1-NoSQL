FROM mongo:latest

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl nano

RUN mkdir -p -v /srv/mongodb_data/mongod-rs0-1
RUN mkdir -p -v /srv/mongodb_data/mongod-rs0-2
RUN mkdir -p -v /srv/mongodb_data/mongod-rs0-3
RUN chown -R mongodb:mongodb /srv/mongodb_data
RUN chmod -R 774 /srv/mongodb_data

