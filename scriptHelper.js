// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    document.getElementById("missionTarget").innerHTML= `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter: ${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">
    `
}

function validateInput(testInput) {
    if (testInput === "") {

        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not A Number";
    } else {
        return "Is a Number";
    }

}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot.value) === "Empty" ||
        validateInput(copilot.value) === "Empty" ||
        validateInput(fuelLevel.value) === "Empty" ||
        validateInput(cargoLevel.value) === "Empty") {

        window.alert("All fields are required!");

    } else if (validateInput(pilot.value) === "Is a Number" ||
        validateInput(copilot.value) === "Is a Number" ||
        validateInput(fuelLevel.value) === "Not a Number" ||
        validateInput(cargoLevel.value) === "Not a Number") {

        window.alert("Be sure to enter valid information for each field!");
    } else {
        pilotStatus.innerHTML = `Pilot ${pilot.value} is ready for launch`
        copilotStatus.innerHTML = `Copilot ${copilot.value} is ready for launch`

        if (fuelLevel.value > 10000 && cargoLevel.value < 10000) {
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "rgb(65, 159, 106)";
            list.style.visiblity = "hidden";
        } else {
            launchStatus.innerHTML = "Shuttle not ready for launch"
            launchStatus.style.color = "rgb(199, 37, 78)"

            if (fuelLevel.value < 10000) {
                fuelStatus.innerHTML = "Fuel level too low for launch";
            } else {
                fuelStatus.innerHTML = "Fuel level high enough for launch";
            }

            if (cargoLevel.value > 10000) {
                cargoStatus.innerHTML = "Cargo mass too high for launch";
            } else {
                cargoStatus.innerHTML = "Cargo mass low enough for launch";
            }
            list.style.visiblity = "visible";
        }
    }
}

async function myFetch() {
    let planetsReturned; 

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    
    return planets[Math.floor(Math.random() * planets.length)];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
