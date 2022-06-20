// // запрет зума на iOS (не пашет)
// document.addEventListener('touchmove', function (event) {
//     if (event.scale !== 1) { event.preventDefault(); }
// }, false);

// установка очков на святую землю
let totalScore = document.getElementById('total_score');
let score;

// модальное окно
let modal = document.getElementById("myModal_for_two");
let modalContent = document.querySelector(".modal-content_for_two");

let playerScore = document.querySelectorAll('.player_score')

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

// запоминание имен игроков
function rememberPlayers(player) {
    localStorage.setItem(player.name, player.value)
}

// обработка очков
function countCrussaders(form) {
    let playerNewScore;
    playerScore.forEach(span => {
        if(span.id == form.name) {
            if(form.crusaders.value > 0){
                totalScore.innerHTML = Number(totalScore.innerHTML) - +form.crusaders.value
                playerNewScore = +span.innerHTML + +form.crusaders.value;
                playerScores[span.id] = playerNewScore;
                span.innerHTML = playerNewScore;
                form.crusaders.value = 0;
            } else {
                totalScore.innerHTML = Number(totalScore.innerHTML) + Math.abs(form.crusaders.value)
                playerNewScore = +span.innerHTML + +form.crusaders.value;
                if (playerNewScore <= 0) {
                    playerScores[span.id] = 0;
                    span.innerHTML = 0;
                } else {
                    playerScores[span.id] = playerNewScore;
                    span.innerHTML = playerNewScore;
                }
                form.crusaders.value = 0;
            }
            // обнуление очков святой земли при уходе в минуса
            if (totalScore.innerHTML <= 0) {
                totalScore.innerHTML = 0;
            } else if (totalScore.innerHTML > score){
                totalScore.innerHTML = score;
            }
            
        }
    });
}

//определение победителя
function getWinner() {
    if(totalScore.innerHTML <= 0) {  
        let winner;
        let sort = Object.entries(playerScores).sort(function(a,b){ 
            return +b[b.length-1] - a[a.length-1]
        })
        // Один победитель
        if(sort[0][1] > sort[1][1]) {
            winner = sort[0][0].substring(0,7)
            getRelic(winner)
        // разрешение спора (два победителя)
        } else if (sort[0][1] === sort[1][1] && sort[1][1] > sort[2][1]) {
            let winnerOneName = localStorage.getItem(sort[0][0].substring(0,7))
            let winnerTwoName = localStorage.getItem(sort[1][0].substring(0,7))
            let winners = [winnerOneName, winnerTwoName]
            // запуск модалки
            showModal(winners)
        // разрешение спора (больше двух победителей)
        } else {
            let winners = []
            max = findMax(sort)
            for (let i = 0; i < max.length; i++) {
                if(localStorage.getItem(max[i][0].substring(0,7)) != null) {
                    winners.push(localStorage.getItem(max[i][0].substring(0,7))); 
                }
            }
            // запуск модалки
            showModal(winners)
        } 
    } else {
        // вылезающий монах
        notificate()
    }
}
function notificate(){
    
    
    let notification = document.querySelector('.notification');
    
    if(notification.dataset.i < 1) {
        notification.dataset.i++
        console.log(notification.dataset.i)
        notification.classList.toggle('notification-active');
        setTimeout(() => notification.classList.toggle('notification-active'), 2500);
    } else {
        console.log('kolya')
        notification.classList.toggle('notification-active');
        notification.classList.toggle('notification-kolya')

        console.log(document.querySelector('#notif-img').src)

        let notifImg = document.querySelector('#notif-img').src
        let notifText = document.querySelector('.notification-text').innerHTML
        document.querySelector('#notif-img').src = '../img/kolya.webp';
        
        document.querySelector('.notification-text').innerHTML = 'Та хорош!'
        setTimeout(() => notification.classList.toggle('notification-active'), 2500);
        // возвращаем как было
        document.querySelector('.notification-text').innerHTML = notifText;
        document.querySelector('#notif-img').src = notifImg
        notification.dataset.i = 0;
    }
    
}
// поиск максимумов из массива
function findMax(arr) {
    let max = []
    let possibleMax = arr[0][1]
    for (let i = 0; i < arr.length; i++) {
        if(arr[i][1] == possibleMax) {
            max.push(arr[i])
        }
    }
    return max;
}

// раздача реликвий
function getRelic(winner) {
    winner = winner + '_score'
    document.getElementById(winner)
        .parentElement.querySelector('.number')
        .insertAdjacentHTML("beforeend", `<img style="width: 27px;margin: 14px 10px 0 0;" src="king.png">`);
    restartGame();
}

// обнуление очков
function restartGame(){
    totalScore.innerHTML = score;
    playerScores = {
        player1_score: 0,
        player2_score: 0,
        player3_score: 0,
        player4_score: 0,
        player5_score: 0,
        player6_score: 0
    }
    playerScore.forEach(span => {
        span.innerHTML = 0
    });
}

// открытие модалки
function showModal(winners) {
    modal.style.display = "block";
    if(winners.length == 2) {
        modalContent.insertAdjacentHTML('afterbegin', `<p id='${winners[0]}' class="winner-choice">${winners[0]}</p> `);
        document.getElementById(winners[0]).addEventListener('click', function(){setWinner(winners[0])})
        modalContent.insertAdjacentHTML('beforeend', `<p id='${winners[1]}' class="winner-choice">${winners[1]}</p> `);
        document.getElementById(winners[1]).addEventListener('click', function(){setWinner(winners[1])})
    } else {
        winners.forEach(winner => {
            modalContent.insertAdjacentHTML('beforeend', `<p id='${winner}' class="winner-choice">${winner}</p> `);
            document.getElementById(winner).addEventListener('click', function(){setWinner(winner)}) 
        });
    }
}

// Когда пользователь щелкает в любом месте за пределами модалки, оно закроется
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    removeWinners()
  }
}
// отчистка модального окна
function removeWinners() {
    let winnersForRemove = document.querySelectorAll('.winner-choice')
    winnersForRemove.forEach(winnerForRemove => {
        modalContent.removeChild(winnerForRemove)
    });
}
// выбор кому дать реликвию (при спорной ситуации)
function setWinner(winner) {
    console.log(winner)
    for( let i = 0; i < localStorage.length; i++) { 
        if (winner == localStorage.getItem(localStorage.key(i))) {
            winner = localStorage.key(i)
        }
    }
    getRelic(winner)
    removeWinners()
    modal.style.display = "none";
}