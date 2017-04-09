var express = require('express');
var router = express.Router();

var DB = require('documentdb-client');
var db = DB({
    databaseId: 'HW',
    host: 'https://ceng495-hw2.documents.azure.com:443/',
    masterKey: 'x7RDcTERz30unoP6Aw0IVDZYRm2gPvwpUnBLvkqNGPtJKSvrV6NL5pw1cUyZs9lyEAP7vEUqFjaU8OMhKLmyxQ==',
    consistencyLevel: 'Session'
});
var movies = db.createCollection('Movies');
var index = 1;

router.post('/end', function (req, res, next) {
    console.log('/end POST');
    console.log(req.body);
    customJson = {};
    customJson.releaseDate = req.body.releaseDate;
    customJson.movieName = req.body.movieName;
    customJson.tags = req.body.tags;
    customJson.url = req.body.url;
    customJson.actors = req.body.actors;
    for (var i = 0; i < req.body.indexValue; i++) {
        customJson[req.body[i][0]] = req.body[i][1];
    }
    console.log(customJson);
    movies.put(index.toString(), customJson, function (err, result) {
        if (err) {
            console.log('Add movie error');
            console.log(err);
        }
        index++;
        res.render('index');
    });
    // res.render('index');
});

function getAction(callback) {
    var query = 'SELECT * FROM Movies';
    movies.sqlquery(query, function (err, results) {
        if (err) {
            console.log('Get all movies error');
            console.log(err);
        }
        callback(results);
    });
}

router.post('/data', function (req, res, next) {
    console.log('/data POST');
    getAction (function (result) {
        res.send(result);
    });
});

router.post('/delete', function (req, res, next) {
    console.log('/delete POST');
    console.log(req.body);
    movies.delete(req.body.id, function (err, result) {
        if (err) {
            console.log('Delete movie error');
            console.log(err);
            return res.send({'result': 'DELETE_FAIL'});
        }
        res.send({'result': 'DELETE_SUCCESS'});
    });
});

router.post('/update', function (req, res, next) {
    console.log('/update POST');
    console.log(req.body);
    movies.get(req.body.id.toString(), function (err, result) {
        if (err) {
            console.log('Update movie part 1 error');
            console.log(err);
            return res.send({'result': 'UPDATE_FAIL'});
        }
        console.log(result);

        var updatedData = req.body;
        updatedData._self = result._self;
        updatedData.id = result.id;
        updatedData._rid = result._rid;
        updatedData._etag = result._etag;
        updatedData._attachments = result._attachments;
        updatedData._ts = result._ts;

        console.log(updatedData);

        movies.put(updatedData.id.toString(), updatedData, function (err, result) {
            if (err) {
                console.log('Update movie part 2 error');
                console.log(err);
            }
            res.send({'result': 'UPDATE_SUCCESS'});
        });
    });
});

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/end', function (req, res, next) {
    res.redirect('/');
});

router.get('/data', function (req, res, next) {
    res.redirect('/');
});

router.get('/update', function (req, res, next) {
    res.redirect('/');
});

router.get('/delete', function (req, res, next) {
    res.redirect('/');
});

module.exports = router;
