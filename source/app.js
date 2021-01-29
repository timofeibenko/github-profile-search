const API_URL = 'https://api.github.com/users/';

const input = document.getElementById('search');
const inputContainer = document.getElementById('input_container');
const mainPanel = document.getElementById('main');
const label = document.getElementById('label');
const errorMessage = document.body.querySelector('.header__error-message')

console.log(errorMessage)

async function getUser(user) {
    let resp = await fetch(API_URL + user);
    let respData = await resp.json();

    console.log(respData)

    if (respData.message) {
        errorMessage.classList.add('active')
        return
    } else {
        printUserCard(respData)
    }
}

function printUserCard(user) {
    if (document.querySelector('.main')) {
        document.querySelector('.main').remove()
    }

    const main = document.createElement('main')
    main.classList.add('main');

    const card =  `<aside class="sidebar">
                    <img class="sidebar__profile-pic"
                         id="profile_pic"
                         src=${user.avatar_url}
                         alt="${user} GitHub profile picture"
                    >
                </aside>

                <section class="profile-info">
                    <h2 class="profile-info__name">${user.login}</h2>
                    <p class="profile-info__description">
                    ${
                        (function () {
                            if (user.bio === null) {
                                return ''
                            } else {
                                return user.bio
                        }})()
                    }
                    </p>
                    <ul class="profile-info__statistics-list">
                        <li class="profile-info__statistics-item"><span>${user.followers}</span>&nbsp;Followers</li>
                        <li class="profile-info__statistics-item"><span>${user.following}</span>&nbsp;Following</li>
                        <li class="profile-info__statistics-item"><span>${user.public_repos}</span>&nbsp;Repos</li>
                    </ul>
                </section>`;

    mainPanel.appendChild(main);
    main.innerHTML += card;
}

input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        let user = input.value;
        getUser(user)
    }

    label.classList.add('active')
    errorMessage.classList.remove('active')

    if(input.value === '' && e.keyCode !== 9) {
        label.classList.remove('active')
    }
});

input.addEventListener('focus', () => {
    label.classList.add('active')
});

input.addEventListener('focusout', () => {
    if(input.value === '') {
        label.classList.remove('active')
    }
});

inputContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('header__search-btn') ||
        e.target.closest('.header__search-btn svg')) {

        let user = input.value;
        getUser(user)
    }

    label.classList.add('active')
});
