const express = require('express')
const app = express();
const ejsMate = require('ejs-mate');
// const path = require('path');
var http = require('http').createServer(app);
const IP = require('ip');
const ipAddress = IP.address();
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        //console.log(file);
        cb(null, file.originalname) //Appending extension
    }
})

var upload = multer({ storage: storage });
const fs = require('fs');



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.render('file_input')
    //console.log(req.socket.remoteAddresss);
});

app.post('/', upload.array('files'), (req, res) => {
    //console.log(req.files)

    fs.readdir('./uploads', (err, files) => {
        res.render('file_show', { files })
    });

})

app.get('/show', (req, res) => {
    fs.readdir('./uploads', (err, files) => {
        res.render('file_show', { files })
    });
})

http.listen(3000, ipAddress, (req, res) => {
    console.log(`Server running at http://${ipAddress}:3000/`);
});
