### 1. USING THE DOCKERFILE

##### Base Image

FROM node:20

##### Working directory

WORKDIR /app

##### Copy the dependencies (json files)

COPY package\*.json .
RUN npm install

##### After running npm install, copy all the packages (usually in the node_modules)

COPY . ./

##### Explicitly add port FOR DOCUMENTATION !

EXPOSE 5000

##### Command inside the docker env

CMD ["npm", "run", "dev"]

##### CLI COMMAND

1. #### Building a image
   docker build -t jordan100/node-app-img .
   docker images
2. #### Running the container
   docker run --name jordan100-node-app-con -d -p 5000:5000
3. #### Deleting container and volume associated with the container
   docker rm jordan100-node-app-con -fv

### 2. USING THE docker-compose

Note: with yml file, spacing matters

1. #### docker-compose up -d --build
2. #### docker-compose down -fv
