const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require('http').Server(app);

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://bittencourt.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://walletbittencourt.com/api',
    issuer: "https://bittencourt.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

mongoose.connect(
    'mongodb://financebase:financebase10@ds237955.mlab.com:37955/financeapp',
    {
        useNewUrlParser: true
    }
);

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3000, () => {
    console.log('Server started on port https://localhost:3000');
});