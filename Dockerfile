FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lock ./
COPY tsconfig.json ./

RUN bun install --frozen-lockfile

COPY . .

RUN bun run build

EXPOSE 8081

CMD ["bun", "start"]