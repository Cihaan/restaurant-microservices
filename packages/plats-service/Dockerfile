FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src

COPY tsconfig.json .

COPY drizzle.config.ts ./

RUN npm run drizzle:generate

CMD ["npm", "run", "dev"]
