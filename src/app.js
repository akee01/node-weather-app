// Requiring Modules
const path = require("path")
const express = require("express")
const hbs = require("hbs")
const forecast = require("./forecast")
const geocode = require("./geocode")

// Initializing App
const app = express()

// Setting Paths for Express Config
const publicDeirectotyPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setting Public Directory Path
app.use(express.static(publicDeirectotyPath))

// Express Views Engine Settings
app.set("view engine","hbs")
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.get("", (req,res)=>{
    res.render("index",{
        title:"Weather",
        name:"Muhammad Aqib"
    })
});

app.get("/about", (req,res)=>{
    res.render("about",{
        title:"About Page",
        name:"Muhammad Aqib"
    });
});

app.get("/help", (req,res)=>{
    res.render("help",{
        title:"Help Page",
        help:"To get this done do this list.",
        name:"Muhammad Aqib"
    })
});

app.get("/weather", (req,res)=>{
    if(!req.query.address){
        return res.send({
            "error": "You must provide a search along"
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,place}={})=>{
        if(error){
            return res.send({"error":error})            
        }
    
        forecast(latitude,longitude,(error,forecast)=>{
            if(error){
                return res.send({"error":error})
            }
            res.send({
                forecast: forecast,
                location:place,
                address:req.query.address,
            });
        })
    })
});

app.get("/help/*", (req,res)=>{
    res.render("404",{
        message:"Help page not found!"
    })
})

app.get("*", (req,res)=>{
    res.render("404",{
        titles:"404",
        message:"Page not found!",
        name: "Muhammad Aqib"
    })
})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})