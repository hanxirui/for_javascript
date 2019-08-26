var express = require('express');
var pdf = require('html-pdf');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/html2pdf', function (request, response) {
  debugger;
  http.get("www.baidu.com", function (res) {
    debugger;
    var data = "";
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on("end", function () {
      var options = {
        format: 'Letter'
      };

      pdf.create(data, options).toFile('./businesscard.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); // { filename: '/app/businesscard.pdf' } 
      });
    });
  }).on("error", function () {
    callback(null);
  });
  response.end();
});


module.exports = router;