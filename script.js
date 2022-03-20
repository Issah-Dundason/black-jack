let result = 0;
let isPlayable = true;


let resultField = document.getElementById("result_text");
let motivationField = document.getElementById("motivation_text");
let playButton = document.getElementsByClassName("play_button")[0];
let addButton = document.getElementsByClassName("add_button")[0];
let restartButton = document.getElementsByClassName("restart_button")[0];
let felt = document.getElementsByClassName("felt")[0];

let resultCard = document.getElementsByClassName("card")[0];


let resultStates = ["victory", "loss", "canPlay"];
let resultState;

let motivations = ["You can do it", "You are getting there", "Take a Hit", "Hit!!!"];


function onPlayButton() {

    if(!isPlayable) {
       return ;
    }

    let firstCard = generateNumber();
    let secondCard = generateNumber();
    let sum = firstCard + secondCard;

    result += sum;


    resultField.textContent = result;

    checkResult();
    console.log(resultState);

    if(resultState === "victory") {
        felt.classList.add("hide");
        restartButton.classList.remove("disabled");
        resultCard.classList.add("show");
        motivationField.textContent = "You lost! \n" + result;
        resultCard.style.backgroundImage = "url('./images/won.jpg')";
    }


    if(resultState === "canPlay") {
        addButton.classList.remove("disabled");
        displayMotivation();
    }


    playButton.classList.add("disabled");
    isPlayable = false;

}

function onAddButton() {

    if(resultState !== "canPlay") {
        return;
    }

    let card = generateNumber();
    result += card;
    resultField.textContent = result;
    checkResult();

    if(resultState === "victory") {
        addButton.classList.add("disabled");
        restartButton.classList.remove("disabled");
        resultCard.classList.add("show");
        felt.classList.add("hide");
        motivationField.textContent = "You won! \n" + result;
        resultCard.style.backgroundImage = "url('./images/won.jpg')";
    }

    if(resultState === "loss") {
        resultCard.classList.add("show");
        motivationField.textContent = "You lost! \n" + result;
        addButton.classList.add("disabled");
        restartButton.classList.remove("disabled");
        felt.classList.add("hide");
        resultCard.style.backgroundImage = "url('./images/loss.jpg')";
    }


    if(resultState === "canPlay") {
        displayMotivation();
    }
    
}

function onRestart() {
    if(resultState === "canPlay") {
        return;
    }
    resultCard.classList.remove("show");
    isPlayable = true;
    resultState = "";
    result = 0;
    playButton.classList.remove("disabled");
    resultField.textContent = "";
    restartButton.classList.add("disabled");
    motivationField.textContent = "";
    felt.classList.remove("hide");

}

function generateNumber() {
    let random = Math.floor(Math.random() * 13) + 1;
    if(random > 10)
        return 10;
    if(random === 1)
        return 11;
    return random;
}

function checkResult() {
    if(result === 21) {
        console.log("Black Jack");
        resultState = resultStates[0];
        return;
    }


    if(result > 21) {
        console.log("You Lost");
        resultState = resultStates[1];
        return;
    }

    resultState = resultStates[2];
}



function displayMotivation() {
    let index = Math.floor(Math.random() * 3) + 1;
    console.log(index);
    motivationField.textContent = motivations[index];
}