var $parentContainer = document.querySelector('.container');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion.json');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  data.allChampionData = xhr.response;
});
xhr.send();

renderChampions();
var $allCards = document.querySelectorAll('.column-half');

for (var p = 0; p < $allCards.length; p++) {
  var $h2 = $allCards[p].querySelector('h2');
  if (data.favorites.includes($h2.innerText)) {
    var $heart = $allCards[p].querySelector('.fa-heart');
    $heart.className = 'fas fa-heart';
  }
}

function renderChampions() {
  for (var key in data.allChampionData.data) {
    var $columnHalf = document.createElement('div');
    $columnHalf.className = 'column-half';
    var $card = document.createElement('div');
    $card.className = 'card';
    $card.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(' + 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + key + '_0.jpg' + ')';
    $card.style.backgroundSize = 'cover';
    for (var i = 0; i < data.allChampionData.data[key].tags.length; i++) {
      $columnHalf.setAttribute('roles', 'All ' + data.allChampionData.data[key].tags[0] + ' ' + data.allChampionData.data[key].tags[1]);
    }
    $columnHalf.appendChild($card);
    var $name = document.createElement('h2');
    $name.textContent = key;
    var $heart = document.createElement('i');
    $heart.className = 'far fa-heart';
    $heart.style.display = 'none';
    $name.appendChild($heart);
    var $title = document.createElement('h3');
    $title.textContent = capitalizeFirstLetter(data.allChampionData.data[key].title);
    var $lore = document.createElement('p');
    $lore.textContent = data.allChampionData.data[key].blurb;
    $lore.className = 'off';
    var $flipIcon = document.createElement('i');
    $flipIcon.className = 'fas fa-angle-right';
    var $skinDiv = document.createElement('div');
    $skinDiv.className = 'skin-div';
    var $skin1 = document.createElement('i');
    $skin1.className = 'fas fa-circle 1';
    var $skin2 = document.createElement('i');
    $skin2.className = 'far fa-circle 2';
    var $skin3 = document.createElement('i');
    $skin3.className = 'far fa-circle 3';
    var $skin4 = document.createElement('i');
    $skin4.className = 'far fa-circle 4';
    $skinDiv.append($skin1, $skin2, $skin3, $skin4);

    $card.append($name, $title, $lore, $flipIcon, $skinDiv);
    $parentContainer.appendChild($columnHalf);
  }
  data.allChampionData = xhr.response;
}

document.addEventListener('click', handleCardClick);

var $allButtons = document.querySelectorAll('button');

function handleCardClick(event) {
  var $favorites = document.querySelector('.fa-heart.header');
  if (event.target === $favorites) {
    for (var k = 0; k < $allCards.length; k++) {
      var $h2 = $allCards[k].querySelector('h2');
      if (!data.favorites.includes($h2.textContent)) {
        $allCards[k].style.display = 'none';
      } else {
        $allCards[k].style.display = 'flex';
      }
    }
  }
  if (event.target.tagName === 'BUTTON') {
    showRole(event.target.textContent);
    for (var i = 0; i < $allButtons.length; i++) {
      if (event.target.textContent === $allButtons[i].textContent) {
        $allButtons[i].className = 'role selected';
      } else { $allButtons[i].className = 'role'; }
    }
  } else if (event.target.tagName !== 'I' &&
    !event.target.className.includes('flipped') &&
    event.target.closest('div').className.includes('card')
  ) {
    toggleLore();
  } else if (event.target.className === 'fas fa-angle-right') {
    flipCard();
  }
  if (event.target.className === 'far fa-heart') {
    event.target.closest('.column-half').className += ' favorite';
    event.target.className = 'fas fa-heart';
    if (!data.favorites.includes(event.target.parentElement.textContent)) {
      data.favorites.push(event.target.parentElement.textContent);
    }
  } else if (event.target.className === 'fas fa-heart') {
    event.target.closest('.column-half').className = 'column-half';
    event.target.className = 'far fa-heart';
    if (data.favorites.includes(event.target.parentElement.textContent)) {
      for (var h = 0; h < $allCards.length; h++) {
        if (event.target.parentElement.textContent === data.favorites[h]) {
          data.favorites.splice(h, 1);
        }
      }
    }
  }
  if (event.target.className.includes('far fa-circle')) {
    var skinNumArray = [];
    var $parentCard = event.target.closest('.card');
    var $key = $parentCard.querySelector('h2').textContent;
    var xhr3 = new XMLHttpRequest();
    xhr3.open('GET', 'http://ddragon.leagueoflegends.com/cdn/11.22.1/data/en_US/champion/' + $key + '.json');
    xhr3.responseType = 'json';
    xhr3.addEventListener('load', function () {
      function clearDots() {
        var $dots = $parentCard.querySelectorAll('.fa-circle');
        for (var q = 0; q < $dots.length; q++) {
          $dots[q].className = 'far fa-circle ' + (q + 1);
        }
      }
      var skinsArray = xhr3.response.data[$key].skins;
      for (var i = 0; i < skinsArray.length; i++) {
        skinNumArray.push(skinsArray[i].num);
      }
      if (event.target.className === 'far fa-circle 1') {
        clearDots();
        event.target.className = 'fas fa-circle 1';
        $parentCard.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(' + 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + $key + '_' + skinNumArray[0] + '.jpg' + ')';
        $parentCard.style.backgroundSize = 'cover';
      } else if (event.target.className === 'far fa-circle 2') {
        clearDots();
        event.target.className = 'fas fa-circle 2';
        $parentCard.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(' + 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + $key + '_' + skinNumArray[skinNumArray.length - 1] + '.jpg' + ')';
        $parentCard.style.backgroundSize = 'cover';
      } else if (event.target.className === 'far fa-circle 3') {
        clearDots();
        event.target.className = 'fas fa-circle 3';
        $parentCard.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(' + 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + $key + '_' + skinNumArray[skinNumArray.length - 2] + '.jpg' + ')';
        $parentCard.style.backgroundSize = 'cover';
      } else if (event.target.className === 'far fa-circle 4') {
        clearDots();
        event.target.className = 'fas fa-circle 4';
        $parentCard.style.background = 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.4)), url(' + 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + $key + '_' + skinNumArray[skinNumArray.length - 3] + '.jpg' + ')';
        $parentCard.style.backgroundSize = 'cover';
      }
    });
    xhr3.send();
  }
}

