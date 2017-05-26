var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var dishRouter = express.Router();
dishRouter.use(bodyParser.json());
const dish = require('./dishRouter.js');
app.use('/dishes', dish(dishRouter));

var promotionRouter = express.Router();
promotionRouter.use(bodyParser.json());
const promotions = require('./promoRouter.js');
app.use('/promotions', promotions(promotionRouter));

var leadershipRouter = express.Router();
leadershipRouter.use(bodyParser.json());
const leadership = require('./leaderRouter.js');
app.use('/leadership', leadership(leadershipRouter));

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});