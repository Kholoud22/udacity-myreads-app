# MyReads Project

The My Reads App allows you to track books and place them on one of three bookshelves.

# Deployed
https://my-reads-udacity-app.herokuapp.com/ 

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

```
##setup your environment

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/)

## Installed Packages

**Dependencies**

- [Prop Types](https://www.npmjs.com/package/prop-types)
- [React](https://facebook.github.io/react/)
- [ReactDOM](https://facebook.github.io/react/docs/react-dom.html)
- [React Router Dom](https://www.npmjs.com/package/react-router-dom)

##Command prompt to run project
- get project
- cd into it
- yarn start

## Backend Server

The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods that is necessary to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.


