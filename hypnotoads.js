var c = document.getElementById("c");
// set up size to fill the page
c.height = 0.95*window.innerHeight;
c.width = 0.95*window.innerWidth;


var ctx = c.getContext("2d");

var snowflake_number = 20;
var snowflakes = [];

for(var i=0; i< snowflake_number; i++){
  snowflakes.push({
  	x:Math.random()*c.width,
  	y:Math.random()*c.height
  })
}

// a function to update the scene
function draw(){
	i++;
	if (i>c.height) {
		i=0;
	}
	ctx.fillStyle = "rgba(64,83,203,1)";
	ctx.fillRect(0, 0, c.width, c.height);
	//caption text
	ctx.fillStyle = "rgba(255,255,255,0.9)";
	ctx.fillText('EVERYBODY LOVES HYPNOTOAD',0.5*c.width, i);
	// snowflakes
	ctx.beginPath();
	for(var j=0;j<snowflake_number; j++){
		var p = snowflakes[j];
		ctx.moveTo(p.x,p.y);
		ctx.arc(p.x,p.y,15,0,Math.PI*2,true);
	}
	ctx.fill()
}

var i = 0;
setInterval(draw,33);