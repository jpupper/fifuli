var socket;

var col1;
var alfa1; 


var col2;
var size;
var mtime;
var speed;
var sizeSpeed;
var size;
var alpha;
var alphaBorder;
var alphaSize;
var maxamp;
var ampspeed;
var circularSpeed;
var cantidadPuntas;
var cantidadPolys;
var colorFase = 0.1;

var isBorder = true;
var isRandomValues = true;
var isMousePressed = false; 

var isOverGui = false;

var data = {
		x:0,
		y:0,
		c1:col1,
		c2:col2,
		t:mtime,
		s:0
	}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


function setup(){
	createCanvas(windowWidth, windowHeight);
	//socket = io.connect('http://localhost:3000');
	//socket = io.connect('https://fifuli.herokuapp.com');
	
	socket = io.connect();
	socket.on("mouse",newDrawing);	
	asignarValores();
	background(0);
}


function asignarValores(){
	
	//TODO RANDOM
	/*col1 = color(random(100),random(100,150),random(100,255));
	col2 = color(random(255),random(100,150),random(100));
	size = random(10,150);
	//bcol1 = color(random(100),random(100,150),random(100,255));
	//bcol2 = color(random(255),random(100,150),random(100));
	speed = random(0.001,0.001);
	sizeSpeed = random(1,100);
	linesiz = random(0,10);
	maxamp = random(30,150);*/
	
	
	//col1 = color(random(100),random(100,150),random(100,255));
	//col2 = color(random(255),random(100,150),random(100));
	alpha = random(255);
	col1 = color(random(255),random(255),random(255),alpha);
	col2 = color(random(255),random(255),random(255),alpha);
	circularSpeed = random(-5,5);
	size = random(10,30);
	//bcol1 = color(random(100),random(100,150),random(100,255));
	//bcol2 = color(random(255),random(100,150),random(100));
	speed = 0.001;
	ampspeed = random(1,2);
	sizeSpeed = random(1,20);
	linesiz = random(0,10);
	maxamp = random(10,30);
	cantidadPuntas = random(3,10);
	cantidadPolys = random(1,20);
	//cantidadPolys = 5;
	
	alphaBorder = random(255);
	borderSize = random(1,10);
}

function randomValues(){
	asignarValores();
	
		//col1 = color(document.getElementById("c1").value);
		//col2 = color(document.getElementById("c2").value);
		
		
		
	var r1= floor(red(col1));
	var g1= floor(green(col1));
	var b1= floor(blue(col1));
	
	var r2= floor(red(col2));
	var g2= floor(green(col2));
	var b2= floor(blue(col2));
	
	
	console.log("R1"+r1);
	document.getElementById("c1").value = rgba2hex("rgba("+r1+","+g1+","+b1+")");
	
	document.getElementById("c2").value = rgba2hex("rgba("+r2+","+g2+","+b2+")");
	//document.getElementById("c2").value = rgba2hex(col2);
	document.getElementById("alphaValue").value = alpha;
	document.getElementById("alphaValue").value = alpha;
	document.getElementById("maxSize").value = size;  
	document.getElementById("maxAmp").value = maxamp;
	document.getElementById("sizeSpeed").value = sizeSpeed;
	document.getElementById("ampSpeed").value = ampspeed;
	document.getElementById("circularSpeed").value = circularSpeed;
	document.getElementById("numPuntas").value = cantidadPuntas;
	document.getElementById("numCirculos").value = cantidadPolys;
			
}
function mouseReleased(){
	asignarValores();
	isMousePressed = false;
}
function keyPressed(){
	if(key == 'b'){
		cleanBackground();
	}
}
function mousePressed(){
	isMousePressed = true;
}
function mouseDragged(){
	
//	socket.emit('mouse',data);
	//dibujarCoso(data);
}
function newDrawing(data2){
	dibujarCoso(data2);
}
function cleanBackground(){
	background(0);
}


