describe('Player', function(){
  it('will create a player with their status and score', function(){
    var newPlayer = new Player("John");
    expect(newPlayer.playerName).to.equal("John");
    expect(newPlayer.playerTurnScore).to.equal(0);
    expect(newPlayer.playerTotalScore).to.equal(0);
  });
});

describe('rollDice', function(){
  it('will return a random number between 1 - 6', function(){
    var answer = false;
    var number = rollDice(1,6,1);
    if (number > 0){
      answer = true;
    } else if (number <= 6) {
      answer = true;
    } else {
      answer = false;
    }
    expect(answer).to.equal(true);
  });

  it("will return all the rolls in the array if a player uses multiple dice", function() {
    var diceRolls = new rollDice(1, 6, 2);
    

  })

});
