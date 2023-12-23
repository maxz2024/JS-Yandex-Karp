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
        button.disabled = true;
    }
    else {
        let error = document.getElementById("error");
        error.innerHTML = "Ошибка. Поля пустые.";
        button.disabled = true;
        
    }

}

displayHeroes();

let inputs = [].slice.call(document.querySelectorAll('input[type="text"]')) // преобразование NodeList в Array для использования функций массива

inputs.forEach(function(el){
  el.addEventListener('input', checkInputs, false);
});

function checkInputs(){
	let empty = inputs.filter(function(el){
        // if (el.value.trim() === '') {
        //     el.style.border = "1px solid red"
        // }
        // else if (el.value.trim() !== ''){
        //     el.style.border = "1px solid green"
        // }
    return el.value.trim() === ''; // удаляем лишние пробелы
  }).length;
  button.disabled = empty !== 0;
  
  if (empty === 0) {
    let error = document.getElementById("error");
    error.innerHTML = "";
  }
}
// checkInputs();

button.onmouseover = function () {
    if (nameInput.value.trim() == "" && classInput.value.trim() == "") {
        timer = setTimeout(
            function check() {
                let error = document.getElementById("error");
                error.innerHTML = "Ошибка. Поля пустые.";
            },2000); 
    }
    // timer = setTimeout(check,2000);
}
button.onmouseout = function () {
    clearTimeout(timer)
}

// nameInput.oninput = function() {
//     check();
// };

document.getElementById("addButton").addEventListener("click", addHero);

