# Base Image 
FROM node:20

# Working directory 
WORKDIR /app

# Copy the dependencies (json files)
COPY package.json ./
RUN npm install

# After running npm install, copy all the packages (usually in the node_modules)
COPY . .

ENV PORT=3000

# Explicitly add port FOR DOCUMENTATION ! 
EXPOSE $PORT

CMD ["npm", "run", "dev"]


