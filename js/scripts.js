function Player(playerName, topScore){
  this.playerName = playerName;
  this.playerTurnScore = 0;
  this.playerTotalScore = 0;
  this.playerTopScore = topScore;
}

function rollDice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Player.prototype.checkWin = function(score){
  if(score >= this.playerTopScore){
    alert(this.playerName + " has won!");
  }
}

$(document).ready(function(){

  $('form#pig_dice_players').submit(function(event){
    event.preventDefault();

    var topScore = parseInt($('input#final_score').val());
    var inputPlayerName1 = $('input#player_name1').val();
    var newPlayer1 = new Player(inputPlayerName1, topScore);
    var inputPlayerName2 = $('input#player_name2').val();
    var newPlayer2 = new Player(inputPlayerName2, topScore);
    var numberDice = parseInt($('input#dice_number').val());
    var allRolls = [];

    $('#show-game').show();
    $('#all_scores').show();

    $('h2#players-on-team-1').append("<span class='player1_info'>" + newPlayer1.playerName + "</span>");
    $('h2#players-on-team-1').show();
    $('h2#players-on-team-2').append("<span class='player2_info'>" + newPlayer2.playerName + "</span>");
    $('h2#players-on-team-2').show();
    $('#pig_dice_players').hide();

    $('.player1_info').one('click',function(){
      $('h2#players-on-team-2').hide();

      $('#players-on-team-1').append('<form id="game_form1"><br>' +
      '<h6>Your Roll: <span class="lastRoll1"></span></h6>' +
      '<h6>Turn Points: <span class="turnPoints1"></span></h6>' +
      '<h6>Total Points: <span class="totalPoints1"></span></h6>' +
      '<button class="btn btn-primary" id="roll_dice1">Roll The Dice</button>' +
      '<button type="submit" class="btn">Hold</button>' +
      '</form>');

      $("button#roll_dice1").click(function(event) {
        event.preventDefault();
        allRolls = [];
        for (var rolls = 1; rolls <= numberDice; rolls +=1) {
          var roll = rollDice(1,6);
          allRolls.push(roll);
        }
        $('.lastRoll1').text(allRolls);
        if (allRolls.indexOf(1) === -1) {
          allRolls.forEach(function(diceRoll) {
            newPlayer1.playerTurnScore += diceRoll;
          });
        } else {
          newPlayer1.playerTurnScore = 0;
          alert("You have rolled a 1. Your turn is over.")
          $('form#game_form1').submit();
        }
        $('.turnPoints1').text(newPlayer1.playerTurnScore);

      });

      $('form#game_form1').submit(function(event){
        event.preventDefault();
        newPlayer1.playerTotalScore += newPlayer1.playerTurnScore;
        $('.totalPoints1').text(newPlayer1.playerTotalScore);
        newPlayer1.playerTurnScore = 0;
        $('.turnPoints1').text(newPlayer1.playerTurnScore);
        $('.lastRoll1').text("");
        $('h2#players-on-team-1').hide()
        $('h2#players-on-team-2').show()
        $('#player_1_score').text(newPlayer1.playerTotalScore);
        newPlayer1.checkWin(newPlayer1.playerTotalScore);
        if(newPlayer1.playerTotalScore >= newPlayer1.playerTopScore) {
          $('h2#players-on-team-2').hide();
          $('h2#players-on-team-1').hide();
        }

      });
    });

    $('.player2_info').one('click', function(){
      $('h2#players-on-team-1').hide();

      $('#players-on-team-2').append('<form id="game_form2"><br>' +
      '<h6>Your Roll: <span class="lastRoll2"></span></h6>' +
      '<h6>Turn Points: <span class="turnPoints2"></span></h6>' +
      '<h6>Total Points: <span class="totalPoints2"></span></h6>' +
      '<button class="btn btn-primary" id="roll_dice2">Roll The Dice</button>' +
      '<button type="submit" class="btn">Hold</button>' +
      '</form>');

      $("button#roll_dice2").click(function(event) {
        event.preventDefault();
        allRolls = [];
        for (var rolls = 1; rolls <= numberDice; rolls +=1) {
          var roll = rollDice(1,6);
          allRolls.push(roll);
        }
        $('.lastRoll2').text(allRolls);
        if (allRolls.indexOf(1) === -1) {
          allRolls.forEach(function(diceRoll) {
            newPlayer2.playerTurnScore += diceRoll;
          });
        } else {
          newPlayer2.playerTurnScore = 0;
          alert("You have rolled a 1. Your turn is over.")
          $('form#game_form2').submit();
        }
        $('.turnPoints2').text(newPlayer2.playerTurnScore);
      });

      $('form#game_form2').submit(function(event){
        event.preventDefault();
        newPlayer2.playerTotalScore += newPlayer2.playerTurnScore;
        $('.totalPoints2').text(newPlayer2.playerTotalScore);
        newPlayer2.playerTurnScore = 0;
        $('.turnPoints2').text(newPlayer2.playerTurnScore);
        $('.lastRoll2').text("");
        $('h2#players-on-team-2').hide()
        $('h2#players-on-team-1').show()
        $('#player_2_score').text(newPlayer2.playerTotalScore);
        newPlayer2.checkWin(newPlayer2.playerTotalScore);
        if(newPlayer2.playerTotalScore >= newPlayer2.playerTopScore) {
          $('h2#players-on-team-2').hide();
          $('h2#players-on-team-1').hide();
        }
      });
    });

    $('button#reset_game').click(function(){
      newPlayer1.playerTotalScore = 0;
      newPlayer2.playerTotalScore = 0;
      newPlayer1.playerTurnScore = 0;
      newPlayer2.playerTurnScore = 0;
      allRolls = [];
      $('.lastRoll1').text("");
      $('.lastRoll2').text("");
      $('.turnPoints1').text(newPlayer1.playerTurnScore);
      $('.turnPoints2').text(newPlayer2.playerTurnScore);
      $('.totalPoints1').text(newPlayer1.playerTotalScore);
      $('.totalPoints2').text(newPlayer2.playerTotalScore);
      $('#player_1_score').text(newPlayer1.playerTotalScore);
      $('#player_2_score').text(newPlayer2.playerTotalScore);
    });
  });
});
