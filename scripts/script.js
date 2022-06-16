// запрет зума на iOS (не пашет)
document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, false);
// отчистка хранилища
localStorage.clear()
// обработка селекта
localStorage.setItem('totalPlayers', 3)
function setPlayers(players) {
    localStorage.setItem('totalPlayers', players)
}

function check() {
    let players = document.querySelector('#players')
    setPlayers(players.value)
}