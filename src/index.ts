import { GlobalConfig } from "./GlobalConfig";
import {App} from "./App";
let Client = require('node-rest-client').Client;

var options = {
    connection: {
        rejectUnauthorized: false
    }
};

let app = new App( new Client(options));
require("../MultimocksConfigFile.js")(app);
app.generate();