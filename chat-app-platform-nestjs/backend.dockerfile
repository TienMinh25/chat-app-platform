FROM node:21-alpine as development
WORKDIR /usr/src

ENV NODE_ENV=development

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

EXPOSE 3003

CMD [ "npm", "run", "start:dev" ]

FROM node:21-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/dist ./dist

EXPOSE 3003

CMD ["node", "dist/main"]