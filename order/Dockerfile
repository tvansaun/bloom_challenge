FROM node

WORKDIR /order

COPY package*.json /order/

RUN npm install

COPY . /order/

EXPOSE 4001
CMD ["npm", "start"]