function dibujarCoso(_data){
	var cnt = floor(_data.cpolys);
	for(var i=0; i<cnt; i++){
		var a = map(i,0.0,cnt,0.0,PI*2.0);
			//a = millis()*0.01;
			a+=_data.cs*_data.t;
		var xx = Math.sin(a)*(sin(_data.t*_data.ap)*_data.ma+_data.ma) + _data.x;
			//xx = i*50+_data.x;
			
		var yy = Math.cos(a)*(sin(_data.t*_data.ap)*_data.ma+_data.ma) + _data.y;
			//yy = i*50+_data.y;
				
		//strokeWeight(linesiz);
		
		//stroke(lerpColor(_data.bc1,_data.bc2,sin(_data.t)*0.5+.5));
		//noStroke();
		//fill(lerpColor(_data.c1,_data.c2,(sin(_data.t)*0.5+.5)*i%2    ));
		
		var colf = color(lerpColor(_data.c1,_data.c2,sin(_data.t)*0.5+.5));
		
		var colf2 = color(lerpColor(_data.c1,_data.c2,sin(_data.t)*0.5+.5));
		if(i%2 == 0){
			colf = color(lerpColor(_data.c1,_data.c2,sin(_data.t+millis()*0.01)*0.5+.5));
			colf2  = color(lerpColor(_data.c2,_data.c1,sin(_data.t+millis()*0.01)*0.5+.5)); 
		}else{
			colf = color(lerpColor(_data.c2,_data.c1,sin(_data.t+millis()*0.01)*0.5+.5));
			colf2  = color(lerpColor(_data.c1,_data.c2,sin(_data.t+millis()*0.01)*0.5+.5));
		}
		
		colf2.setAlpha(_data.ab);
		
		strokeWeight(_data.bs);
		if(isBorder){
			stroke(colf2);
		}else{
			noStroke();
		}
		
		fill(colf);
		
		/*if(i%2 == 0){
			fill(0,alfa1);
		}else{
			fill(255,alfa1);
		}*/
		//ellipse(xx,yy,sin(_data.t*_data.sp)*_data.s+_data.s*2,sin(_data.t*_data.sp)*_data.s+_data.s*2);
		
		push();
		translate(xx,yy);
		rotate(a+PI);
		if(_data.cp> 6){
			ellipse(0,0,sin(_data.t*_data.sp)*_data.s+_data.s*2,sin(_data.t*_data.sp)*_data.s+_data.s*2)
		}else{
			polygon(0,0,sin(_data.t*_data.sp)*_data.s+_data.s*2,_data.cp,0);
		}
		pop();
	}
	
}

function draw(){
	//background(0);
	
	//fill(0,30);
	//rect(0,0,width,height);
	//col1 = document.getElementById("c1");
	//col2 = document.getElementById("c2");
	//console.log(document.getElementById("c1").value);
	if(!isRandomValues){
		col1 = color(document.getElementById("c1").value);
		col2 = color(document.getElementById("c2").value);
		col1.setAlpha(document.getElementById("alphaValue").value);
		col2.setAlpha(document.getElementById("alphaValue").value);
		size = document.getElementById("maxSize").value;
		maxamp = document.getElementById("maxAmp").value;
		sizeSpeed = document.getElementById("sizeSpeed").value;
		ampspeed = document.getElementById("ampSpeed").value;
		circularSpeed = document.getElementById("circularSpeed").value; 
		cantidadPuntas = document.getElementById("numPuntas").value; 
		cantidadPolys = document.getElementById("numCirculos").value; 
		alphaBorder   = document.getElementById("alphaBorder").value; 
		borderSize  = document.getElementById("borderSize").value;  
	}
	data = {
		x:mouseX,
		y:mouseY,
		c1:col1,
		c2:col2,
		t:mtime,
		s:size,
		sp:sizeSpeed,
		ma:maxamp,
		af1:alfa1,
		ap:ampspeed,
		cp:cantidadPuntas,
		cs:circularSpeed,
		cpolys:cantidadPolys,
		ab:alphaBorder,
		bs:borderSize
	}
	//background(51);
	//fill(0,1);
	//rect(0,0,width,height);
	mtime = millis()*speed;
	

		
   if (isMousePressed && !isOverGui) {
	    socket.emit('mouse',data);
    	dibujarCoso(data);
    } 
	
}

function polygon(x, y, radius, npoints,fase) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a+fase) * radius;
    let sy = y + sin(a+fase) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}



function changeBorder(){
	isBorder = !isBorder;
	if(isBorder){
		document.getElementById("changborder").value = "No Border";
	}else{
			document.getElementById("changborder").value = "Use Border";
	}
}


function rgba2hex(rgba) {
  rgba = rgba.match(
    /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
  );
  return rgba && rgba.length === 4
    ? "#" +
        ("0" + parseInt(rgba[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgba[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgba[3], 10).toString(16)).slice(-2)
    : "";
}

//console.log(rgba2hex('rgba(240, 240, 240, 0.5)'));


