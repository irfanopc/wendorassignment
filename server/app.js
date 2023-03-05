const express = require('express');
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const cors = require("cors");
const user = require('./routes/user')
const cookieParser = require('cookie-parser');
const productRoute = require('./routes/products');
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: "mongodb+srv://irfanopc:irfanopc@nodeexpressproject.afitwap.mongodb.net/session-store?retryWrites=true&w=majority",
  collection: "sessions"
});

store.on("error", function (error) {
  console.log(error);
});

// set up session middleware
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store: store, // use MongoDBStore as session store
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  })
);

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

app.use('/',user)
app.use('/',productRoute)
mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://irfanopc:irfanopc@nodeexpressproject.afitwap.mongodb.net/eshop?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('DB CONNECTED')).catch((err) => console.log('DB CONNECTION ERROR', err));


app.listen(port, () => { console.log(`app runnning on ${port}`); })