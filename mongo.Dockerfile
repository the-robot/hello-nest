FROM mongo:7.0.0-rc5-jammy

# Set the desired MongoDB database name
ENV MONGO_INITDB_DATABASE=appdb

# Set the MongoDB configuration file
COPY ./mongod.conf /etc/mongod.conf

# Expose the default MongoDB port
EXPOSE 27017

# Start MongoDB with the custom configuration file
CMD ["mongod", "--config", "/etc/mongod.conf"]
