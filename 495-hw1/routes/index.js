var express = require('express');
var request = require("request");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('start');
});

router.post('/', function(req, res, next) {
    res.render('start');
});

router.get('/end', function(req, res, next) {
    res.redirect('/');
});

router.post('/end', function(req, res, next) {
    console.log(req.body);

    amount = req.body.amount;
    firstc = req.body.firstc;
    secondc = req.body.secondc;

    if (amount === '') {
        amount = '1.000';
    }

    exchangeRates(firstc, secondc, amount, res);
});

function exchangeRates(first, second, amount, res) {
    request({
        url :'http://api.fixer.io/latest?base=' + first,
        method: 'GET'
    }, function (error, response, body) {
        if (error) {
            console.log('Error message: ', error);
        }
        else if (response.body.error) {
            console.log('Response Error: ', response.body.error);
        }
        var data = JSON.parse(body);
        var value = data['rates'][second] * amount;
        if (first === second) {
            value = amount;
        }
        res.render('end', { firstf: firstc, secondf: secondc, first_amount: amount, result_amount: value });
    });
}

module.exports = router;
