# FieldSync Coding Test 

This solution has a PostgreSQL database to store user information with an Express.js API backend project and a React front end project. This solution displays user information from the database as well as from an external API.

## Building Requirements on Windows

This project was run on a Windows 11 machine. Ensure you have docker desktop installed for containerization.

## Running the Program APIs and Database

- First, make sure docker desktop is running.
- Then, from the root folder, run `cd FieldSyncBackend` to go into the API project. Then run `docker compose up` to run the API solution.

## Running the React Front End Site

- From the root folder, run `cd FieldSyncFrontend/fieldsync` to go into the React project. Then run `npm start` to run the project.

### API/Database Architecture

A single table was set up in a PostgreSQL testdb database that holds the user information. There are 3 APIs: one to get users from the database, one to add a user to the database, and one to get users from an external source. These are located in the FieldSyncBackend project. TypeORM was used as a data abstraction layer for accessing data from the database.

### React Front End

The main functions of this page are to view user information, add users, and download users from an external source. At the top, there is a home button, which displays the user information into two possible tables: database users and downloaded users. User information can be added via the Save button. This takes all the downloaded user information and stores it into the database. The Fetch button, grabs the users from the database and resets the downloaded users. The user components are organized in a user folder, generic components in the components folder, and the services, which calls the APIs, is in the services folder.    

## Possible Improvements

There are many possible improvements here:

- Implement better page routing. Given more time, I could probably put together a more elegant way to pass users around via the React Router.
- Could add another table for company so it maps better to the external API.
- Fix the Google maps API. Currently only one marker shows on the map.
- Add update/delete functions to be able to manage the user info better.
- Handle the duplicate user entries a bit better. For now, it just prints to the log.
- Add security. Most of the urls use http as opposed to https.
- Improve styling and theme. Perhaps use something more standard like material UI or bootstrap.
- Add a paginator for when the user information grows.
- Tie in the react site into the docker-compose file so they all start up together.
- Add unit tests.
