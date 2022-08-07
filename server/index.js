const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

//Import excel.csv
const render = require("xlsx")
const file = render.readFile("./Dataset/BookList-ISE.xlsx")

const bookModel = require('./models/bookModel')
const bookAuthorModel = require('./models/book-authorModel')
const Author = require('./models/authorModel')

app.get("/add-books", async (request, response) => {
  const sheets = file.SheetNames;

  const data = []
  const authorList = []
  const bookAuthorList = []

  // for (let i = 0; i < sheets.length; i++) {
  const sheetName = sheets[1];

  const sheetData = render.utils.sheet_to_json(file.Sheets[sheetName])

  console.log(sheetData)

  // console.log(sheetName)

  // for (let bookInfo of sheetData) {

  //   const inputAuthor = bookInfo.author
  //   let author = []

  //   if (inputAuthor && inputAuthor.includes(',')) {

  //     let str = ''
  //     for (let i = 0; i < inputAuthor.length; i++) {
  //       if (inputAuthor[i] === ' ' && inputAuthor[i - 1] === ',') {
  //         continue
  //       }

  //       if (i == inputAuthor.length - 1) {
  //         str = str + inputAuthor[i]
  //         author.push(str)
  //         str = ''
  //       } else if (!inputAuthor[i].includes(',')) {
  //         str = str + inputAuthor[i]
  //       } else {
  //         author.push(str)
  //         str = ''
  //       }
  //     }
  //   }

  //   const book = new bookModel({
  //     bookName: bookInfo.bookName,
  //     produceYear: bookInfo.produceYear,
  //     available: bookInfo.available,
  //     location: bookInfo.location,
  //     qty: bookInfo.qty,
  //     department: bookInfo.department,
  //   })
  //   await book.save()
  //   // data.push(book)

  //   for (let i = 0; i < author.length; i++) {

  //     const isAuthorExisted = await Author.findOne({ authorName: author[i] })
  //     // console.log('isAuthorExisted', isAuthorExisted)
  //     let newAuthor = null

  //     if (isAuthorExisted) {
  //       newAuthor = isAuthorExisted
  //     } else {
  //       console.log(author[i])
  //       newAuthor = new Author({
  //         authorName: author[i]
  //       })
  //       await newAuthor.save()
  //       // authorList.push(newAuthor)
  //     }

  //     const newBookAuthor = new bookAuthorModel({
  //       bookID: book._id,
  //       authorID: newAuthor._id
  //     })
  //     await newBookAuthor.save()
  //     // bookAuthorList.push(newBookAuthor)

  //   }

  // }
  // console.log('authorList')
  // // const returnedData = await bookModel.insertMany(data)
  response.send({ data: sheetData })
})

app.get("/delete-all-books", async (request, response) => {
  let bookList = await Author.find({}).lean()

  if (!bookList) {
    return response.json({ error: 'No book found' })
  } else {
    for (let book of bookList) {
      await Author.deleteOne({ _id: book._id })
    }
  }

  bookList = await bookModel.find({}).lean()

  if (!bookList) {
    return response.json({ error: 'No book found' })
  } else {
    for (let book of bookList) {
      await bookModel.deleteOne({ _id: book._id })
    }
  }

  bookList = await bookAuthorModel.find({}).lean()

  if (!bookList) {
    return response.json({ error: 'No book found' })
  } else {
    for (let book of bookList) {
      await bookAuthorModel.deleteOne({ _id: book._id })
    }
  }
  response.send({ status: 'ok' })
})


//Face recognition
const cors = require('cors')
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//connect mongoDB
require('dotenv').config
try {
  mongoose.connect("mongodb+srv://User:user@cluster0.dqtd4et.mongodb.net/user?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Database connected"))
} catch (error) {
  console.log("Could not connect database. Error: ", error)
}

app.use('/user', require('./routes/user.js'))
app.use('/books', require('./routes/books'))
app.use('/orders', require('./routes/orders'))

app.use('/api/dialogflow', require('./routes/dialogflow'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
