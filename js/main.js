var $parentContainer = document.querySelector('.container');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  data.allChampionData = xhr.response;
});
xhr.send();

renderChampions();

function renderChampions() {
  for (var key in data.allChampionData.data) {
    var $columnHalf = document.createElement('div');
    $columnHalf.className = 'column-half';

    var $card = document.createElement('div');
    $card.className = 'card';

    for (var i = 0; i < data.allChampionData.data[key].tags.length; i++) {
      $card.setAttribute('roles', data.allChampionData.data[key].tags[0] + ' ' + data.allChampionData.data[key].tags[1]);
    }

    $columnHalf.appendChild($card);

    var $name = document.createElement('h2');
    $name.textContent = key;

    var $title = document.createElement('h3');
    $title.textContent = capitalizeFirstLetter(data.allChampionData.data[key].title);

    var $lore = document.createElement('p');
    $lore.textContent = data.allChampionData.data[key].blurb;

    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + key + '_0.jpg');

    $card.appendChild($lore);
    $card.appendChild($title);
    $card.appendChild($name);
    $card.appendChild($img);
    $parentContainer.appendChild($columnHalf);
  }
  data.allChampionData = xhr.response;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// document.addEventListener('click', handleCardClick);
// function handleCardClick(event) {
//   if (event.target.tagName === 'IMG') {
//     var xhr2 = new XMLHttpRequest();
//     var $parentCard = event.target.closest('div');
//     var $h2 = event.target.previousSibling;
//     var $img = $parentCard.querySelector('img');
//     if (!$parentCard.className.includes('lore')) {
//       xhr2.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/' + $h2.textContent + '.json');
//       xhr2.responseType = 'json';
//       xhr2.addEventListener('load', function getChampionData() {
//         var individualChampionData = xhr2.response;
//         var $lore = document.createElement('p');
//         $lore.textContent = individualChampionData.data[$h2.textContent].lore;
//         $parentCard.appendChild($lore);
//         $parentCard.className += ' lore';
//         $img.className = 'dark';
//       });
//       xhr2.send();
//     } else if ($parentCard.className.includes('lore')) {
//       removeLore();
//     }
//   } else if (event.target.tagName === 'P') {
//     removeLore();
//   }
// }

// function removeLore() {
//   var $parentCard = event.target.closest('div');
//   var $img = $parentCard.querySelector('img');
//   var $lore = $parentCard.querySelector('p');
//   $parentCard.className = 'card';
//   $lore.remove();
//   $img.className = '';
// }
