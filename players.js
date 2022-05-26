// установка очков на святую землю
let totalScore = document.getElementById('total_score');
let score;

document.addEventListener("DOMContentLoaded", ready);

function ready() {
    let totalPlayers = localStorage.getItem('totalPlayers') 
    switch (totalPlayers) {
        case '3':
            score = 16;
            break;
        case '4':
            score = 20;
            break;
        case '5':
            score = 23;
            break;
        case '6':
            score = 25;
            break;
    }
    totalScore.innerHTML = score;
    showPlayers(totalPlayers);
}

// вывод нужного количества игроков
function showPlayers(totalPlayers) {
    let players = document.querySelectorAll('.player')
    for (let i = 0; i < totalPlayers; i++) {
        players[i].style.display = 'block';
    }
}

// обработка очков
function countCrussaders(form) {
    let playerScore = document.querySelectorAll('.player_score')
    playerScore.forEach(span => {
        if(span.id == form.name) {
            totalScore.innerHTML = totalScore.innerHTML - +form.crusaders.value
            let playerNewScore = +span.innerHTML + +form.crusaders.value;
            span.innerHTML = playerNewScore;
            // выйгравший
            if(totalScore.innerHTML <= 0) {
                span.parentElement.classList.add('winner');
                span.parentElement.insertAdjacentHTML("beforeend", `<img src='https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png'>`)
                totalScore.innerHTML = score; 
            }
        }
    });
}