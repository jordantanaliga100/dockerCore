# $Configurations:

### vite.config:

- import react from "@vitejs/plugin-react";
- import { defineConfig } from "vite";
- export default defineConfig({
  plugins: [react()],
  server: {
  watch: {
  usePolling: true,
  },
  host: true, // needed for the Docker Container port mapping to work
  strictPort: true,
  port: 3000, // you can replace this port with any port
  },
  });

### Dockerfile:

    FROM node
    WORKDIR /app
    RUN npm i -g pnpm
    COPY package*.json pnpm-lock.yaml* ./
    RUN pnpm install
    COPY . .

    ## this env will push to the containers

    ENV VITE_APP_NAME=jordan

    ## EXPOSE [Port you mentioned in the vite.config file]

    EXPOSE 3000

    CMD ["pnpm", "dev"]

### Docker commands:

1. build
   - docker build -t react-img .
2. run
   - docker run -d --rm -p 3000:3000 -v %cd%:/app:ro --name react-con react-img
