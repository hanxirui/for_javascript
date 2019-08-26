var express = require('express');
var pdf = require('html-pdf');
var http = require("http");
var router = express.Router();
var phantom = require('phantom');


router.get('/html2pdf', function (request, response) {

    // http.get("http://172.16.3.74/overview/report/metric?id=99e6f1bb-a1d9-43ba-adf9-7250152980e1&reloadTime=1500878001567", function (res) {

    //     var data = "";
    //     res.on('data', function (chunk) {
    //         data += chunk;
    //     });
    //     res.on("end", function () {
    //         var options = {
    //             // format: 'Letter',
    //             phantomPath: '/Users/hanxirui/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs'
    //         };
    //         debugger;
    //         pdf.create(data, options).toFile('./businesscard.pdf', function (err, res) {
    //             if (err) return console.log(err);
    //             console.log(res); // { filename: '/app/businesscard.pdf' } 
    //         });
    //     });
    // }).on("error", function () {
    //     callback(null);
    // });
    // response.end();


    // var instance = phantom.create([], {
    //     phantomPath: '/Users/hanxirui/Downloads/phantomjs-2.1.1-macosx/bin/phantomjs',
    //     logLevel: 'debug',
    // });
    // var page = instance.createPage();

    // page.property('viewportSize', {
    //     width: 1024,
    //     height: 600
    // });

    // var status = page.open('https://stackoverflow.com/');
    // console.log(status);
    // page.render('stackoverflow.pdf');

    // var content = page.property('content');
    // console.log(content);

    // instance.exit();


    // var _ph, _page, _outObj;

    // phantom.create([], {
    //     phantomPath: 'web/bin/phantomjs',
    //     logLevel: 'error',
    // }).then(ph => {
    //     _ph = ph;
    //     return _ph.createPage();
    // }).then(page => {
    //     _page = page;
    //     _page.property('viewportSize', {
    //         width: 1924,
    //         height: 1000
    //     });
    //     return _page.open('http://172.16.3.74/overview/report/metric?id=99e6f1bb-a1d9-43ba-adf9-7250152980e1&reloadTime=1500878001567');
    // }).then(status => {
    //     console.log(status);
    //     _page.render('stackoverflow.pdf');
    //     return _page.property('content');
    // }).then(content => {
    //     console.log(content);
    //     _page.close();
    //     _ph.exit();
    // }).catch(e => console.log(e));

    debugger;
    var fonts = {
        Roboto: {
            normal: 'web/routes/fonts/Roboto-Regular.ttf',
            bold: 'web/routes/fonts/Roboto-Medium.ttf',
            italics: 'web/routes/fonts/Roboto-Italic.ttf',
            bolditalics: 'web/routes/fonts/Roboto-MediumItalic.ttf'
        }
    };
    try {
        var PdfPrinter = require('../../bower_components/pdfmake/src/printer');
        var printer = new PdfPrinter(fonts);
        var fs = require('fs');

        var docDefinition = {};

        http.get("http://172.16.3.74/overview/report/metric?id=99e6f1bb-a1d9-43ba-adf9-7250152980e1&reloadTime=1500878001567", function (res) {

            var data = "";
            res.on('data', function (chunk) {
                data += chunk;
            });
            res.on("end", function () {
                docDefinition = data;
                var pdfDoc = printer.createPdfKitDocument(docDefinition);
                pdfDoc.pipe(fs.createWriteStream('basics.pdf'));
                pdfDoc.end();
            });
        }).on("error", function () {
            callback(null);
        });
        response.end();


    } catch (err) {
        console.log(err);
    }

});


module.exports = router;