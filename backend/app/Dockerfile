FROM node:22-alpine AS builder
WORKDIR /app
COPY ./ ./ 
RUN npm install
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder app/package*.json ./
COPY --from=builder app/dist ./dist
RUN npm ci
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]