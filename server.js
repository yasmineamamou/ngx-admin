const express = require("express");
const path = require("path");

const app = express();

require("events").EventEmitter.defaultMaxListeners = 0;
app.use(express.static(__dirname+"/dist"));

app.get('/*', function(req, res){
    res.sendFile(path.join(__dirname+'/dist/index.html'))
});
app.listen(process.env.PORT || 8080);