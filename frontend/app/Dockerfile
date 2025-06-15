FROM node:22-alpine AS builder
WORKDIR /app
COPY ./ ./ 
RUN npm install
RUN npx ng build

FROM nginx:1.28.0-alpine
COPY --from=builder /app/dist/todo-app /usr/share/nginx/html
COPY --from=builder /app/conf/default.conf /etc/nginx/conf.d/
EXPOSE 80