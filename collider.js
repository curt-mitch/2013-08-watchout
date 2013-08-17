var gameOptions = {
  height: 450,
  width: 700,
  nEnemies: 5,
  padding: 20
};

var gameBoard = d3.select('.container').append("svg:svg")
                    .attr('width',gameOptions.width)
                    .attr('height',gameOptions.height);

var createEnemies = function(){
  var collection = _.range(0,gameOptions.nEnemies);
  return _.map(collection, function(i){
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    };
  });
};

var allEnemies = gameBoard.selectAll('svg').data(createEnemies,);

//Enemies enter the gameBoard
allEnemies.enter().append('svg:circle')
            .attr('class', 'enemy')
            .attr('cx', '20')
            .attr('cy', '20')
            .attr('r', '20')
            .attr('fill', 'blue');