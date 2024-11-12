const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  let allBooks = books;
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
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;

  return res.status(300).json({message: books[isbn]['reviews']});
});

module.exports.general = public_users;
