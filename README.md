# The-Suffering-Crusaders
Подсчет очков крестового похода для игры Страдающее средневековье

Доработки
1. Раздача очков с одной кнопки
    1.1 собрать со всех полей ввода значения в переменные соответствующие игрокам
    1.2 сумму этих значений отнять от общего числа очков на святой земле
    1.3 зачислить значения этих переменных на счета игроков
2. Функционал карты Трубадур "Все игроки у которых есть очки крестового похода отдают по 1 в город в котором поселился трубадур"
    2.1 Дополнительная кнопка "Поселить трубадура", скорее просто иконкой, чтоб не перегружать
    2.2 При нажатии на нее у других игроков, у которых есть очки (мб реализовать это флагом true\false), отнимается по 1 очку и эти очки передаются в буферную переменную (мб потом от нее отказаться). Игроку у которого эта карта зачислить на его счет значение буферной переменной