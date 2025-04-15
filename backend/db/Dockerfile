FROM mongodb/mongodb-community-server:latest

COPY ./initdb.sh /docker-entrypoint-initdb.d/ 

CMD [ "mongod", "--auth" ]