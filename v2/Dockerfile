
FROM node:18

WORKDIR /app

COPY package*.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then\
      npm install; \
    else \ 
      npm ci --only=production; \
    fi 

COPY . .

ENV PORT=8080

EXPOSE ${PORT}

CMD ["npm", "run", "dev"]

