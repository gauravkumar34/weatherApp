const express = require("express");
const bodyParse = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname +  "/index.html");

  });
  app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "b5c493b1516e083c62506d5804ff2aea";
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid="+ apiKey +"&units="+ units+ "";
    https.get(url, function(response){
      console.log(response.statusCode);

      response.on("data", function(data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imageURL = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
        res.write("<p>Description of the weather is "+ weatherDescription+ "<p>");
        res.write("<h1> Temperatue in "+ query + " "+ temp + " degree calcius.</h1>");
        res.write("<img src =" + imageURL+ ">");
        res.send();

});
});

  })







app.listen(3000 , function() {
  console.log("server is running on port 3000");
})
