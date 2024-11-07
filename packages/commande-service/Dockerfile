FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run drizzle:generate

CMD ["npm", "run", "dev"]
