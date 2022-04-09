# TodoApp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

TodoApp is a simple project with CRUD actions, you can use this repo for experimenting.

App is available at [https://todoappwsbmarcel.azurewebsites.net/](https://todoappwsbmarcel.azurewebsites.net/).

## Features

- Login/logout (via Google)
- Login/logout (via email/password)
- Register account
- Create multiple lists
- Add tasks
- Set task as done or delete it
- Filter tasks by `done` flag

Technologies:

- Google Firebase (database, authentication via Google and email/password with registration)
- React
  - Carbon Design by IBM
  - @react-query-firebase (firebase hooks)
  - @react-firebase (firebase components)
  - date-fns (formatting dates)
  - immutability-helper (mutate copy of fata without changing the original source)
  - styled-components
  - react-helmet (meta tags and title)

### What you need

- [Node](https://nodejs.org/en/) v.16 >=
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 8>=

### How to run project

- go to root directory and run `npm install`
- next, run `npm start`
- project is live on [localhost:3000](http://localhost:3000/)

### Available Scripts

In the project root directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
Make sure you are in root directory.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\

### Deployment

App is hosted on Microsoft Azure. Webapp will automatically rebuild and deploy files to Azure if you push commit to `master` branch. This will happen thanks to [Github Actions](https://github.com/features/actions). Normally it takes about 5-10 minutes.

If you want to contribute, read instruction below.

### Contribution

Simply create an issue or make a PR, I will review it.

If you want to access to repo - create an issue with title *Access to repo - {YOUR_GITHUB_NICKNAME}*

### Learn More about React

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).