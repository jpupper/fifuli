# fifuli
P5.js + web sockets + node + heroku example for collaborative drawing

Code / example based on
[this](https://github.com/processing/p5.js/wiki/p5.js,-node.js,-socket.io)

This repo contains mostly the same code, modified to deploy to heroku

Daniel Schiffman also has a video version of much the same stuff here:
https://www.youtube.com/watch?v=bjULmG8fqc8

To use:

    npm install
    node app.js

and/or push to heroku to deploy there

    heroku login
    heroku git:remote -a <the name of your app on heroku goes here>
    git push heroku main
