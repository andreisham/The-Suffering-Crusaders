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
            // обнуление очков святой земли при уходе в минуса и уведомление об окончании очков
            if (totalScore.innerHTML <= 0) {
                totalScore.innerHTML = 0;
                notificate("Святая земля<br>опустошена!", "../img/monah.png")
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
        let text = 'Не дам! Святая<br>земля еще не<br>покорена'
        let img = "../img/monah.png"
        notificate(text, img)
    }
}

// создали див для вылезающих уведомлений
let notification_div = document.createElement('div');
notification_div.innerHTML = `<img id="notif-img" src="">
                              <p class="notification-text"></p>`;

function notificate(text, img){
    let notification_container = document.querySelector('.notification_container');
    
    notification_container.append(notification_div)

    if(notification_container.dataset.i < 3) {
        notification_div.className = "notification";
        let notification = document.querySelector('.notification');
        document.querySelector('#notif-img').src = img;
        setTimeout(() => {document.querySelector('.notification-text').innerHTML = text
            notification_container.dataset.i++
            notification.classList.toggle('notification-active');
            }, 100);
        setTimeout(() => notification.classList.toggle('notification-active'), 3000);
        setTimeout(() => notification_div.remove(), 3300);
    } else {
        kolya(notification_div)
        notification_container.dataset.i = 0;
    }
}

// вызов Коли
function kolya(notification_div) {
    notification_div.className = "notification-kolya";
    notifText = document.querySelector('.notification-text')

    notifText.classList.replace('notification-text', 'notification-text-kolya')
    setTimeout(() => {notifText.innerHTML = 'Та хорош!'
            document.querySelector('#notif-img').src = '../img/kolya.png';
            notification_div.classList.toggle('notification-active-kolya');
            }, 100);
    setTimeout(() => notification_div.classList.toggle('notification-active-kolya'), 3000);
    setTimeout(() => {notifText.classList.replace('notification-text-kolya', 'notification-text')
            notification_div.remove()}
            , 3300);
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