const bodyParser = require('body-parser');
const compress = require('compression');
const config = require('config');
const cors = require('cors');
const middle = require('./middleware');
const morgan = require('morgan');

const serverConfig = config.get('server');
const port = process.env.PORT || serverConfig.port;

const ev = require('express-validation');
ev.options({
    status: 422,
    statusText: 'Unprocessable Entity',
    allowUnknownQuery: false
});

const Config = {};

console.log('Config file: config/' + config.get('_configFile'));

Config.configure = function(app, express, routers) {
    app.set('port', port);
    app.use(compress());
    app.use(cors());
    app.use(bodyParser.json({
        limit: '50mb'
    }));
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(morgan('dev'));

    app.use('/v1', routers.v1);
    app.use('/', routers.v1);

    app.use(middle.throw404);
    app.use(middle.logError);
    app.use(middle.handleError);
};

module.exports = Config;
