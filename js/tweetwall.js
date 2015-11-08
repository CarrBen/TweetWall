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
}

function setGridCss(width, height){
	var style = $("#gridStyle");
	var rowHeight = 100/height + "%";
	var cellWidth = 100/width + "%";
	style.text(".row{width:100%; height:" + rowHeight + ";}" + 
				".cell{height:100%; width:" + cellWidth + ";}");
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
	switcher.addClass("switcher");
	switcher.addClass(classes);
	
	makeTweet(switcher);
	
	if(Math.random() > 0.5){
		switcher.addClass("york");
	}else{
		switcher.addClass("lancs");
	}
	
	return switcher;
}

function makeTweet(switcher){
	var wrapper = $("<span></span>");
	wrapper.addClass("tweet-wrapper");
	var container = $("<span></span>");
	container.addClass("tweet-container");
	var tweet = $("<span></span>");
	tweet.addClass("tweet");
	
	switcher.append(wrapper);
	wrapper.append(container);
	container.append(tweet);
}

function switchCell(x, y, direction){
	var cell = $("#cell_" + x + "-" + y);
	var current = $(".switcher.current", cell);
	var background = $(".switcher:not(.current)", cell)
	current.addClass(direction);
	setTimeout(function(){
		current.removeClass(direction).removeClass("current");
		background.addClass("current");				
	}, 1000);
}