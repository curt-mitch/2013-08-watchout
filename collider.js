var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 10,
  padding: 20
};

var gameBoard = d3.select('.container').append("svg:svg")
                    .attr('width',gameOptions.width)
                    .attr('height',gameOptions.height);

//genereate random coordiantes function
var newCoordinates = function(){
  return Math.random() *200;
};

var createEnemies = function(){
  var collection = _.range(0,gameOptions.nEnemies);
  return _.map(collection, function(i){
    return {
      id: i,
      x: newCoordinates(),
      y: newCoordinates()
    };
  });
};

var allEnemies = gameBoard.selectAll('svg').data(createEnemies);

//Enemies enter the gameBoard
allEnemies.enter().append('svg:circle')
            .attr('class', 'enemy')
            .attr('cx', function(d){return d.x})
            .attr('cy', function(d){return d.y})
            .attr('r', '10')
            .attr('fill', 'black');

var MOVE = function (){
  window.setInterval(moveEnemies, 1000);
};

var moveEnemies = function() {
  allEnemies.transition().duration(500)
            .attr('cx', function(d){d.x = newCoordinates(); return d.x})
            .attr('cy', function(d){d.y = newCoordinates(); return d.y});
};

MOVE();
