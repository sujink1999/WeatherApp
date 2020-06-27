const request = require('request')

const getTitle = (lat, long, loc, callback)=>{
    const url = 'https://jsonplaceholder.typicode.com/todos/5'
    request({
        url,
        json : true
    }, (error, {body} = {}) =>{
        if(error){
            callback('No title found', undefined)
        }else{
            callback(undefined, {
                title : body.title,
                location: loc,
            })
        }    
    })
}

module.exports = getTitle