function showRole(role) {
  for (var i = 0; i < $allCards.length; i++) {
    if (!$allCards[i].getAttribute('roles').includes(role)) {
      $allCards[i].style.display = 'none';
    } else {
      $allCards[i].style.display = 'flex';
    }
  }
}

var $form = document.querySelector('form');
$form.addEventListener('submit', handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  showSearchedChampions($searchBar.value);
}

var $searchBar = document.querySelector('input');
$searchBar.addEventListener('input', handleInput);
$searchBar.addEventListener('click', handleInput);
function handleInput(event) {
  showSearchedChampions($searchBar.value);
}

function showSearchedChampions(name) {
  var currentTag = document.querySelector('.selected');
  for (var i = 0; i < $allCards.length; i++) {
    if ($allCards[i].childNodes[0].childNodes[0].textContent.toLowerCase().includes(name.toLowerCase()) && $allCards[i].getAttribute('roles').toLowerCase().includes(currentTag.textContent.toLowerCase())) {
      $allCards[i].style.display = '';
    } else {
      $allCards[i].style.display = 'none';
    }
  }
}

function toggleLore() {
  var $parentCard = event.target.closest('div');
  var $lore = $parentCard.querySelector('p');
  var $flipIcon = $parentCard.querySelector('.fa-angle-right');
  var $heart = $parentCard.querySelector('.fa-heart');
  var $skinDiv = $parentCard.querySelector('.skin-div');
  if (!$parentCard.className.includes('lore')) {
    $parentCard.className += ' lore';
    $lore.className = '';
    $flipIcon.style.display = 'flex';
    $heart.style.display = 'inline-block';
    $skinDiv.style.display = 'none';
  } else if (!$parentCard.className.includes('flipped')) {
    $parentCard.className = 'card';
    $lore.className = 'off';
    $flipIcon.style.display = 'none';
    $heart.style.display = 'none';
    $skinDiv.style.display = 'flex';
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
      $parentCard.append($name, $description);
      var $abilityName = $parentCard.querySelector('.ability-name');
      var $abilityDescription = $parentCard.querySelector('.ability-description');
      $iconSpan.addEventListener('click', function () {
        if (event.target === $qIcon) {
          $abilityName.textContent = individualChampionData.data[$h2.textContent].spells[0].name;
          $abilityName.className = 'yellow ability-name';
          $abilityDescription.textContent = individualChampionData.data[$h2.textContent].spells[0].description;
          $abilityDescription.className = 'ability-description';
        } else if (event.target === $wIcon) {
          $abilityName.textContent = individualChampionData.data[$h2.textContent].spells[1].name;
          $abilityName.className = 'yellow ability-name';
          $abilityDescription.textContent = individualChampionData.data[$h2.textContent].spells[1].description;
          $abilityDescription.className = 'ability-description';
        } else if (event.target === $eIcon) {
          $abilityName.textContent = individualChampionData.data[$h2.textContent].spells[2].name;
          $abilityName.className = 'yellow ability-name';
          $abilityDescription.textContent = individualChampionData.data[$h2.textContent].spells[2].description;
          $abilityDescription.className = 'ability-description';
        } else if (event.target === $rIcon) {
          $abilityName.textContent = individualChampionData.data[$h2.textContent].spells[3].name;
          $abilityName.className = 'yellow ability-name';
          $abilityDescription.textContent = individualChampionData.data[$h2.textContent].spells[3].description;
          $abilityDescription.className = 'ability-description';
        }
      });
    });
    xhr2.send();
  } else if (event.target.tagName === 'I' && $parentCard.className === 'card lore flipped') {
    $parentCard.style.transform = '';
    $parentCard.className = 'card lore';
    $h3.className = '';
    $lore.className = '';
    $h2.className = '';
    var $abilityIcons = $parentCard.querySelector('.ability-icons');
    var $abilityName = $parentCard.querySelector('.ability-name');
    var $abilityDescription = $parentCard.querySelector('.ability-description');
    $abilityIcons.remove();
    $abilityDescription.remove();
    $abilityName.remove();
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var $scrollUpIcon = document.querySelector('.fa-caret-square-up');
$scrollUpIcon.addEventListener('click', function () { window.scrollTo(0, 0); });
