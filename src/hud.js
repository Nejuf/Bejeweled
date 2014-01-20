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

	HUD.prototype.updateScore = function(score){
		if(score != this.score){
			this.scoreText.setText("Score:\n" + score);
		}
	};

}).call(this);