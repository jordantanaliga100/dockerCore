
FROM node:18

WORKDIR /app

# copy all the json files in to the workdir which is /app 
COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then\
      npm install; \
    else \ 
      npm ci --only=production; \
    fi 

# copy all the installed packages and files in to the workdir which is /app 
COPY . ./

ENV PORT=5000

EXPOSE $PORT

CMD ["npm", "run", "dev"]

