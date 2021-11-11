var $parentRow = document.querySelector('.container');

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

    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + key + '_0.jpg');

    $card.appendChild($title);
    $card.appendChild($name);
    $card.appendChild($img);
    $parentRow.appendChild($columnHalf);
  }
});
xhr.send();

document.addEventListener('click', handleCardClick);
function handleCardClick(event) {
  if (event.target.tagName === 'IMG') {
    var xhr2 = new XMLHttpRequest();
    var $parentCard = event.target.closest('div');
    var $h2 = event.target.previousSibling;
    var $img = $parentCard.querySelector('img');
    if (!$parentCard.className.includes('lore')) {
      xhr2.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/' + $h2.textContent + '.json');
      xhr2.responseType = 'json';
      xhr2.addEventListener('load', function getChampionData() {
        var individualChampionData = xhr2.response;
        var $lore = document.createElement('p');
        $lore.textContent = individualChampionData.data[$h2.textContent].lore;
        $parentCard.appendChild($lore);
        $parentCard.className += ' lore';
        $img.className = 'dark';
      });
      xhr2.send();
    } else if ($parentCard.className.includes('lore')) {
      removeLore();
    }
  } else if (event.target.tagName === 'P') {
    removeLore();
  }
}

function removeLore() {
  var $parentCard = event.target.closest('div');
  var $img = $parentCard.querySelector('img');
  var $lore = $parentCard.querySelector('p');
  $parentCard.className = 'card';
  $lore.remove();
  $img.className = '';
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// FUNCTION TO FLIP CARD LATER
// function flipCard() {
//   var $parentCard = event.target.closest('div');
//   $parentCard.className = 'card flipped';
//   hideLore();
//   var $h3 = $parentCard.querySelector('h3');
//   var $h2 = $parentCard.querySelector('h2');
//   $h3.className = 'off';
//   $h2.className = 'off';
// }
