var sql = require('mssql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
//login string for connecting to database
//var config = "mssql://fratiannba22@group9uww:OriginalOrca81@group9uww.database.windows.net:1433/CrimeDB?encrypt=true";
var config = {
    user: "fratiannba22@group9uww",
    password: 'OriginalOrca81',
    server: 'group9uww.database.windows.net',
    database: 'CrimeDB',
    encrypt: true,
    requestTimeout: 0
};

app.use(express.static(path.join(__dirname, 'public')));
var db = new sql.ConnectionPool(config);
var dbConnect = db.connect();


app.get('/', async function (req, res) {
    //sends our webpage
    res.sendFile(path.join(__dirname, 'public/CrimeHTML.html'));

});

app.get('/SelectAlliucr', async function (req, res){
    await dbConnect;
    try {
        var request = db.request();
        var result = await request.execute('SelectAlliucr');
        console.dir(result);
        res.json(result);
    }catch(err){
        console.error('SQL error', err);
    }
});
//for the following code will have to change value from "Arson" to req.variable we pass from dropdown
app.get('/getCountByCrime', async function (req, res){
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), "Arson")
            .execute('getCountByCrime');
        console.dir(result);
        res.json(result);
    }catch(err){
        console.error('SQL error', err);
    }
});

app.get('/getCrimesByBlock', async function (req, res){
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Block', sql.VarChar(255), "016XX E 86TH PL")
            .execute('getCrimesByBlock');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.listen(8000, () => {
    console.log("listening on port 8000");
});

