Gists
=====
This is a small [sails.js](http://sailsjs.org/) application to share markdown documents publicly.
As this is mainly a project for my own use, it is not very easily configurable.

At the first start a user named `admin` is created, the default password can be specified in `config/bootstrap.js`.
Currently user management has no gui, you may want to check out how to do this manually in your database adapter or via `sails console`.

You should run `npm install && bower install && gulp build` before starting the application via `node app`.
The port can be specified via the `PORT` environment variable.

To login and create new articles add a `#/login` to the url (like `http://localhost:1337/#/login`).
Save articles with (`Ctr`+`S`).

ToDo
====
* User Management GUI
* Deletion of Articles
* Easier Configuration
