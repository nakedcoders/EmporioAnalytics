FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
COPY . /usr/src/app
EXPOSE 3001 3001
CMD ["npm", "run", "dev", "test"]