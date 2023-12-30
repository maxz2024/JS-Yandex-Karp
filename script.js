//Получение элементов формы
const form = document.forms.addHero; // Получаем форму
const titleInput = form.elements.title; // Получаем поле с именем
const descriptionInput = form.elements.description; // Получаем поле с описанием
const strInput = form.elements.str; // Получаем поле с уровнем силы
const agiInput = form.elements.agi; // Получаем поле с уровнем ловкости
const hpInput = form.elements.hp; // Получаем поле с уровнем здоровья
const intInput = form.elements.int; // Получаем поле с уровнем интеллектаlet 
addHeroButton = document.querySelector("#addHero");
let errorText = document.querySelector("#errorText");
// Контейнер для карточек
const container = document.getElementById("cards-container");
let studentEmail = "maksimzdonov456@yandex.ru";
let cards;

// Передаём массив с данными аргументом в функцию отрисовки карточек
function renderCards(heroes) {
    // Чистим контейнер для карточек
    container.innerHTML = "";

    //  В цикле достаём из каждого объекта данные о персонаже и вставляем в вёрстку карточки
    for (let i = 0; i < heroes.length; i++) {
        let hero = heroes[i];

        // Создаём верстку карточки и вставляем значения характеристик персонажа
        const cardHtml = `
        <div class="hero-card">
            <div class="hero-card__content">
                <div class="hero-card__top-frame">
                    <div class="hero-card__title">
                        ${hero.title}
                    </div>
                    <div class="hero-card__image-quote-wrapper">
                        <img class="hero-card__image" src="ava.png" />
                        <div class="hero-card__quote-wrapper">
                            <div class="hero-card__quote">
                                ${hero.description}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hero-card__bottom-frame">
                    <div class="hero-card__parameter">
                        <div class="hero-card__parameter-values">
                            <div class="hero-card__parameter-smile">💪</div>
                            <div class="hero-card__parameter-value">${hero.str}</div>
                        </div>
                        <div class="hero-card__parameter-title">сила</div>
                    </div>
                    <div class="hero-card__parameter">
                        <div class="hero-card__parameter-values">
                            <div class="hero-card__parameter-smile">💎</div>
                            <div class="hero-card__parameter-value hero-card__parameter-value_error">${hero.agi}</div>
                        </div>
                        <div class="hero-card__parameter-title">ловкость</div>
                    </div>
                    <div class="hero-card__parameter">
                        <div class="hero-card__parameter-values">
                            <div class="hero-card__parameter-smile">❤</div>
                            <div class="hero-card__parameter-value">${hero.hp}</div>
                        </div>
                        <div class="hero-card__parameter-title">очки жизни</div>
                    </div>
                    <div class="hero-card__parameter">
                        <div class="hero-card__parameter-values">
                            <div class="hero-card__parameter-smile">🤞</div>
                            <div class="hero-card__parameter-value">${hero.int}</div>
                        </div>
                        <div class="hero-card__parameter-title">интелект</div>
                    </div>
                </div>
        </div>
    `;
        // Добавляем вёрстку карточки в контейнер
        container.innerHTML += cardHtml;
    }
}
function updatePage() {
    fetch(`https://api-code.practicum-team.ru/heroes?_where[_or][0][studentEmail]=${studentEmail}&_where[_or][1][studentEmail]=`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data); // В консоли можно исследовать полученные данные
        cards = data; // Запишем данные в переменную
        renderCards(cards); // Функция отрисовки полученных данных
    })
    .catch((error) => console.error("Ошибка:", error));
}


form.addEventListener('submit', function (evt) {
    // Отменяем стандартное поведение
    evt.preventDefault();
    addHeroButton.disabled = true;
    addHeroButton.textContent = "Отправляем данные...";

    // Формируем данные и запрос
    // Создаём объект с новым персонажем и записываем данные
    let newHero = {
        title: titleInput.value,
        description: descriptionInput.value,
        str: strInput.value,
        agi: agiInput.value,
        hp: hpInput.value,
        int: intInput.value,
        // укажем тестовую почту для регистрации карточки
        studentEmail: studentEmail,

    };
    let newHeroJSON = JSON.stringify(newHero);
    console.log(newHero)
    // Используем api нашего сервера 
    fetch(`https://api-code.practicum-team.ru/heroes?_where[_or][0][studentEmail]=${studentEmail}&_where[_or][1][studentEmail]=`, {
        method: "POST", // POST нужен для сохранения и записи данных
        body: newHeroJSON, // Тело запроса в JSON-формате
        headers: {
            // Добавляем необходимые заголовки
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        // Смотрим ответ сервера на наш запрос
        .then((data) => {
            console.log(data);
            // Cбрасываем все поля
            form.reset();
            updatePage()
        })
        .catch((e) => {
            errorText.textContent = "Произошла ошибка"
        })
        .finally(() => {
            addHeroButton.disabled = false;
            addHeroButton.textContent = "Отправить";
        })

});


updatePage();
