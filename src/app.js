const path = require('path');
const express = require('express');
const hbs = require('hbs')

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mohamed Mahmoud'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohamed Mahmoud'
    });
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        });
    }
    geocode(req.query.address, (err, {latitude, longitude} = {}) => {
        if(err){
            return res.send({error: err});
        }
        forecast(latitude, longitude, (err, temp) => {
            if(err){
                return res.send({error: err});
            }
            const coord = 'Coordinates for ' + req.query.address + ' is: ' + latitude + ' and ' + longitude;
            res.send({
                coord,
                temp
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found',
        name: 'Mohamed Mahmoud'
    });
})

app.listen(3000);

