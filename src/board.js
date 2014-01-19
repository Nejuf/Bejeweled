(function(){ "use-strict";

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var Board = Bejeweled.Board = function(x, y, width, height, squareSize){
		this.x = x;
		this.y = y;
		this.width = width || 8;
		this.height = height || 8;
		this.squareSize = squareSize || 64;//in pixels
	};

	var Jewel = Bejeweled.Jewel;

	Board.preload = function(game){
		Jewel.preload(game);
	}

	Board.prototype.create = function(game){
		this.jewels = game.add.group();
		for(var r = 0; r < this.width; r++){
			for(var c = 0; c < this.height; c++){
				this.jewels.add(new Jewel(game, this.x + r*this.squareSize, 
					this.y + c*this.squareSize));
			}
		}
	}

	Board.prototype.update = function(game){

	}

}).call(this);