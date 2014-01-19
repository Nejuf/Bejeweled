(function(){

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var Board = Bejeweled.Board = function(width, height, squareSize){
		this.width = width || 8;
		this.height = height || 8;
		this.squareSize = squareSize || 64;//in pixels
	};

	Board.preload = function(game){
		game.load.spritesheet('jewel-blue', 'assets/img/jewel-blue.png', 32,32);
		game.load.spritesheet('jewel-red', 'assets/img/jewel-red.png', 48,48);
		game.load.spritesheet('jewel-yellow', 'assets/img/jewel-yellow.png', 48,46);
		game.load.spritesheet('jewel-gray', 'assets/img/jewel-gray.png', 64,32);
		game.load.spritesheet('jewel-purple', 'assets/img/jewel-purple.png', 48,48);
	}

	Board.prototype.create = function(game){

	}
	Board.prototype.update = function(){
		
	}

}).call(this);