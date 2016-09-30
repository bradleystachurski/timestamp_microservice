'use strict';

var express = require('express');
var app = express();

app.get('/*', function (req, res) {

    var dateObj = {};

    // Parse url and remove formatting
    var parsedUrl = req.originalUrl;
    parsedUrl = parsedUrl.substring(1);
    parsedUrl = decodeURIComponent(parsedUrl);

    // Check parsed date and assign to date variable
    parseDate(parsedUrl);
    var date = parseDate(parsedUrl);

    // Update properties of date object
    if (!date) {
        dateObj = {
            "unix": null,
            "natural": null
        }
    } else {
        dateObj = {
            "unix": getUnixTime(date),
            "natural": getNaturalTime(date)
        }
    }
    res.send(dateObj);
});

app.listen(3000, function () {
    console.log('Listening on port 3000...');
});

function isDate(date) {
    if (Object.prototype.toString.call(date) === "[object Date]") {
        // is a date, now check for valid date
        return !isNaN(date.getTime());
    }
}

function parseDate(date) {
    if (isDate(new Date(date))) {
        // Natural language date
        return new Date(date);
    } else if (isDate(new Date(+date * 1000))) {
        // Unix date
        return new Date(+date * 1000)
    } else {
        return false
    }
}

function getUnixTime(date) {
    return Date.parse(date) / 1000;
}

function getNaturalTime(date) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August",
        "Setpember", "October", "November", "December"];

    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();

    return month + " " + day + ", " + year

}