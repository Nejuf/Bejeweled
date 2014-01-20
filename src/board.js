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
	};

	Board.prototype.create = function(game){
		this.jewelMatrix = [];
		this.jewels = game.add.group();
		for(var r = 0; r < this.width; r++){
			this.jewelMatrix.push([]);
			for(var c = 0; c < this.height; c++){
				var jewel = new Jewel(game, this.x + c*this.squareSize, 
					this.y + r*this.squareSize);
				_.last(this.jewelMatrix).push(jewel);
				this.jewels.add(jewel);
			}
		}
		this.checkMatches();
	};

	Board.prototype.update = function(game){

	};

	Board.prototype.checkMatches = function(){
		var checkedIndices = {};
		var removedJewels = false;
		this.eachJewelFromBottom(function(jewel, row, col){
			if(checkedIndices.hasOwnProperty([row,col]) || !jewel || removedJewels){
				return;
			}
			checkedIndices[[row,col]] = jewel;
			var matchedUncheckedCoords = this.getAdjacentJewelMatches(row, col, checkedIndices);
			var matchedCheckedCoords = [[row,col]];
			while(matchedUncheckedCoords.length > 0){
				var uncheckedCoord = matchedUncheckedCoords.shift();
				matchedCheckedCoords.push(uncheckedCoord);
				matchedUncheckedCoords = matchedUncheckedCoords.concat(this.getAdjacentJewelMatches(uncheckedCoord[0], uncheckedCoord[1], checkedIndices));
			}

			if(matchedCheckedCoords.length >= 3 && this.isValidMatch(matchedCheckedCoords)){
				this.removeMatchedJewels(matchedCheckedCoords);
				removedJewels = true;
			}
		});
		
	};

	Board.prototype.eachJewelFromBottom = function(iterator){
		for(var r = this.height-1; r >= 0; r--){
			for(var c = this.width-1; c >= 0; c--){
				var jewel = this.jewelMatrix[r][c];
				iterator.call(this, jewel, r, c);
			}
		}
	};

	Board.prototype.getAdjacentJewelMatches = function(row, col, checkedIndices){
		var board = this;
		var matches = [];
		var coords = [
			[row-1, col],
			[row+1, col],
			[row, col-1],
			[row, col+1],
		];

		var jewelColor = board.jewelMatrix[row][col].jewelColor;
		_.each(coords, function(coord){
			if(coord[0] >= 0 && coord[0] < board.height && coord[1] >= 0 && coord[1] < board.width){
				if(!checkedIndices.hasOwnProperty(coord)){
					var otherJewel = board.jewelMatrix[coord[0]][coord[1]];
					if(otherJewel.jewelColor === jewelColor){
						matches.push(coord);
						checkedIndices[coord] = otherJewel;
					}
				}
			}
		});
		return matches;
	};

	Board.prototype.isValidMatch = function(matchGroup){
		var byRow = _.groupBy(matchGroup, function(coord){
			return coord[0];
		});

		var foundByRow = _.some(byRow, function(rowGroup){
			if(rowGroup.length >= 3){
				return true;
			}
			else{
				return false;
			}
		});

		if(foundByRow){
			return true;
		}

		var byCol = _.groupBy(matchGroup, function(coord){
			return coord[1];
		});
		var foundByCol = _.some(byCol, function(colGroup){
			if(colGroup.length >= 3){
				return true;
			}
			else{
				return false;
			}
		});
		if(foundByCol){
			return true;
		}

		return false;
	};

	Board.prototype.removeMatchedJewels = function(matchGroup){
		var board = this;
		_.each(matchGroup, function(coord){
			var jewel = board.jewelMatrix[coord[0]][coord[1]];
			//TODO Remove jewels from board
			jewel.collect(game);
			board.dropColumn(coord, matchGroup);
		});
		board.updateMatrix(matchGroup);
	};

	Board.prototype.dropColumn = function(coord, matchGroup){
		var row = coord[0]-1;
		while(row >= 0){
			if(!includesSubArray([row, coord[1]], matchGroup)){
				var jewel = this.jewelMatrix[row][coord[1]];
				jewel.drop(game, this.squareSize);
			}
			row -= 1;
		}
	};

	Board.prototype.updateMatrix = function(matchGroup){
		var board = this;
		_.each(matchGroup, function(coord){
			var row = coord[0]-1;
			while(row >= 0){
				if(!includesSubArray([row, coord[1]], matchGroup)){
					var jewel = board.jewelMatrix[row][coord[1]];
					board.jewelMatrix[row][coord[1]] = null;
					board.jewelMatrix[row+1][coord[1]] = jewel;
				}
				row -= 1;
			}
		});
		console.log(board.jewelMatrix)
	}

	var includesSubArray = function(subArray, mainArray){
		return _.some(mainArray, function(el){
			if(el.length !== subArray.length){
				return false;
			}
			for(var i=0, len = el.length; i < len; i++){
				if(el[i] !== subArray[i]){
					return false;
				}
			}
			return true;
		});
	};

}).call(this);