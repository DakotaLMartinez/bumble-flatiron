var src = document.getElementById('person-template').innerHTML;
var personTemplate = Handlebars.compile(src);
var peopleObjects = [];
var allValues = {
  name: [],
  favoriteColor: [],
  hometown: [],
  favoriteTimeOfDay: [],
  favoriteMovie: [],
  favoriteSuperhero: [],
  favoriteFood: []
};

Array.prototype.sample = function() {
  return this[Math.floor(Math.random()*this.length)];
}

$.get('https://sheets.googleapis.com/v4/spreadsheets/11LEFe86x85BusZdlP6AV-nBdKm2fYfUaQi53XmCN_t8/values/responses?key=AIzaSyCZeHqsFJknmenFz5EgAl1j6XDl-Bky9p8', function(response){
  console.log(response.values);
  response.values.slice(1).forEach(function(person){
    peopleObjects.push({
      timestamp: person[0],
      name: person[1],
      favoriteColor: person[2],
      hometown: person[3],
      favoriteTimeOfDay: person[4],
      favoriteMovies: person[5] && person[5].split(','),
      favoriteSuperhero: person[6],
      favoriteFood: person[7]
    })
    allValues.name.push(person[1]);
    allValues.favoriteColor.push(person[2]);
    allValues.hometown.push(person[3]);
    allValues.favoriteTimeOfDay.push(person[4]);
    var movies = person[5] ? person[5].split(',') : [];
    allValues.favoriteMovie.concat(movies);
    allValues.favoriteSuperhero.push(person[6]);
    allValues.favoriteFood.push(person[7]);
  });
  renderPeople();
  
  console.log(allValues.favoriteMovie.sample());
});

function renderPeople() {
  var peopleDiv = document.getElementById('people');
  peopleDiv.innerHTML = "";
  peopleObjects.forEach(function(context){
    peopleDiv.innerHTML += personTemplate(context);
  })
}

function generateMadLib() {

}