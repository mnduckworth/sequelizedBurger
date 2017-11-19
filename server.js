var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var models = require("./models");

var app = express();

app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
app.use('/', routes);

var PORT = process.env.PORT || 3000;

models.sequelize.sync().then(function() {    
    app.listen(PORT, function () {
        console.log("🌎  You're listening on port: " + PORT);
    });
});