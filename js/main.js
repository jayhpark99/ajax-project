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
      $columnHalf.setAttribute('roles', 'All ' + data.allChampionData.data[key].tags[0] + ' ' + data.allChampionData.data[key].tags[1]);
    }
    $columnHalf.appendChild($card);
    var $name = document.createElement('h2');
    $name.textContent = key;
    var $title = document.createElement('h3');
    $title.textContent = capitalizeFirstLetter(data.allChampionData.data[key].title);
    var $lore = document.createElement('p');
    $lore.textContent = data.allChampionData.data[key].blurb;
    $lore.className = 'off';
    var $img = document.createElement('img');
    $img.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + key + '_0.jpg');
    var $flipIcon = document.createElement('i');
    $flipIcon.className = 'fas fa-angle-right';

    $card.appendChild($flipIcon);
    $card.appendChild($lore);
    $card.appendChild($title);
    $card.appendChild($name);
    $card.appendChild($img);
    $parentContainer.appendChild($columnHalf);
  }
  data.allChampionData = xhr.response;
}

document.addEventListener('click', handleCardClick);

var $allButtons = document.querySelectorAll('button');
function handleCardClick(event) {
  if (event.target.tagName === 'BUTTON') {
    showRole(event.target.textContent);
    for (var i = 0; i < $allButtons.length; i++) {
      if (event.target.textContent === $allButtons[i].textContent) {
        $allButtons[i].className = 'role selected';
      } else { $allButtons[i].className = 'role'; }
    }
  } else if (event.target.closest('div').className.includes('card') &&
  !event.target.closest('div').className.includes('flipped') &&
  event.target.tagName !== 'I'
  ) {
    toggleLore();
  } else if (event.target.className === 'fas fa-angle-right') {
    flipCard();
  }
}

var $allCards = document.querySelectorAll('.column-half');
function showRole(role) {
  for (var i = 0; i < $allCards.length; i++) {
    if (!$allCards[i].getAttribute('roles').includes(role)) {
      $allCards[i].style.display = 'none';
    } else { $allCards[i].style.display = 'flex'; }
  }
}

var $form = document.querySelector('form');
$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
}

var $searchBar = document.querySelector('input');
$searchBar.addEventListener('input', handleInput);
function handleInput(event) {
  showSearchedChampions($searchBar.value);
}

function showSearchedChampions(name) {
  var currentTag = document.querySelector('.selected');
  for (var i = 0; i < $allCards.length; i++) {
    if ($allCards[i].childNodes[0].childNodes[3].textContent.toLowerCase().includes(name.toLowerCase()) && $allCards[i].getAttribute('roles').toLowerCase().includes(currentTag.textContent.toLowerCase())) {
      $allCards[i].style.display = '';
    } else {
      $allCards[i].style.display = 'none';
    }
  }
}

function toggleLore() {
  var $parentCard = event.target.closest('div');
  var $img = $parentCard.querySelector('img');
  var $lore = $parentCard.querySelector('p');
  var $flipIcon = $parentCard.querySelector('i');
  if (!$parentCard.className.includes('lore')) {
    $parentCard.className += ' lore';
    $img.className = 'dark';
    $lore.className = 'on';
    $flipIcon.style.display = 'flex';
  } else {
    $parentCard.className = 'card';
    $img.className = '';
    $lore.className = 'off';
    $flipIcon.style.display = 'none';
  }
}

function flipCard() {
  var $parentCard = event.target.closest('div');
  var $lore = $parentCard.querySelector('p');
  var $h3 = $parentCard.querySelector('h3');
  var $h2 = $parentCard.querySelector('h2');
  if ($parentCard.className === 'card lore') {
    $h3.className = 'off';
    $lore.className = 'off';
    $h2.className = 'off';
    $parentCard.style.transform = 'rotateY(180deg)';
    $parentCard.className = 'card lore flipped';
    var xhr2 = new XMLHttpRequest();
    xhr2.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/' + $h2.textContent + '.json');
    xhr2.responseType = 'json';
    xhr2.addEventListener('load', function () {
      var individualChampionData = xhr2.response;
      var $iconSpan = document.createElement('span');
      $iconSpan.className = 'ability-icons';
      var $qIcon = document.createElement('img');
      $qIcon.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/11.22.1/img/spell/' + individualChampionData.data[$h2.textContent].spells[0].image.full);
      var $wIcon = document.createElement('img');
      $wIcon.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/11.22.1/img/spell/' + individualChampionData.data[$h2.textContent].spells[1].image.full);
      var $eIcon = document.createElement('img');
      $eIcon.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/11.22.1/img/spell/' + individualChampionData.data[$h2.textContent].spells[2].image.full);
      var $rIcon = document.createElement('img');
      $rIcon.setAttribute('src', 'https://ddragon.leagueoflegends.com/cdn/11.22.1/img/spell/' + individualChampionData.data[$h2.textContent].spells[3].image.full);
      $iconSpan.prepend($qIcon, $wIcon, $eIcon, $rIcon);
      $parentCard.appendChild($iconSpan);
      var $name = document.createElement('p');
      $name.className = 'yellow ability-name off';
      var $description = document.createElement('p');
      $description.className = 'ability-description off';
      $iconSpan.append($name, $description);
      var $ability = $parentCard.querySelectorAll('span.ability-icons > p');
      $iconSpan.addEventListener('click', function () {
        if (event.target === $qIcon) {
          $ability[0].textContent = individualChampionData.data[$h2.textContent].spells[0].name;
          $ability[0].className = 'yellow ability-name';
          $ability[1].textContent = individualChampionData.data[$h2.textContent].spells[0].description;
          $ability[1].className = 'ability-description';
        } else if (event.target === $wIcon) {
          $ability[0].textContent = individualChampionData.data[$h2.textContent].spells[1].name;
          $ability[0].className = 'yellow ability-name';
          $ability[1].textContent = individualChampionData.data[$h2.textContent].spells[1].description;
          $ability[1].className = 'ability-description';
        } else if (event.target === $eIcon) {
          $ability[0].textContent = individualChampionData.data[$h2.textContent].spells[2].name;
          $ability[0].className = 'yellow ability-name';
          $ability[1].textContent = individualChampionData.data[$h2.textContent].spells[2].description;
          $ability[1].className = 'ability-description';
        } else if (event.target === $rIcon) {
          $ability[0].textContent = individualChampionData.data[$h2.textContent].spells[3].name;
          $ability[0].className = 'yellow ability-name';
          $ability[1].textContent = individualChampionData.data[$h2.textContent].spells[3].description;
          $ability[1].className = 'ability-description';
        }
      });
    });
    xhr2.send();
  } else if ($parentCard.className === 'card lore flipped') {
    $parentCard.style.transform = '';
    $parentCard.className = 'card lore';
    $h3.className = '';
    $lore.className = 'on';
    $h2.className = '';
    var $abilityIcons = $parentCard.querySelector('.ability-icons');
    $abilityIcons.remove();
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var $scrollUpIcon = document.querySelector('.fa-caret-square-up');
$scrollUpIcon.addEventListener('click', function () { window.scrollTo(0, 0); });
