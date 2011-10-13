/* 

Project: 				Whiteboard 
Author:					Daniel Quevedo
Company:				DEX
Description:		A whiteboard that allows for 2-way collaborative doodling, using HTML5.
Notes:					The code below draws heavily from this tutorial: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

*/

context = document.getElementById('whiteboard').getContext("2d");	
canvas = document.getElementById('whiteboard');

/* Colors */

var colors = {
	colorPurple : "#cb3594",
	colorGreen : "#659b41",
	colorYellow : "#ffcf33",
	colorBrown : "#986928",
};

var clickSize = new Array();
var curSize = "normal";

var curColor = colors[colorPurple];
var clickColor = new Array();
clickColor.push(curColor);



/* ! Basic functions: drawing stuff */

$('#whiteboard').mousedown(function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
		
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw();
});	

$('#whiteboard').mousemove(function(e){
	if(paint){
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	redraw();
	}
});

$('#whiteboard').mouseup(function(e){
	paint = false;
});

$('#whiteboard').mouseleave(function(e){
	paint = false;
});


var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging)
{
clickX.push(x);
clickY.push(y);
clickDrag.push(dragging);
clickSize.push(curSize);
}

function redraw(){
	canvas.width = canvas.width;
  context.beginPath();
  context.strokeStyle = curColor; 
  context.lineJoin = "round";
  context.lineWidth = 3;
			
  for(var i=0; i < clickX.length; i++)
  {		
    context.beginPath();
    if(clickDrag[i] && i){
      context.moveTo(clickX[i-1], clickY[i-1]);
     }else{
       context.moveTo(clickX[i]-1, clickY[i]);
     }
     context.lineTo(clickX[i], clickY[i]);
     context.closePath();
     context.lineWidth = radius;
     context.stroke();
  }

}	

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
  	canvas.width = canvas.width;  
    clickX = new Array(); 			//
    clickY = new Array(); 			// This bit prevents the canvas from "remembering" the previous state after being cleared. 	
    clickDrag = new Array(); 		//
}

/* Toolbox */

/* Clear */
$(function() {
	$("#toolEraser").click(function(){
		clearCanvas();	
		}
	);
});

/* Colors */
$(function() {
	$(".toolColor").click(function(){
		content = colors[$(this).attr("id")];
		var curColor = content;
		console.log(curColor);
	})
});
