FROM node:20

WORKDIR /app

COPY ../../package.json ./
RUN yarn install --frozen-lockfile

COPY . .

RUN yarn add vite --dev

RUN yarn build

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173"]

EXPOSE 5173
