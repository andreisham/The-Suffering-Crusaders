
let totalScore = document.getElementById('total_score');
let score;
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

function showPlayers(totalPlayers) {
    let players = document.querySelectorAll('.player')
    for (let i = 0; i < totalPlayers; i++) {
        players[i].style.display = 'block';
        
    }
}

document.addEventListener("DOMContentLoaded", ready);

// обработка очков
function countCrussaders(form) {
    let playerScore = document.querySelectorAll('.player_score')
    playerScore.forEach(span => {
        if(span.id == form.name) {
            totalScore.innerHTML = totalScore.innerHTML - +form.crusaders.value
            let playerNewScore = +span.innerHTML + +form.crusaders.value;
            span.innerHTML = playerNewScore;
        }
    });
}