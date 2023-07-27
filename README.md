# quest

## Development server

### Basic steps

These steps are common for frontend.

1. Make sure you have `node` version `^16` and `npm` version `^8` installed.


### Frontend

1. Install packages. In the project's ./frontend directory run:

   ```
        npm install
   ```


2. Start angular app. Run in `./frontend` directory:
   ```
         ng serve
   ```
   - Note: Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

2. Before pushing changes on git, run:
    ```
        npm run format
    ```
    &&

    ```
         npm run lint
    ```
   All files in frontend folder must be linted and formatted


### Backend

1. Create an .env file just like example.env in ./backend folder

2. Run Docker Desktop

3. Install packages. In the project's ./backend directory run:

   ```
         yarn install
   ```
4. Start  PostgreSQL. Run in `./backend` directory:
   ```
         docker-compose up -d
   ```
. Start node.js. RunRun in `./backend` directory:
   ```
         yarn start
   ```


### Game description:

1. When you are logged in as an administrator, you can create a team and a game

2. When the admin starts the game, the user has a button, by pressing which he can receive a task

3. Many users can log in under one command and all these users will have the same game data

### login as an admin:

username: kateryna

password: katypass

### all passwords for users 

11111111

