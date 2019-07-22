const request = require("request");

const forecast = (lat,lang,callback)=>{
    const url = "https://api.darksky.net/forecast/81584bb00d6939f5f385610a8516bccc/"+lat+","+lang;
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect weather API.",undefined)
        }else if(body.error){
            callback("Invalid Location parameters.",undefined)
        }else{
            data = body;
            callback(undefined,data.daily.data[0].summary+`It is currently ${data.currently.temperature} degrees out. There is ${data.currently.precipProbability}% chance of rain.`);
        }
    });
}

module.exports = forecast