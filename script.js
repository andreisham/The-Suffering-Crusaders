let totalScore = document.getElementById('total_score');

// обработка селекта
function setScore(value) {
    totalScore.innerHTML = value;
}

// обработка имен игроков
let input = document.querySelectorAll('.input');

for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('keyup', setName);
}

function setName() {
    let pl1 = document.getElementsByName('player1')[0].value;
    document.getElementById('player1_name').innerHTML = pl1;
    let pl2 = document.getElementsByName('player2')[0].value;
    document.getElementById('player2_name').innerHTML = pl2;
    let pl3 = document.getElementsByName('player3')[0].value;
    document.getElementById('player3_name').innerHTML = pl3;
    let pl4 = document.getElementsByName('player4')[0].value;
    document.getElementById('player4_name').innerHTML = pl4;
    let pl5 = document.getElementsByName('player5')[0].value;
    document.getElementById('player5_name').innerHTML = pl5;
    let pl6 = document.getElementsByName('player6')[0].value;
    document.getElementById('player6_name').innerHTML = pl6;
}

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
  