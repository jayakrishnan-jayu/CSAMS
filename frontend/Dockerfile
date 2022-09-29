FROM node:alpine

RUN mkdir /frontend
COPY . /frontend

COPY package.json /frontend/package.json
RUN cd /frontend; yarn install

COPY . /frontend

EXPOSE 3000

WORKDIR /frontend