# simcellular

#### Angular 4 web application, 04.06.2018

#### By Russell Hofvendahl

## Description

An implementation of Conway's Game of Life, a cellular automaton in which each state is determined by the state prior according to a few simple rules. Application built with Angular CLI and Firebase for data storage.

## Setup/Installation Requirements

To view:
http://simcellular.us

To set up repository:
```
git clone https://github.com/rhofvendahl/webpack-heroku-template
cd webpack-heroku-template

npm install

```
To set up Firebase:
* Make a free account at [Firebase's website](http://firebase.google.com/)
* Create new project
* Select "Add Firebase to your web app"
* Copy credentials provided, set up file src/app/api-keys.ts as follows:
```
export var masterFirebaseConfig = {
    apiKey: "xxxx",
    authDomain: "xxxx.firebaseapp.com",
    databaseURL: "https://xxxx.firebaseio.com",
    storageBucket: "xxxx.appspot.com",
    messagingSenderId: "xxxx"
  };
```
* Return to the [Firebase Console](https://console.firebase.google.com/), select project, select "Database" on left-hand side.
* Select "Rules" on top navbar, change both ".read" and ".write" to "true", then click publish.
* Return to "Database" on left hand side, select 3 vertical dots on right hand side then select "Import JSON"
* Select shapes.json in src to import

To start server:
```
npm start
```

## Technologies Used

Angular CLI, Bootstrap, Firebase

### License

Copyright (c) 2018 Russell Hofvendahl

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
