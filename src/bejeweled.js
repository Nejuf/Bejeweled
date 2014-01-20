(function(){ "use-strict";

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var game = window.game = new Phaser.Game(700, 540, Phaser.CANVAS, 'bejeweled-container', {
		preload: preload,
		create: create,
		update: update
	});

	function preload(game){
		Bejeweled.Board.preload(game);
	}

	var board;
	function create(){
		board = game.board = new Bejeweled.Board(150, 20, 8, 8, 64);
		board.create(game);
	}

	function update(){
		board.update(game);
	}
	
}).call(this);