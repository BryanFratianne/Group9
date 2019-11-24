var sql = require('mssql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
//login string for connecting to database
var config = "mssql://fratiannba22@group9uww:OriginalOrca81@group9uww.database.windows.net:1433/CrimeDB?encrypt=true";


app.use(express.static(path.join(__dirname, 'public')));
var db = new sql.ConnectionPool(config);
var dbConnect = db.connect();


app.get('/', async function (req, res){
    //sends our webpage
    res.sendFile(path.join(__dirname, 'public/CrimeHTML.html'));

});

app.get('/test', async function (req, res){
    await dbConnect;
    try {
        var request = db.request();
        var result = await request.query("select * from crime_description");
        console.dir(result);
        res.json(result);
    }catch(err){
        console.error('SQL error', err);
    }
});

app.listen(8000, () => {
    console.log("listening on port 8000");
});

