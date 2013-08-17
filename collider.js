var SIZE = 800;

var gameOptions = {
  height: SIZE,
  width: SIZE,
  nEnemies: 30,
  padding: 20
};
var scoreBoard = {};
var gameBoard = d3.select('.container').append("svg:svg")
                    .attr('width',gameOptions.width)
                    .attr('height',gameOptions.height);

//genereate random coordiantes function
var newCoordinates = function(){
  return Math.random() *SIZE;
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
    x: SIZE / 2,
    y: SIZE / 2
  });
  return Player.identity;
};
var collision = function(){
};
//collision detection
var collisionCheck = function(enemy, callback){
  var radiusSum = parseFloat(enemy.attr('r')) + parseFloat(player.attr('r'));
  var xDiff = parseFloat(enemy.attr('cx')) - player.attr('cx');
  var yDiff = parseFloat(enemy.attr('cy')) - player.attr('cy');

  var seperation = Math.sqrt(Math.pow(xDiff,2) + Math.pow(yDiff,2));
  if(radiusSum > seperation){
    return callback(player, enemy);
  }
};

//tweenfunction
var tweenCollisionCheck = function(endPointData){
  var enemy = d3.select(this);

  var startPoint = {
    x: parseFloat(enemy.attr('cx')),
    y: parseFloat(enemy.attr('cy'))
  };

  var endPoint = {
    x: endPointData.x,
    y: endPointData.y
  };

  return function(t){
    collisionCheck(enemy, collision);
    var enemyNextPosition = {
      x: startPoint.x + (endPoint.x - startPoint.x)*t,
      y: startPoint.y + (endPoint.y - startPoint.y)*t
    };

    enemy.attr('cx', enemyNextPosition.x)
          .attr('cy', enemyNextPosition.y);
  };
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
            .call(d3.behavior.drag().on('drag', function(d,i){moveP(d)}));

var moveP = function(d){
  player.attr('cx', function(){return d3.event.dx + parseInt(player.attr('cx'))})
        .attr('cy', function(){return d3.event.dy + parseInt(player.attr('cy'))});
};

var moveStep = function (){
  window.setInterval(moveEnemies, 1000);
};

var moveEnemies = function() {
  allEnemies.transition().duration(1000)
            .attr('cx', function(d){d.x = newCoordinates(); return d.x})
            .attr('cy', function(d){d.y = newCoordinates(); return d.y})
            .tween('custom', tweenCollisionCheck);
};

moveStep();
