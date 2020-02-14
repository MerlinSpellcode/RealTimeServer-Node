//import Reuired Libs
require(__dirname + '/Resources/config.js');
var fs = require('fs');
var net = require('net');

//Load the initializers
var init_files = fs.readdirSync(__dirname + "/Initializers");
init_files.forEach(function(initFile){
    console.log('Loading Initializar: ' + initFile);
    require(__dirname + "/Initializers/" + initFile);
});

//Load the models
var model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function(modelFile){
    console.log('Loading Model: ' + modelFile);
    require(__dirname + "/Models/" + modelFile);
});

//Load the Maps
maps = {};
var map_files = fs.readdirSync(config.data_paths.maps);
map_files.forEach(function(mapFile){
    console.log('Loading Map: ' + mapFile);
    var map = require(config.data_paths.maps + mapFile);
    maps[map.room] = map
});

net.createServer(function(socket) {

    console.log("socket connected");
    
    socket.on('error', function(err) {
        console.log("socket error " + err.toString());
    });

    socket.on('end', function() {
        console.log("socket closed");
    });

    socket.on('data', function(data) {
        console.log("socket data " + data.toString());
    });
}).listen(config.port);

console.log("Initialize Completed, Server running on port: " + config.port + " for environment: " + config.environment);

//1, load the initalizers
//2, load data models
//3. load game map data
//4. initiate the server and listen to the internets
        //all of server logic