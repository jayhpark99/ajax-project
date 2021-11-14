/* exported data */
var data = {
  allChampionData: null,
  favorites: []
};

window.addEventListener('beforeunload', handleUnload);
function handleUnload(event) {
  var myStorage = window.localStorage;
  var JSONdata = JSON.stringify(data);
  myStorage.setItem('javascript-local-storage', JSONdata);
}

var previousData = localStorage.getItem('javascript-local-storage');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
