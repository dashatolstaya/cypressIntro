FROM cypress/included:12.17.0

WORKDIR /e2e

COPY ./package.json .
COPY ./package-lock.json .
COPY ./cypress.config.js .
COPY ./cypress ./cypress

RUN npm install
ENTRYPOINT ["npx", "cypress", "run"]


