
let canvas = document.querySelector('.canvas');
let context = canvas.getContext('2d');	// 获取canvas上下文
let using = false;
let eraserEnabled = false;

autoSetCanvas(canvas);
listenToUser();

eraser.onclick = function(){
	actions.className = 'actions x';
	eraserEnabled = true;
}
brush.onclick = function(){
	actions.className = 'actions';
	eraserEnabled = false;
}

function listenToUser(){
	let previousPoint = {x: undefined, y: undefined}
	
	if(document.body.ontouchstart !== undefined){
		// 触屏设备  检测是不是触屏设备，这个技术叫特性检测，我们检测的是特性，不是设备。
		canvas.ontouchstart = function(aaa){
			console.log('开始')	
			var x = aaa.touches[0].clientX
			var y = aaa.touches[0].clientY
			using = true
			if(eraserEnabled){
				context.clearRect(x-5,y-5,10,10)	
			}else{
				previousPoint = {x: x, y: y}
			}
		}
		canvas.ontouchmove = function(aaa){
			console.log('移动')	
			var x = aaa.touches[0].clientX
			var y = aaa.touches[0].clientY

			if(eraserEnabled){
				if(using === true){
					context.clearRect(x-5,y-5,10,10)	
				}
			}else{
				if(using === true){
					var	presentPoint = {x: x, y: y}
					drawLine(previousPoint.x, previousPoint.y, presentPoint.x, presentPoint.y)
					previousPoint = presentPoint
				}else{}
			}

		}
		canvas.ontouchend = function(aaa){
			console.log('结束')	
			using = false;
		}
	}else{
		// 非触屏设备	
		canvas.onmousedown = function(aaa){
			var x = aaa.clientX
			var y = aaa.clientY
			using = true
			if(eraserEnabled){
				context.clearRect(x-5,y-5,10,10)	
			}else{
				previousPoint = {x: x, y: y}
			}
		}
		
		canvas.onmousemove = function(aaa){
			var x = aaa.clientX
			var y = aaa.clientY

			if(eraserEnabled){
				if(using === true){
					context.clearRect(x-5,y-5,10,10)	
				}
			}else{
				if(using === true){
					var	presentPoint = {x: x, y: y}
					drawLine(previousPoint.x, previousPoint.y, presentPoint.x, presentPoint.y)
					previousPoint = presentPoint
				}else{}
			}
		}
		
		canvas.onmouseup = function(aaa){
			using = false;
		}

	}
	
	eraser.onclick = function(){
		eraserEnabled = !eraserEnabled
	}

}


function drawCircle(x,y,radius){
	context.beginPath();
	context.arc(x,y,radius,0,Math.PI*2);
	context.fill();
}

function drawLine(x1,y1,x2,y2){
	context.beginPath();
	context.moveTo(x1,y1);
	context.lineWidth = 3;
	context.lineTo(x2,y2);
	context.stroke();
	context.closePath();
}

function autoSetCanvas(){
	setPageWidth();
	window.onresize = function(){
		setPageWidth();
	}
	function setPageWidth(){
		let pageWidth = document.documentElement.clientWidth;
		let pageHeight = document.documentElement.clientHeight;
		canvas.width = pageWidth;
		canvas.height = pageHeight;
	}
}


