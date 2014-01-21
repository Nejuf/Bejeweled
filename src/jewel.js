(function(){ "use-strict";

	var Bejeweled = this.Bejeweled = this.Bejeweled || {};

	var COLORS = [
		'yellow',
		'blue',
		'red',
		'purple',
		'gray'
	];

	var Jewel = Bejeweled.Jewel = function(game, x, y, color){
		this.jewelColor = color || _.sample(COLORS);
		this.collected = false;
		this.board = game.board;
		Phaser.Sprite.call(this, game, x, y, 'jewel-' + this.jewelColor);

		this.anchor.setTo(0.5, 0.5);

		this.inputEnabled = true;
		this.events.onInputDown.add(onClick, this);

		this.moveTween = null;
		this.destY = null;
		return this;
	};

	Jewel.prototype = Object.create(Phaser.Sprite.prototype);
	Jewel.prototype.constructor = Jewel;

	Jewel.preload = function(game){
		game.load.spritesheet('jewel-blue', 'assets/img/jewel-blue.png', 32,32);
		game.load.spritesheet('jewel-red', 'assets/img/jewel-red.png', 48,48);
		game.load.spritesheet('jewel-yellow', 'assets/img/jewel-yellow.png', 48,46);
		game.load.spritesheet('jewel-gray', 'assets/img/jewel-gray.png', 64,32);
		game.load.spritesheet('jewel-purple', 'assets/img/jewel-purple.png', 48,48);
	};

	Jewel.prototype.update = function(){
		if(this.isSelected){
			this.angle += 8;
		}
		else if(this.angle !== 0){
			this.angle = 0;
		}
	};

	function onClick(jewel, pointer){
		if(jewel.board.isJewelMoving()){
			return;
		}
		
		var selectedJewel = jewel.groupSelectedJewel();
		if(selectedJewel && selectedJewel !== jewel){
			jewel.board.attemptSwap(selectedJewel, jewel);
		}
		else{
			jewel.isSelected = !jewel.isSelected;
		}
	};

	Jewel.prototype.groupSelectedJewel = function(){
		var otherJewel;
		this.group.forEachAlive(function(jewel){
			if(jewel.isSelected){
				otherJewel = jewel;
			}
		});
		return otherJewel;
	};

	Jewel.prototype.drop = function(game, squareSize){
		var dropSpeed = 0.2;
		if(this.moveTween){
			this.destY += squareSize;
			this.moveTween.stop();
			this.moveTween = game.add.tween(this);
			this.moveTween.to({y: this.destY}, (this.destY-this.y)/dropSpeed );
			this.moveTween.delay(1000);
			this.moveTween.start();
		}
		else{
			this.destY = this.y + squareSize;
			this.moveTween = game.add.tween(this);
			this.moveTween.to({y: this.destY}, (this.destY-this.y)/dropSpeed);
			this.moveTween.delay(1000);
			this.moveTween.start();
		}
	};

	Jewel.prototype.collect = function(game){
		this.collected = true;
		var exitTween = game.add.tween(this);
		exitTween.to({alpha: 0.2 });
		exitTween.onComplete.add(function(jewel){
			jewel.kill();
		});
		exitTween.start();
	};

	Jewel.prototype.swap = function(otherJewel, isInvalidSwap){
		var thisJewel = this;
		this.isSelected = false;
		otherJewel.isSelected = false;

		var thisJewelY = this.y;
		var thisJewelX = this.x;
		var otherJewelY = otherJewel.y;
		var otherJewelX = otherJewel.x;

		var moveTween = this.moveTween = this.board.game.add.tween(this);
		moveTween.to({y: otherJewelY, x: otherJewelX});

		var moveOtherTween = otherJewel.moveTween = this.board.game.add.tween(otherJewel);
		moveOtherTween.to({y: thisJewelY, x: thisJewelX});

		thisJewel.destY = otherJewelY;
		otherJewel.destY = thisJewelY;
		if(isInvalidSwap){
			moveTween.onComplete.add(function(jewel){
				var moveAgainTween = thisJewel.moveTween = jewel.board.game.add.tween(jewel);
				moveAgainTween.to({y: thisJewelY, x: thisJewelX});
				moveAgainTween.start();
			});
			moveOtherTween.onComplete.add(function(jewel){
				var moveAgainTween = otherJewel.moveTween = jewel.board.game.add.tween(jewel);
				moveAgainTween.to({y: otherJewelY, x: otherJewelX});
				moveAgainTween.start();
			});

			thisJewel.destY = thisJewelY;
			otherJewel.destY = otherJewelY;
		}
		moveTween.start();
		moveOtherTween.start();
	};
	
}).call(this);