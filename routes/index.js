var express = require('express');
var router = express.Router();
var hue = require("node-hue-api");
var _ = require('lodash');
var user = 'cUbhu5QBLX-R-TNNhDqKQAD2VAwoVDOtBUf56TNb';

var HueApi = hue.HueApi,
    lightState = hue.lightState;


var displayResult = function(result) {
    console.log('inside displayResult');
    var lights = result.lights;
    var len = lights.length;
    var lightlist = [];
    var finished = _.after(len, function(data) {
        /* GET home page. */
        router.get('/', function(req, res, next) {
            res.render('index', {
                title: 'Huepi',
                lights: data
            });
        });
        // console.log(JSON.stringify(result, null, 2));
    });

    _.forEach(lights, function(value, key) {
        console.log(value);
        var o = {
            id: value.id,
            on: value.state.on,
            rgb: api.getRGBfromXY(value.state.xy[0], value.state.xy[1], value.state.bri),
            name: value.name
                // h: Math.floor(value.state.hue / 182),
                // s: Math.floor((value.state.sat / 255) * 100),
                // l: Math.floor((value.state.bri / 255) * 60)
        };
        lightlist.push(o);
        finished(lightlist);
        // api.lightStatusWithRGB(parseInt(value.id)).done(function(result) {
        //     console.log(result.state);
        //     o.rgb = result.state.rgb;
        //
        // }).bind(null, o);
    });
};


var host = "192.168.0.15",
    username = "cUbhu5QBLX-R-TNNhDqKQAD2VAwoVDOtBUf56TNb",
    api = new HueApi(host, username);
console.log('getting lights');
api.lights().then(displayResult).done();
var displayBridges = function(bridge) {
    console.log("Hue Bridges Found: " + JSON.stringify(bridge));
};

// --------------------------
// Using a promise
hue.nupnpSearch().then(displayBridges).done();

// // --------------------------
// // Using a callback
// hue.nupnpSearch(function(err, result) {
//     if (err) throw err;
//     displayBridges(result);
// });





module.exports = router;
