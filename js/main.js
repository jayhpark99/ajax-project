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
    $card.className = 'card';
    for (var i = 0; i < allChampionData.data[key].tags.length; i++) {
      $card.setAttribute('roles', allChampionData.data[key].tags[0] + ' ' + allChampionData.data[key].tags[1]);
    }

    $columnHalf.appendChild($card);

    var $name = document.createElement('h2');
    $name.textContent = key;

    var $title = document.createElement('h3');
    $title.textContent = capitalizeFirstLetter(allChampionData.data[key].title);

    var $lore = document.createElement('p');
    $lore.textContent = data.allChampionData.data[key].blurb;

    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + key + '_0.jpg');

    $card.appendChild($lore);
    $card.appendChild($title);
    $card.appendChild($name);
    $card.appendChild($img);
    $parentRow.appendChild($columnHalf);
  }
  data.allChampionData = xhr.response;
});
xhr.send();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
