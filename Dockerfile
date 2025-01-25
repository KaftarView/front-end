FROM node:22.9.0-alpine3.20

ENV PREVIEW_PORT=80

WORKDIR /app
COPY . /app
RUN npm cache clean --force && npm install --timeout=60000 && npm run build

CMD [ "npm", "run", "preview" ]
