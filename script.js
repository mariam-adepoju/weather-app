let weather = {
    "apiKey": "8cb2df0033f35b41724e0078d75e987e",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("No weather found for this city");
                }
                return response.json()
            })
            .then((data) => this.displayWeather(data))
            .catch((error) => {
                alert(error.message);
                // console.log(error)
            });
    },
    displayWeather: function (data) {
        // console.log(data);
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name, icon, description, temp, humidity, speed)
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        const city = document.querySelector(".search input").value;
        if (city) {
            this.fetchWeather(city);
        } else {
            alert("Please enter a city name");
        }
    },
};
document.querySelector(".search button").addEventListener("click", function () {
    weather.search()
})
document.querySelector(".search input").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search()
    }
})
document.querySelector(".search input").addEventListener("focus", function () {
    this.value = "";
})
weather.fetchWeather("Denver");
const date = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
});
document.querySelector(".date").innerText = date