const API_URL = 'https://api.github.com/users/';

const input = document.getElementById('search');
const inputContainer = document.getElementById('input_container');
const mainPanel = document.getElementById('main');
const label = document.getElementById('label');
const errorMessage = document.body.querySelector('.header__error-message')

// Functions

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
    const template = document.querySelector('#template');

    let userInfo = {
        name: user.login,
        bio: function () {
            if (user.bio === null) {
                return ''
            } else {
                return user.bio
            }
        },
        profilePic: user.avatar_url,
        followers: user.followers,
        following: user.following,
        repos: user.public_repos,
    }

    const instance = document.importNode(template.content, true);
    instance.querySelector('.profile-info__name').innerHTML = userInfo.name;
    instance.querySelector('.profile-info__description').innerHTML = userInfo.bio();
    instance.querySelector('#profile_pic').src = userInfo.profilePic;
    instance.querySelector('#followers').innerHTML = userInfo.followers;
    instance.querySelector('#following').innerHTML = userInfo.following;
    instance.querySelector('#repos').innerHTML = userInfo.repos;

    if (document.body.querySelector('main')) {
        document.body.querySelector('main').remove();
    }

    let main = document.createElement('main');

    mainPanel.appendChild(main).appendChild(instance);
}

// Listeners

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
