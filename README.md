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
   docker build -t app-img . ||
   docker build --build-arg NODE_ENV=development -t app-img .
   docker images
2. #### Running the container
   docker run --rm -d -p 5000:5000 --env-file .env --name app-con app-img
3. #### Deleting container, image and volume associated with the container
   docker rm app-con -fv
   docker rmi app-img -fv
4. #### Add volumes for development so that changes to your local files are reflected inside the container without rebuilding the image.
   docker run --rm -d -p 8080:5000 --env-file .env -v %cd%:/app -v /app/node_modules --name app-con app-img
5. #### For extra security, when you dont want the docker container make some changes and appear that to host machine, just put "ro" in the volume that was mounted
   docker run --rm -d -p 8080:5000 --env-file .env -v %cd%:/app:ro -v /app/node_modules --name app-con app-img

### 2. USING THE docker-compose

Note: with yml file, spacing matters

1. #### docker-compose up -d --build
2. #### docker-compose down -fv

Note: for standard and conventions. I seperate the dev and prod yml files. And the command to run is:

## UP

1. docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

## DOWN

2. docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v
