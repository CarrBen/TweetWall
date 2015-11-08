function initGrid(width, height){
	var grid = $("#grid");
	grid.empty();
	setGridCss(width, height);
	
	for(var y=0; y<height; y+=1){
		makeRow(grid, width);
	}
}

function setGridCss(width, height){
	var style = $("#gridStyle");
	var rowHeight = 100/height + "%";
	var cellWidth = 100/width + "%";
	style.text(".row{width:100%; height:" + rowHeight + ";}" + 
				".cell{height:100%; width:" + cellWidth + ";}");
}

function makeRow(grid, width){
	var currentRow = $("<div></div>");
	currentRow.addClass("row");
	grid.append(currentRow);
	
	for(var x=0; x<width; x+=1){
		makeCell(currentRow);
	}
}

function makeCell(row){
	var cell = $("<div></div>");
	row.append(cell);
	cell.addClass("cell")
	
	var switcherCurrent = makeSwitcher("current")
	cell.append(switcherCurrent);
	
	var switcherBack = makeSwitcher("")
	cell.append(switcherBack);
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