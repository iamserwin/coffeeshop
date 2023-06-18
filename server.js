// Подключение необходимых модулей и установка переменных
const express = require('express'); // Подключение модуля express
const mongoose = require('mongoose'); // Подключение модуля mongoose для работы с MongoDB
const app = express(); // Создание экземпляра приложения express
const connectToMongoDB = require('./database/connections'); // Подключение функции для соединения с MongoDB
const path = require('path'); // Подключение модуля path для работы с путями файловой системы
const routes = require('./routes/routes'); // Подключение модуля маршрутов приложения
const session = require('express-session'); // Подключение модуля express-session для работы с сессиями
const User = require('./models/users'); 
const MongoDBStore = require('connect-mongodb-session')(session); 
require('dotenv').config(); 
const bcrypt = require('bcryptjs'); 


const store = new MongoDBStore({
    uri: process.env.MONGODB_URI, 
    collection: 'sessions' 
});


app.use(session({
    secret: process.env.SECRET_KEY, 
    resave: false, 
    saveUninitialized: false, 
    store: store 
}));

app.use('/css', express.static(__dirname, + '/public/css')); 

app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use(express.urlencoded({ extended: true })); 

app.use('/css', express.static(__dirname + '/public/css')); 
app.use('/img/avatars', express.static(__dirname + '/public/img/avatars')); 
app.use('/img', express.static(__dirname + '/public/img')); 
app.use('/uploads', express.static(__dirname + '/public/uploads')); 
app.use('/js', express.static(__dirname + '/public/js')); 

app.use('/', routes); 


async function start() {
    const uri = await connectToMongoDB(); 
    console.log(uri); 
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); 
    app.listen(3000, () => {
        console.log('Сервер запущен на порту 3000'); 
    });
}

start(); 
