const container = document.getElementById("heroesContainer");
let button = document.getElementById("addButton");
let nameInput = document.getElementById("heroName");
let classInput = document.getElementById("heroClass");

let heroes = [["Axe", "Tank"], ["Crystal Maiden", "Support"]];
let timer;

function displayHeroes() {

    let heroesContainer = document.getElementById("heroesContainer");


    heroesContainer.innerHTML = '';

    for (let i = 0; i < heroes.length; i++) {
        let heroDiv = document.createElement("div");

        heroDiv.className = "heroCard"
        if (heroes[i]){
            heroDiv.innerHTML = `<h3>${heroes[i][0]}</h3><p>${heroes[i][1]}</p><button id="deleteButton" data-idcard="${i}"><img src="trash.png"></button>`;
        
            heroesContainer.appendChild(heroDiv);
            let deleteButton = heroesContainer.querySelector(`[data-idcard="${i}"]`)
            deleteButton.addEventListener("click", function () {delete heroes[deleteButton.dataset.idcard]; displayHeroes()})
        }

    }
}

function addHero() {

    if (nameInput.value != "" && classInput.value != "") {
        heroes.push([nameInput.value, classInput.value]);
        displayHeroes();

        nameInput.value = "";
        classInput.value = "";
    }
    else {
        let error = document.getElementById("error");
        error.innerHTML = "Ошибка. Поля пустые.";
        button.disabled = true;
        
    }

}

displayHeroes();

function check(event) {
    if (nameInput.value != "" && classInput.value != "") {
        button.disabled = false;
        let error = document.getElementById("error");
        error.innerHTML = "";
    }
    else {
        button.disabled = true;
        let error = document.getElementById("error");
        error.innerHTML = "Ошибка. Поля пустые.";
    }
    timer = setTimeout(check,2000);
    
}

button.onmouseover = function () {
    timer = setTimeout(check,2000);
}
button.onmouseout = function () {
    clearTimeout(timer)
}

// nameInput.oninput = function() {
//     check();
// };

document.getElementById("addButton").addEventListener("click", addHero);

