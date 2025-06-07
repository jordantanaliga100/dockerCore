# Base Image 
FROM node:20

# Working directory 
WORKDIR /app

# Copy the dependencies (json files)
COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm install; \
        else npm install --omit=dev; \
    fi

# After running npm install, copy all the packages (usually in the node_modules)
COPY . .

ENV PORT=5000

# Explicitly add port FOR DOCUMENTATION ! 
EXPOSE $PORT


CMD ["npm", "run", "dev"]

