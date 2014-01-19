(function(){ "use-strict";

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var COLORS = [
		'yellow',
		'blue',
		'red',
		'purple',
		'gray'
	]

	var Jewel = Bejeweled.Jewel = function(game, x, y, color){
		this.color = color || _.sample(COLORS);
		Phaser.Sprite.call(this, game, x, y, 'jewel-' + this.color);

		return this;
	}

	Jewel.prototype = Object.create(Phaser.Sprite.prototype);
	Jewel.prototype.constructor = Jewel;

	Jewel.preload = function(game){
		game.load.spritesheet('jewel-blue', 'assets/img/jewel-blue.png', 32,32);
		game.load.spritesheet('jewel-red', 'assets/img/jewel-red.png', 48,48);
		game.load.spritesheet('jewel-yellow', 'assets/img/jewel-yellow.png', 48,46);
		game.load.spritesheet('jewel-gray', 'assets/img/jewel-gray.png', 64,32);
		game.load.spritesheet('jewel-purple', 'assets/img/jewel-purple.png', 48,48);
	}

	Jewel.prototype.update = function(game){
		
	}

	
}).call(this);