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

