
const vector = require('../lib/vector')
const particle = require('../lib/particle')
require('../assets/styles/index.css')
const randomNumberBetween = require('../lib/util')



const canvas = document.getElementById('arena');
const context = canvas.getContext('2d');

const width=850
const height=550
canvas.style.width = width + "px";
canvas.style.height = height + "px";

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = Math.floor(width * scale);
canvas.height = Math.floor(height * scale);

// Normalize coordinate system to use css pixels.
context.scale(scale, scale);



canvas.addEventListener('mousedown',function(event){

  isMouseUp=false
  const rect = canvas.getBoundingClientRect();
   line.x1 = event.clientX - rect.left.toFixed(0)
   line.y1 = event.clientY - rect.top.toFixed(0)  
   line.x2 = event.clientX - rect.left.toFixed(0)
   line.y2 = event.clientY - rect.top.toFixed(0)   
  tempParticle = particle.create(id++,line.x1,line.y1,15,'lightblue')
})

canvas.addEventListener('mousemove',function(event){
  if(!isMouseUp){
    const rect = canvas.getBoundingClientRect();
    line.x2 = event.clientX - rect.left.toFixed(0)
    line.y2 = event.clientY - rect.top.toFixed(0)
  }
  })

   canvas.addEventListener('mouseup',function(event){
    isMouseUp=true;
    tempParticle.velocity = vector.create((line.x1-line.x2)/10,(line.y1-line.y2)/10)
    tempParticle.mass=3
    line.x1 = 0
    line.y1 = 0
    line.x2 = 0
    line.y2 = 0  
    particles.push(tempParticle);
    tempParticle=null;
  })


document.getElementById('play-pause').addEventListener('click',function(){
      isPlay=!isPlay
      if(isPlay){   
        document.getElementById('play-pause').innerText='Pause'
      }
      else{
        document.getElementById('play-pause').innerText='Play'
      }    
})


document.getElementById('show-vector').addEventListener('click',function(){

  showVector=!showVector
  if(showVector){   
    document.getElementById('show-vector').innerText='Hide Vectors'
  }
  else{
    document.getElementById('show-vector').innerText='Show Vectors'
  }    
})






var id=0
var particles=[]
var isPlay=true
var showVector=false
var sun = particle.create(id++,430,250,30,'orange')
var earth = particle.create(id++,230,265,15,'lightblue')
sun.mass=3000
earth.mass=3
earth.velocity=vector.create(0,4)
particles.push(sun)
particles.push(earth)

var line={
  x1:0,
  y1:0,
  x2:0,
  y2:0
}
var tempParticle
var isMouseUp=true


function moveParticles(){
  for(let particle of particles){
    particle.move()
}
}

function resolveForces(){ 
      for(let particle of particles){
      particle.inverseSquareForce(particles)
      }
}

function elasticCollision(){
  for (let i = 0; i < particles.length; i++) {
    const current = particles[i];
    const rest =  particles.slice(i + 1);
    if(Array.isArray(rest)){
    for (let p of rest) {
      p.elasticCollision(current);
    }
  }
  }
}

function drawParticles(){
  for(let particle of particles){
      particle.draw(context)
  }
}

const veclocityVector = vector.create(50,0)
const accelerationVector = vector.create(50,0)

function drawVectors(){
  for(let particle of particles){
    if(particle.id!=0){
    particle.velocity.arrowVector(context,particle.position._x,particle.position._y,10,'black')
    }
    particle.force.arrowVector(context,particle.position._x,particle.position._y,100,'green')
  }
  veclocityVector.arrowVector(context,720,500,1,'black')
  accelerationVector.arrowVector(context,720,470,1,'green')
  context.fillStyle='black'
  context.fillText('Gravity Vector',780,473)
  context.fillText('Velocity Vector',780,503)
}

 function drawLine(){
  context.beginPath()
  context.moveTo(line.x1,line.y1)
  context.lineTo(line.x2,line.y2)
  context.strokeStyle='black'
  context.stroke()
  context.closePath()
}

 function drawtempParticle(){
  if(tempParticle!=null){
  tempParticle.draw(context)
  }
}





function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height)
   
    if(isPlay){
      resolveForces()
      elasticCollision()
      moveParticles()
    }  
    drawParticles()
    if(showVector){
      drawVectors()    
     }
     drawLine()
     drawtempParticle()
    requestAnimationFrame(animate)
}
  animate();
  