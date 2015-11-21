(function(window, $){
	
if($ == undefined || $ == null){
	$ = window.$;
}
	
var cellPool = [];
var config = {};
config.freeWait = 3000;
config.dirs = ["right", "up", "down", "left"];

function initGrid(width, height){
	var grid = $("#grid");
	//Abort if there is no grid container
	if(grid.length < 1){
		return false;
	}
	grid.empty();
	
	//Check we have a gridStyle and create one if we don't
	var gridStyle = $("#gridStyle");
	if(gridStyle.length < 1){
		gridStyle = $("<style id='gridStyle'></style>");
		$("head").append(gridStyle);
	}
	//Set row and cell width and height to match requested width and height
	setGridCss(width, height);
	
	for(var y=0; y<height; y+=1){
		makeRow(grid, width, y);
	}
	
	cellPool = $(".cell");
}

function setGridCss(width, height){
	var style = $("#gridStyle");
	var rowHeight = 100/height + "%";
	var cellWidth = 100/width + "%";
	var fontSize = 20/(width*height);
	style.text(".row{width:100%; height:" + rowHeight + ";}" + 
				".cell{height:100%; width:" + cellWidth + ";}" + 
				"body{font-size:" + fontSize + "em;}");
}

function configure(options){
	if(options == undefined || options == null){
		return;
	}
	
	if("freeWait" in options){
		config.freeWait = options.freeWait;
	}
	if("dirs" in options){
		config.dirs = options.dirs;
	}
}

function makeRow(grid, width, y){
	var currentRow = $("<div></div>");
	currentRow.addClass("row");
	grid.append(currentRow);
	
	for(var x=0; x<width; x+=1){
		makeCell(currentRow, x, y);
	}
	
	currentRow.attr("id", "row_" + y);
}

function makeCell(row, x, y){
	var cell = $("<div></div>");
	row.append(cell);
	cell.addClass("cell")
	
	var switcherCurrent = makeSwitcher("current")
	cell.append(switcherCurrent);
	
	var switcherBack = makeSwitcher("")
	cell.append(switcherBack);
	
	cell.attr("id", "cell_" + x + "-" + y);
}

function makeSwitcher(classes){
	var switcher = $("<div></div>");
	setupSwitcher(switcher);
	switcher.addClass(classes);
	
	makeTweet(switcher);
	
	if(Math.random() > 0.5){
		switcher.addClass("york");
	}else{
		switcher.addClass("lancs");
	}
	
	return switcher;
}

function setupSwitcher(switcher){
	switcher.addClass("switcher");
}

function makeTweet(switcher){
	var wrapper = $("<span></span>");
	wrapper.addClass("tweet-wrapper");
	var container = $("<span></span>");
	container.addClass("tweet-container");
	
	switcher.append(wrapper);
	wrapper.append(container);
	setupTweet(container);
}

function setupTweet(container){
	var tweet = $("<span></span>");
	tweet.addClass("tweet");
	
	container.append(tweet);
}

function switchCell(cell, direction, toClass, message){
	if(cell == undefined || !("filter" in cell)){
		cell = $(cell);
	}
	var current = $(".switcher.current", cell);
	var background = $(".switcher:not(.current)", cell)
	
	current.addClass(direction);
	
	if(toClass != undefined && toClass != null){
		background.removeClass();
		setupSwitcher(background);
		background.addClass(toClass);
	}
	
	setTimeout(function(){
		current.removeClass(direction).removeClass("current");
		background.addClass("current");				
	}, 1000);
	
	$(".tweet", background).remove();
	setupTweet($(".tweet-container", background));
	var backgroundTweet = $(".tweet", background);
	
	cellPool = cellPool.filter(function(a,b,c){return b != cell[0]})
	
	backgroundTweet.text("");
	$(".typed-cursor", background).remove();
	if(message != undefined && message != null){
		backgroundTweet.typed({
			contentType: 'html',
			strings:[message],
			typeSpeed: 100,
			startDelay: 1000,
			callback: finishedTyping(cell)
		});
	}
}

function finishedTyping(cell){
	return function(){
		setTimeout(function(){
			cellPool.push(cell[0]);
		}, config.freeWait);
	}
}

function switchFreeCell(toClass, message){
	var cell = cellPool[Math.floor(Math.random()*cellPool.length)];
	switchCell(cell,config.dirs[Math.floor(4*Math.random())],toClass,message);
}

var exports = {};
exports.initGrid = initGrid;
exports.switchFreeCell = switchFreeCell;
exports.configure = configure;

if(typeof(define) === 'function' && define.amd){
	define(['jquery'], function(){
		return exports;
	})
}
else{
	window.TweetWall = exports;
}

return exports;
})(this);