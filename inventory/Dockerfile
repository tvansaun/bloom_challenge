FROM node

WORKDIR /inventory

COPY package*.json /inventory/

RUN npm install

COPY . /inventory/

EXPOSE 4000
CMD ["npm", "start"]