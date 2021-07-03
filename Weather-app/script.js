window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // console.log('longitude='+ long,'latitude='+lat);

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=U6V6AJ7BJFEXNMGLPS84S7TED `;

            fetch(api).then(response =>{
                return response.json();
            })
            .then(data =>{
                // console.log(data);
                const {temp, conditions, icon} = data.currentConditions;
                temperatureDegree.textContent = temp;
                temperatureDescription.innerHTML = conditions;
                locationTimezone.textContent = data.timezone;
                //Formula for celsius
                let celsius = (temp -32) * (5 / 9);
                //set icon
                setIcons(icon, document.querySelector(".icon"));

                //change temperature to celsius/farenheit
                temperatureSection.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temp;
                    }
                });
            });

        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});