/* 

Project: 				Whiteboard 
Author:					Daniel Quevedo
Company:				DEX
Description:		A whiteboard that allows for 2-way collaborative doodling, using HTML5.
Notes:					The code below draws heavily from this tutorial: http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/

*/

context = document.getElementById('whiteboard').getContext("2d");	
canvas = document.getElementById('whiteboard');

/* ! Basic functions: drawing stuff */
/* I wonder why changes take so long to apply */

$('#whiteboard').mousedown(function(e){
	var mouseX = e.pageX - this.offsetLeft;
	var mouseY = e.pageY - this.offsetTop;
		
	paint = true;
	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	//redraw();
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
}

function redraw(){
	canvas.width = canvas.width;
  context.beginPath();
  context.strokeStyle = "#df4b26";
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
     context.stroke();
  }
}	

function clearCanvas(){
    context.clearRect(0, 0, canvas.width, canvas.height);
  	canvas.width = canvas.width;  
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
}


$(function() {
	$("#toolEraser").click(function(){
		clearCanvas();	
		}
	);
});
