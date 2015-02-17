var c = document.getElementById("c");
// set up size to fill the page
c.height = 0.95*window.innerHeight;
c.width = 0.95*window.innerWidth;
var imageObj = new Image();
imageObj.src = 'owl1.png';

var ctx = c.getContext("2d");
var newx = 0.5*c.width;
var newy = 0;

var snowflake_number = 180;
var progress_counter = 0; // keeps track of how decorated the tree is
var snowflakes = [];

for(var i=0; i< snowflake_number; i++){
  snowflakes.push({
  	x:Math.random()*c.width,
  	y:Math.random()*c.height,
  	radius:3,
  	wiggle: 3+Math.random()*6,
  	angle: Math.random()*Math.PI*2,
  	tangled: 0
  })
}

var christmas_tree_number = 180;
var christmas_tree_indent = 0.4*c.height;
var christmas_tree_scale = 10;
var christmas_tree = [];

for(var i=0; i < christmas_tree_number; i++)
{
	var position = 0.2*i; 
	christmas_tree.push({
		y: christmas_tree_indent + christmas_tree_scale*position,
		x: 0.5* c.width + 0.5*christmas_tree_scale*position*Math.cos(position),
		mirking: 1+Math.random()*2.,
		timer: Math.random()*Math.PI*2
	})
}

// a function to update the scene
function draw(){
	var red_component = 64 - progress_counter;
	var green_component = 83 - progress_counter;
	var blue_component = 203 - progress_counter;
	ctx.fillStyle = "rgba("+red_component+","+green_component+","+blue_component+",1)";
	ctx.fillRect(0, 0, c.width, c.height);
	//caption text
	// snowflakes
	ctx.beginPath();

	// draw christmas tree
	for(var j=0;j<christmas_tree_number;j++){
	  ctx.strokeStyle = "rgba(44,132,50,1.0)";
	  christmas_tree[j].timer += 0.02;
	  ctx.quadraticCurveTo(0.5* c.width, christmas_tree[j].y,christmas_tree[j].x,christmas_tree[j].y);
	}
	//draw yellow tree christmas lights
	ctx.moveTo(christmas_tree[0].x,christmas_tree[0].y)
	ctx.stroke();
	ctx.beginPath();
	for(var j=0;j<christmas_tree_number;j++){
	  ctx.fillStyle = "rgba(255,255,50,1.0)";
	  christmas_tree[j].timer += 0.02;
	  ctx.moveTo(0.5* c.width, christmas_tree[j].y,christmas_tree[j].x,christmas_tree[j].y);
	  ctx.arc(christmas_tree[j].x,christmas_tree[j].y,christmas_tree[j].mirking*(1.1+Math.cos(christmas_tree[j].timer)),0,Math.PI*2,true);	
	}
	ctx.fill();
	ctx.beginPath();

	ctx.fillStyle = "rgba(255,255,255,0.9)";
	ctx.textAlign = 'center'
	ctx.font = 'italic 20pt Calibri';
	if (progress_counter<70) {
	ctx.fillText('добро пожаловать на курс',0.5*c.width, 0.1*c.height);
	ctx.fillText('"Пишем Мобильные Приложения!"',0.5*c.width, 0.1*c.height+30);
	ctx.fillText('(мышкой можно вешать снежинки на дерево)',0.5*c.width, 0.1*c.height+60);
    } else if (progress_counter<90){
	ctx.fillText('Уууу темнеет наступает ночь',0.5*c.width, 0.1*c.height);
    } 

    if (progress_counter>100) {
    ctx.fillStyle = "rgba(150,140,140,1.0)";
	ctx.font = 'italic 50pt Calibri';
	ctx.fillText('Happy holidays!',0.5*c.width, 0.1*c.height);
	ctx.font = 'italic 30pt Calibri';
	ctx.fillText('hey, look, an owl',0.5*c.width, 0.1*c.height + 60);
   }    

	//ctx.fillStyle = "rgba(255,255,255,1.0)";
	for(var j=0;j<snowflake_number; j++){
		if (snowflakes[j].tangled==0){
		snowflakes[j].y +=0.8;
		snowflakes[j].angle += 0.02;
		if (snowflakes[j].y > christmas_tree_indent && Math.abs(snowflakes[j].x - 0.5* c.width)<400) {
			parameter = (snowflakes[j].y - christmas_tree_indent)/christmas_tree_scale;
			if (Math.abs(snowflakes[j].x - 0.5* c.width) < Math.abs(0.5*christmas_tree_scale*parameter*Math.cos(parameter))){
			    if (Math.random()<0.2){
			      snowflakes[j].tangled = 2;
			      progress_counter ++;
			      snowflakes[j].radius = 7;
			    }
		    }
		}
	    }

		var p = snowflakes[j];
		ctx.moveTo(p.x,p.y);
		ctx.arc(p.x + p.wiggle*Math.cos(p.angle),p.y  + p.wiggle*Math.sin(p.angle),p.radius,0,Math.PI*2,true);
	if (p.y > c.height) { // snowflake reaches the screen bottom
		if (Math.random()<0.3){
		   snowflakes[j].y=newy;
		   snowflakes[j].x=newx;
		   snowflakes[j].radius= 5;
	    } else {
           snowflakes[j].y = 0;
		   snowflakes[j].x = Math.random()*c.width;
	    }
	}


    }
	ctx.fill()

	if (progress_counter>100) {
    ctx.drawImage(imageObj, 0.5* c.width-40, 0.5* c.height-100);
   }  
}

var i = 0;
console.log("Happy new year to you too, my dear console dwellers! :)")
setInterval(draw,33);

function onMouseMove(evt) {
  if (evt.pageX > 0 && evt.pageX < c.width) {
    newx = evt.pageX;
    newy = evt.pageY;
  }
}

$(document).mousemove(onMouseMove);