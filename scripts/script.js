// обработка селекта
localStorage.setItem('totalPlayers', 3)
function setPlayers(players) {
    localStorage.setItem('totalPlayers', players)
}

function check() {
    let players = document.querySelector('#players')
    setPlayers(players.value)
}