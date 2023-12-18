const container = document.getElementById("heroesContainer");

let heroes = [["Axe", "Tank"], ["Crystal Maiden", "Support"]];

function displayHeroes()  {

    let heroesContainer = document.getElementById("heroesContainer");


    heroesContainer.innerHTML = ''; 
    
    for (let i = 0; i < heroes.length; i++) {
        let heroDiv = document.createElement("div");

        heroDiv.innerHTML = `<h3>${heroes[i][0]}</h3><p>${heroes[i][1]}</p>`;

        heroesContainer.appendChild(heroDiv);
    }
}

function addHero() {

    let nameInput = document.getElementById("heroName");
    let classInput = document.getElementById("heroClass");

    heroes.push([nameInput.value,classInput.value]);

    displayHeroes();

    nameInput.value = "";
    classInput.value = "";
} 

displayHeroes();
document.getElementById("addButton").addEventListener("click", addHero); 