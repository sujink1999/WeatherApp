const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('../utils/geocode')
const getTitle = require('../utils/getTitle')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('', (req, res)=>{
    res.render('index',{
        name:'Sujin',
        para:'Get your weather data here!',
        title: 'Weather',
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        name:'Sujin',
        title: 'About',
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        name:'Sujin',
        title: 'Help',
    })
})

app.get( '/weather', (req, res)=>{
    if (!req.query.address){
        return res.send({
            error: 'Address not specified.'
        })
    }
    geocode(req.query.address, (error, response)=>{
        if(error){
            return res.send({
                error:error,
            })
        }
        getTitle(response.lat, response.long, response.location, (error , response)=>{
            if (error){
                return res.send({
                    error:error,
                })
            }
            res.send(response)
        })
    })
}
)

app.get('/help/*', (req, res)=>{
    res.render('error',{
        name: 'Sujin',
        title: '404',
        error: 'Help article not found',
    }
    )
})

app.get('*', (req, res)=>{
    res.render('error',{
        name: 'Sujin',
        title: '404',
        error: 'Page not found',
    }
    )
})

app.listen(3000, ()=>{
    console.log('Server is up')
})