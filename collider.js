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
  return Math.random() *400;
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
var Player = {};

var createPlayer = function(){
  Player.identity = [];
  Player.identity.push({
    id: 'player',
    x: 100,
    y: 100
  });
  return Player.identity;
};

var allEnemies = gameBoard.selectAll('svg').data(createEnemies);
var player = gameBoard.selectAll('svg').data(createPlayer);


//Enemies enter the gameBoard
allEnemies.enter().append('svg:circle')
            .attr('class', 'enemy')
            .attr('cx', function(d){return d.x})
            .attr('cy', function(d){return d.y})
            .attr('r', '10')
            .attr('fill', 'black');

player.enter().append('svg:circle')
            .attr('class', 'player')
            .attr('cx', function(d){return d.x})
            .attr('cy', function(d){return d.y})
            .attr('r', '10')
            .attr('fill', 'orange')
            .call(d3.behavior.drag().on('drag', function(){moveP()}));

var moveP = function(){
  player.attr('cx', function(){return d3.event.dx + parseInt(player.attr('cx'))})
        .attr('cy', function(){return d3.event.dy + parseInt(player.attr('cy'))});
};

var MOVE = function (){
  window.setInterval(moveEnemies, 1000);
};

var moveEnemies = function() {
  allEnemies.transition().duration(1000)
            .attr('cx', function(d){d.x = newCoordinates(); return d.x})
            .attr('cy', function(d){d.y = newCoordinates(); return d.y});
};

MOVE();
