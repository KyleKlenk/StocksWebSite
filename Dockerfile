FROM node:latest

WORKDIR /usr/src/app
COPY ./WebsiteFiles/package*.json ./

RUN apt-get update || : && apt-get install python -y
RUN npm install

COPY ./WebsiteFiles .

EXPOSE 80
