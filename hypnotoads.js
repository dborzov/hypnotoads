var c = document.getElementById("c");
// set up size to fill the page
c.height = 0.96*window.innerHeight;
c.width = 0.96*window.innerWidth;
var newx = c.width/2,
	newy = c.height/2;

var ctx = c.getContext("2d");


var snowflake = {
	x:Math.random()*c.width,
	y:Math.random()*c.height,
	radius:30
};


// a function to update the scene
function draw(){
	// select color
	ctx.fillStyle = "rgba(64,83,203,1)";
	// draw rectngle as a background
	ctx.fillRect(0, 0, c.width, c.height);

	//caption text
	// snowflakes
	ctx.beginPath();

	// 
	ctx.fillStyle = "rgba(255,255,255,0.9)";
	ctx.textAlign = 'center'
	ctx.font = 'italic 20pt Calibri';
	ctx.fillText('добро пожаловать на курс',0.5*c.width, 0.1*c.height);
	ctx.fillText('"Пишем Мобильные Приложения!"',0.5*c.width, 0.1*c.height+30);

	// draw snowflakes
	snowflake.y += ((newy- snowflake.y) >0) ? 0.8 : -0.8;
	snowflake.x += ((newx- snowflake.x) >0) ? 0.8 : -0.8;

	ctx.moveTo(snowflake.x,snowflake.y);
	ctx.arc(snowflake.x, snowflake.y ,30,0,Math.PI*2,true);
    ctx.fill();


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