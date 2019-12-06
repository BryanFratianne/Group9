var sql = require('mssql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var primeType = undefined;
var block = undefined;
var minYear = undefined;
var maxYear = undefined;
var district = undefined;

//login string for connecting to database
var config = {
    user: "fratiannba22@group9uww",
    password: 'OriginalOrca81',
    server: 'group9uww.database.windows.net',
    database: 'CrimeDB',
    encrypt: true,
    requestTimeout: 0
};
//bringing in things for express
app.set('views', path.join(__dirname, 'public'));

//bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set static path
app.use(express.static(path.join(__dirname, 'public')));

var db = new sql.ConnectionPool(config);
var dbConnect = db.connect();


app.get('/', async function (req, res) {
    //sends our webpage
    res.sendFile(path.join(__dirname, 'public/CrimeHTML.html'));

});

app.get('/SelectAlliucr', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request.execute('SelectAlliucr');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});
//for the following code will have to change value from "Arson" to req.variable we pass from dropdown
app.post('/getCountByCrime', async function (req, res) {
    primeType = req.body.primaryType;
    res.redirect('/?query=/getCountByCrime');
    //res.sendFile(path.join(__dirname, 'public/CrimeHTML.html?query=/getCountByCrime'));
});
app.get('/getCountByCrime', async function (req, res) {
    console.log(primeType);
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), primeType)
            .execute('getCountByCrime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }

});

app.post('/getCrimesByBlock', async function (req, res) {
    //need to change block variable
    block = req.body.primaryType;
    res.sendFile(path.join(__dirname, 'public/CrimeHTML.html?query=/getCrimesByBlock'));

});

app.get('/getCrimesByBlock', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Block', sql.VarChar(255), block)
            .execute('getCrimesByBlock');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByBlockWithTime', async function (req, res) {
    //need to change block variable
    block = req.body.primaryType;
    minYear = req.body.minYear;
    maxYear = req.body.maxYear;
    res.sendFile(path.join(__dirname, 'public/CrimeHTML.html?query=/getCrimesByBlockWithTime'));
});

app.get('/getCrimesByBlockWithTime', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Block', sql.VarChar(255), block)
            .input('dateMin', sql.VarChar(255), minYear)
            .input('dateMax', sql.VarChar(255), maxYear)
            .execute('getCrimesByBlockWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByDistrict', async function (req, res) {
    //change district variable
    district = req.body.primaryType;
    res.sendFile(path.join(__dirname, 'public/CrimeHTML.html?query=/getCrimesByDistrict'));
});

app.get('/getCrimesByDistrict', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('District', sql.VarChar(255), district)
            .execute('getCrimesByDistrict');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByDistrictWithTime', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('District', sql.VarChar(255), "25")
            .input('dateMin', sql.VarChar(255), '2005')
            .input('dateMax', sql.VarChar(255), '2005')
            .execute('getCrimesByDistrictWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByType', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), "Arson")
            .execute('getCrimesByType');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.get('/getCrimesByType', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), "Arson")
            .execute('getCrimesByType');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByWard', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Ward', sql.VarChar(255), "7")
            .execute('getCrimesByWard');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByWardWithTime', async function (req, res) {
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Ward', sql.VarChar(255), "7")
            .input('dateMin', sql.VarChar(255), '2005')
            .input('dateMax', sql.VarChar(255), '2005')
            .execute('getCrimesByWardWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.listen(8000, () => {
    console.log("listening on port 8000");
});

