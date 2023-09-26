const apikey = "283a39b1a8e71f6f2794d5f88a90145b";
    const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
    let time = document.getElementById('time');

    let timezone = 3600;
    async function checkWeather(city){
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        var data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        timezone = data.timezone;
        let weather_type = data.weather[0].main;
        if (weather_type == "Clouds"){
            document.body.style.background = "url('images/cloudssss.jpg')";
            weatherIcon.src = "images/clouds.png";
        }
        else if (weather_type == "Clear"){
            document.body.style.backgroundImage = "url('images/clear-sky.jpg')";
            weatherIcon.src = "images/clear.png";
        }
        else if (weather_type == "Rain"){
            weatherIcon.src = "images/rain.png";
            document.body.style.background = "url('images/heavy-rain.jpg')";
        }
        else if (weather_type == "Drizzle"){
            weatherIcon.src = "images/drizzle.png";
            document.body.style.background = "url('images/drizzle.jpg')";
        }
        else if (weather_type == "Mist"){
            weatherIcon.src = "images/mist.png";
            document.body.style.background = "url('images/mist.jpg')";
        }
        else if (weather_type == "snow"){
            weatherIcon.src = "images/snow.png";
            document.body.style.background = "url('images/snowing.jpg')";
        }
    
    }
    searchBtn.addEventListener("click", ()=>{
        checkWeather(searchBox.value);
    });

    function getHourByTimezoneOffset(offsetSeconds) {
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60 * 1000);
        const targetTime = new Date(utcTime + (offsetSeconds * 1000));
        var  hour = targetTime.getHours().toString().padStart(2, '0');
        const minutes = targetTime.getMinutes().toString().padStart(2, '0');
        const seconds = targetTime.getSeconds().toString().padStart(2, '0');
        const period = (hour >= 12) ? 'PM' : 'AM';


        // Convert to 12-hour format
        hour = (hour % 12) || 12;
        // Format the time as HH:MM:SS AM/PM
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`;
        return formattedTime;
      
      }



    setInterval(() => {
        time.innerHTML = getHourByTimezoneOffset(parseInt(timezone))
    }, 1000);


 let date = document.getElementById('date');

    setInterval(() => {
        let d = new Date();
        date.innerHTML = d.toLocaleDateString();
    }, 1000);  
