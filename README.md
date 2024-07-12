# Chat Platform React

![preview](https://i.imgur.com/DQlHtCB.png)

# Installation

Before you try to run this project locally, you must have both the React & NestJS project, as well as a SQL database. I use MySQL, but you can switch to another database like PostgreSQL very easily.

1. Clone this repository and install all dependencies.
2. Go to [Chat Platform NestJS repository](https://github.com/TienMinh25/chat-app-platform) and follow all the instructions on setting up all project.
3. Run both projects using the `start:dev` script using either `npm`, `yarn`, or whatever package manager you use.
4. There is no landing page, the main routes are:
   - `/register` route to create an account
   - `/login` to login to the app
   - `/conversations` is where all the magic happens
