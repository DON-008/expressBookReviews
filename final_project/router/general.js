const express = require('express');

let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
let books = []
let bookPromice = new Promise((resolve,reject) => {
    resolve(books = require("./booksdb.js"));
})


// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
  
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let allBooks = []
  bookPromice.then(
    allBooks = books
  )
  
  return res.status(300).json({message: JSON.stringify(allBooks)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  return res.status(300).json({message: books[isbn]});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookKeys = Object.keys(books);
  const filteredBook = [];
  bookKeys.forEach(item=>{
    if(books[item].author == author){
        filteredBook.push(books[item]);
    }
  })
  return res.status(300).json({message: filteredBook});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookKeys = Object.keys(books);
  const filteredBook = [];
  bookKeys.forEach(item=>{
    if(books[item].title == title){
        filteredBook.push(books[item]);
    }
  })
  return res.status(300).json({message: filteredBook});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  return res.status(300).json({message: books[isbn]['reviews']});
});

//app.use(session({secret:"fingerpint"},resave=true,saveUninitialized=true));

module.exports.general = public_users;
