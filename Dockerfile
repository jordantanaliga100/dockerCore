# Base image
FROM node:20

# Work dir
WORKDIR /app

# Copy the dependencies in the packages.json to the working directory 
COPY package*.json .
# after copying the deps from packagesjson to work dir, it install it using the command
RUN npm install 

# Copy all the files (for example the node_modules) -- the rest of the application code
COPY . .

# Explicitly add port 
EXPOSE 5000

CMD ["npm", "run", "start"]

