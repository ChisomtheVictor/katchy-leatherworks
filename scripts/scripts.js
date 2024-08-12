function toggleMenu() {
    document.getElementById("nav-list").classList.toggle("open");
    document.getElementById("hamburger-button").classList.toggle("open");
}

const switchToX = document.getElementById("hamburger-button");
switchToX.onclick = toggleMenu;


const todaysDate = new Date();

const options = { year: 'numeric' }
document.getElementById('year').textContent = todaysDate.toLocaleDateString('en-us', options)
const date = document.lastModified;
document.getElementById('date').textContent = date;



//create an "url" variable
const url = "https://api.openweathermap.org/data/2.5/weather?q=Carlsbad,US&units=imperial&id=524901&appid=5fe9959182c4e0e3b9a6e2414cd1f539";
// select HTML elements in the document

let WeatherIcon = document.querySelector('#weather-icon');
let CurrentTemp = document.querySelector('#temp-value');
let WeatherDesc = document.querySelector('#weather-desc');
let WindSpeed = document.querySelector('#windspeed-value');
let WindChillVal = document.querySelector('#windchill-value');

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log();
    }
}

apiFetch();

function displayResults(weatherData) {

    {
        CurrentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
        const windSpeed = weatherData.wind.speed;
        const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const desc = weatherData.weather[0].description;

        WeatherIcon.setAttribute('src', iconsrc);
        WeatherIcon.setAttribute('alt', desc);
        WeatherDesc.textContent = desc;

        WindSpeed.innerHTML = `${windSpeed.toFixed(2)}`;

        if (windSpeed < 3 || weatherData.main.temp < 20) {

            WindChillVal.textContent = "N/A";
        } else {
            let windChill = 35.74 + 0.6215 * weatherData.main.temp - 35.75 * Math.pow(windSpeed, 0.16) + 0.4275 * weatherData.main.temp * Math.pow(windSpeed, 0.16);
            WindChillVal.textContent = windChill.toFixed(2) + "°F";
        }
    }

}

//LazyLoad Script
const images = document.querySelectorAll("img[data-src]");

const loadImages = (image) => {
    image.setAttribute("src", image.getAttribute("data-src"));
    image.onload = () => {
        image.removeAttribute("data-src");
    };
};



if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if (item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);

            }
        });
    });
    images.forEach((img) => {
        observer.observe(img);
    });
} else {
    images.forEach((img) => {
        loadImages(img);
    });
}