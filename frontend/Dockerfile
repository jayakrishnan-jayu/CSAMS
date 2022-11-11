FROM node:alpine

RUN mkdir /frontend
COPY . /frontend

COPY package.json /frontend/package.json
RUN cd /frontend; yarn install

COPY . /frontend

EXPOSE 5134

WORKDIR /frontend
