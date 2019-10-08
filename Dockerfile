FROM node:12.11-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN yarn --production

# Bundle app source
COPY . /app

EXPOSE 8000

CMD yarn start