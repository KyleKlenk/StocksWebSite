FROM node:latest

WORKDIR /usr/src/app
COPY ./WebsiteFiles/package*.json ./

RUN apt-get update || : && apt-get install python -y
RUN apt install python3-pip
RUN pip3 install mysql-connector-python
RUN npm install

COPY ./WebsiteFiles .

EXPOSE 80
