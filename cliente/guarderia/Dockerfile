FROM node:lts-hydrogen as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist/guarderia /usr/share/nginx/html
EXPOSE 80
