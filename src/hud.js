(function(){ "use-strict";

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var HUD = Bejeweled.HUD = function(game, x, y, width, height){
		this.game = game;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.score = 0;
		this.scoreText = game.add.text(this.x + 6, this.y + 4, "Score:\n" + this.score, {
			font: "32px Arial",
			fill: "#ff0044",
			align: "center"
		});
	}

	HUD.preload = function(game){
		game.load.spritesheet('btn_playAgain', 'assets/img/btn_playAgain.png', 302, 267/3);
		game.load.spritesheet('btn_submitScore', 'assets/img/btn_submitScore.png', 302, 267/3);
	};

	HUD.prototype.updateScore = function(score){
		if(score != this.score){
			this.scoreText.setText("Score:\n" + score);
		}
	};

	HUD.prototype.showGameOver = function(){
		var windowX = 170;
		var windowY = 60;
		var windowHeight = 400;
		var windowWidth = 400;
		this.gameOverWindow = game.add.group();
		var gameOverBack = game.add.graphics(windowX, windowY);
		gameOverBack.beginFill(0x8A7D78);
		gameOverBack.lineStyle(4, 0xC74644, 1);
		gameOverBack.moveTo(0,0);
    gameOverBack.lineTo(windowWidth, 0);
    gameOverBack.lineTo(windowWidth, windowHeight);
    gameOverBack.lineTo(0, windowHeight);
    gameOverBack.lineTo(0, 0);
    gameOverBack.endFill();

    this.gameOverWindow.add(gameOverBack);

    var gameOverText = game.add.text(windowX + windowWidth/2, windowY + 30, "Game Over!", {
			font: "44px Arial",
			fill: "#000000",
			align: "center"
		});
		gameOverText.anchor.setTo(0.5, 0.5);
		this.gameOverWindow.add(gameOverText);

		var finalScoreText = game.add.text(windowX + windowWidth/2, windowY + 130, "Final Score:\n" + this.score, {
			font: "36px Arial",
			fill: "#000000",
			align: "center"
		});
		finalScoreText.anchor.setTo(0.5, 0.5);
		this.gameOverWindow.add(finalScoreText);

		var btnPlayAgain = game.add.button(windowX + windowWidth/2 - 150, windowY + windowHeight - 96, 'btn_playAgain', onPlayAgain, this, 1, 0, 2);
		this.gameOverWindow.add(btnPlayAgain);

		var btnSubmitScore = game.add.button(windowX + windowWidth/2 - 150, windowY + windowHeight - 200, 'btn_submitScore', onSubmitScore, this, 1, 0, 2);
		this.gameOverWindow.add(btnSubmitScore);
	};

	function onPlayAgain(){
		//TODO
	};
	
	function onSubmitScore(){
		//TODO
	};

}).call(this);