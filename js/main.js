var $parentRow = document.querySelector('.row');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json');
xhr.responseType = 'json';
xhr.addEventListener('load', function renderChampions() {
  var allChampionData = xhr.response;
  for (var key in allChampionData.data) {
    var $columnHalf = document.createElement('div');
    $columnHalf.className = 'column-half';

    var $card = document.createElement('div');
    $card.className = 'card ' + key;
    $columnHalf.appendChild($card);

    var $name = document.createElement('h2');
    $name.textContent = key;

    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + key + '_0.jpg');

    $card.appendChild($name);
    $card.appendChild($img);
    $parentRow.appendChild($columnHalf);
  }
});
xhr.send();
