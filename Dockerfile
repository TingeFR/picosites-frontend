# build environment
FROM node:16 as build

# Create app directory
WORKDIR /usr/src/app

# Copy app source
COPY . .

RUN npm install
RUN npm run build

# prod environment
FROM nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
