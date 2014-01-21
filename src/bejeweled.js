(function(){ "use-strict";

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var game = window.game = new Phaser.Game(700, 540, Phaser.CANVAS, 'bejeweled-container', {
		preload: preload,
		create: create,
		update: update
	});

	function preload(game){
		Bejeweled.Board.preload(game);
		Bejeweled.HUD.preload(game);
	}

	function create(){
		game.score = 0;

		game.board = new Bejeweled.Board(150, 20, 8, 8, 64);
		game.board.onGameOver = gameOver;
		game.board.create(game);

		game.hud = new Bejeweled.HUD(game, 0, 0, 700, 540);
	}

	function update(){
		game.board.update(game);
		game.hud.updateScore(game.score);
	}

	function gameOver(){
		console.log('game over');
		game.hud.showGameOver();
	}
	
}).call(this);