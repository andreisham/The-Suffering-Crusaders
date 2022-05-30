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

let playerScores = {
    player1_score: 0,
    player2_score: 0,
    player3_score: 0,
    player4_score: 0,
    player5_score: 0,
    player6_score: 0
}
// обработка очков
function countCrussaders(form) {
    let playerScore = document.querySelectorAll('.player_score')
    playerScore.forEach(span => {
        if(span.id == form.name) {
            totalScore.innerHTML = totalScore.innerHTML - +form.crusaders.value
            let playerNewScore = +span.innerHTML + +form.crusaders.value;
            playerScores[span.id] = playerNewScore;
            span.innerHTML = playerNewScore;
            form.crusaders.value = 0;
        }
    });
}

//раздача реликвий
function getWinner() {
    if(totalScore.innerHTML <= 0) {       
        let winner;

        
        let max = Object.entries(playerScores).sort(function(a,b){ 
            return +b[b.length-1] - a[a.length-1]
        })
       // let max = Object.entries(playerScores).reduce((acc, curr) => acc[1] >= curr[1] ? acc : curr)[0];
        console.log(max.slice(0, 2))
        if(max[0] > max[1]) {
            winner = max[0]
        } else {
            winner = max
        }
         

        document.getElementById(winner).parentElement.insertAdjacentHTML("beforeend", `<img src='https://cdn.icon-icons.com/icons2/2699/PNG/512/atlassian_jira_logo_icon_170511.png'>`)
        totalScore.innerHTML = score; 
    } else {
        let notification = document.createElement('div');
        notification.className = "notification";
        notification.innerHTML = 'Не дам! Святая земля еще не покорена!';
        document.getElementById('winnerBtn').parentElement.append(notification);
        setTimeout(() => notification.remove(), 2500);
    }
}