FROM node:20

WORKDIR /app

COPY ../../package.json ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

CMD ["yarn", "start"]
