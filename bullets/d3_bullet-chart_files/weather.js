function getWOEID(zip, callback){
   var query = "select woeid from geo.places where text='zip' limit 1";
   var url = 'http://query.yahooapis.com/v1/public/yql?format=json&q='

   d3.json(url+encodeURI(query.replace('zip', zip)), function(data){
      window.woeid = data.query.results.place.woeid

      if(callback) callback(woeid)
      return woeid
   })
}

function getWeather(woeid, callback){
   var query = "select * from weather.forecast where woeid = location"
   var url = 'http://query.yahooapis.com/v1/public/yql?format=json&q='

   d3.json(url+(query.replace('location', woeid)), function(data){
      weather = data.query.results.channel
console.log(weather)
      if(callback) callback(weather)
      return weather
   })
}

function weatherToBullets(weather, callback){
   var bullets = []

   bullets.push(new Bullet("Wind", weather.units.speed, [0,weather.wind.speed+15], [0, weather.wind.speed], [weather.wind.speed]))
   bullets.push(new Bullet("Forecast", "Today", [weather.item.forecast[0].low,weather.item.forecast[0].high], [weather.item.forecast[0].high], [weather.item.forecast[0].high]))
   bullets.push(new Bullet("Forecast", "Tomorrow", [weather.item.forecast[1].low,weather.item.forecast[1].high], [weather.item.forecast[1].high], [weather.item.forecast[1].high]))

   console.log(bullets)
   if(callback) callback(bullets)
   return bullets
}

function Bullet(title, subtitle, ranges, measures, markers){
   this.title = title
   this.subtitle = subtitle
   this.ranges = ranges
   this.measures = measures
   this.markers = markers
}
