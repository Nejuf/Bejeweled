(function(){ 

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var game = new Phaser.Game(640, 480, Phaser.AUTO, 'bejeweled-container', {
		preload: preload,
		create: create,
		update: update
	});

	function preload(game){
		Bejeweled.Board.preload(game);
	}

	var board;
	function create(){
		board = new Bejeweled.Board(8, 8, 64);
		board.create(game);
	}

	function update(){
		board.update();
	}
	
}).call(this);