FROM cypress/base:10
WORKDIR /app

# dependencies will be installed only if the package files change
COPY package*.json ./

COPY . .

RUN npm i
# verify that Cypress has been installed correctly.
# running this command separately from "cypress run" will also cache its result
# to avoid verifying again when running the tests
RUN npx cypress verify