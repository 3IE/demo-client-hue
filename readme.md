# Demo client philips HUE

## Installation
### Prerequisites :

* [Npm (NodeJS)](http://nodejs.org)

* [Bower](http://www.bower.io)

When these prerequisites are installed, to initialize the solution you must go to the solution root directory and run this command :

```sh
npm install
```

## Development

The _app_ directory contains controllers and views.
The application rules and data access layer must be in the app_engine directory.

In order to understand this architecture project, you should read this [blog article](http://blog.3ie.fr/un-projet-angularjs-avec-typescript)  
To add a package and save it to your bower config file, run this command :

```sh
bower install <package-name> --save
```

## Useful commands

Build the website :

```sh
grunt build
```

Launch the website :

```sh
grunt web
```

Test the website (tslint+karma) :

```sh
grunt testing
```

# Useful links #
Access the website localy :

```html

http://localhost:5000/
```
