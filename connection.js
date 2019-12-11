var sql = require('mssql');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

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

app.post('/SelectAlliucr', async function (req, res) {
    console.log("connecting 1");
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

app.post('/getCountByCrime', async function (req, res) {
    console.log("connecting 2");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), req.body.primaryType)
            .execute('getCountByCrime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByBlock', async function (req, res) {
    console.log("connecting 3");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Block', sql.VarChar(255), req.body.block)
            .execute('getCrimesByBlock');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByBlockWithTime', async function (req, res) {
    console.log("connecting 4");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Block', sql.VarChar(255), req.body.block)
            .input('dateMin', sql.VarChar(255), req.body.minYear)
            .input('dateMax', sql.VarChar(255), req.body.maxYear)
            .execute('getCrimesByBlockWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByDistrict', async function (req, res) {
    console.log("connecting 5");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('District', sql.VarChar(255), req.body.district)
            .execute('getCrimesByDistrict');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByDistrictWithTime', async function (req, res) {
    console.log("connecting 6");
    console.log("district is " + req.body.district);
    console.log("dateMin is " + req.body.minYear);
    console.log("dateMax is " + req.body.maxYear);
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('District', sql.VarChar(255), req.body.district)
            .input('dateMin', sql.VarChar(255), req.body.minYear)
            .input('dateMax', sql.VarChar(255), req.body.maxYear)
            .execute('getCrimesByDistrictWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByType', async function (req, res) {
    console.log("connecting 7");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), req.body.primaryType)
            .execute('getCrimesByType');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByTypeWithTime', async function (req, res) {
    console.log("connecting 8");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('primaryType', sql.VarChar(255), req.body.primaryType)
            .input('dateMin', sql.VarChar(255), req.body.minYear)
            .input('dateMax', sql.VarChar(255), req.body.maxYear)
            .execute('getCrimesByTypeWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByWard', async function (req, res) {
    console.log("connecting 9");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Ward', sql.VarChar(255), req.body.ward)
            .execute('getCrimesByWard');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/getCrimesByWardWithTime', async function (req, res) {
    console.log("connecting 10");
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('Ward', sql.VarChar(255), req.body.ward)
            .input('dateMin', sql.VarChar(255), req.body.minYear)
            .input('dateMax', sql.VarChar(255), req.body.maxYear)
            .execute('getCrimesByWardWithTime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.post('/storeNewCrime', async function (req, res) {
    console.log("connecting 11");
    console.log(req.body.caseNumber);
    console.log(req.body.domestic);
    console.log(req.body.arrest);
    console.log(req.body.iucr);
    console.log(req.body.date);
    console.log(req.body.year);
    console.log(req.body.block);
    console.log(req.body.ward);
    console.log(req.body.district);
    console.log(req.body.longitude);
    console.log(req.body.latitude);
    console.log(req.body.locationDescription);
    await dbConnect;
    try {
        var request = db.request();
        var result = await request
            .input('case_number', sql.VarChar(255), req.body.caseNumber)
            .input('arrest', sql.VarChar(255), req.body.arrest)
            .input('domestic', sql.VarChar(255), req.body.domestic)
            .input('iucr', sql.VarChar(255), req.body.iucr)
            .input('date', sql.VarChar(255), req.body.date)
            .input('year', sql.VarChar(255), req.body.year)
            .input('block', sql.VarChar(255), req.body.block)
            .input('Ward', sql.VarChar(255), req.body.ward)
            .input('district', sql.VarChar(255), req.body.district)
            .input('longitude', sql.VarChar(255), req.body.longitude)
            .input('latitude', sql.VarChar(255), req.body.latitude)
            .input('location_description', sql.VarChar(255), req.body.locationDescription)
            .execute('storeNewCrime');
        console.dir(result);
        res.json(result);
    } catch (err) {
        console.error('SQL error', err);
    }
});

app.listen(8000, () => {
    console.log("listening on port 8000");
});

