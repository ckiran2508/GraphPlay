const { VectorDiff } = require('./vector')
const vector = require('./vector')


const particle = {
    id:null,
    mass:null,
    color:null,
    radius:null,
    position : null,
    velocity : null,
    acceleration: null,
    force:null,
    context:null,
    create(id,x,y,radius,color){
        let p = Object.create(this)
        p.id=id
        p.position=vector.create(x,y)
        p.radius=radius
        p.color=color
        p.velocity= vector.create(0,0)
        p.acceleration= vector.create(0,0)
        p.force = vector.create(0,0)
        p.mass=0
        return p
    }
}

particle.__proto__.move=function(){
        this.velocity.addTo(this.acceleration)
        this.position.addTo(this.velocity)
    },

    particle.__proto__.draw=function(context){
        context.beginPath();
        context.arc(this.position._x,this.position._y,this.radius,0,Math.PI*2, false);	
        context.fillStyle = this.color;
        context.fill();
        context.stroke()
        context.closePath();
    },

    particle.__proto__.elasticCollision=function(particle){
          
        if((this.position.distanceTo(particle.position) < (this.radius + particle.radius))){
            const normalVector = vector.VectorDiff(this.position,particle.position)
            const unitNormal =  normalVector.unitVector()
            const unitTangent = unitNormal.normalVector();
            const correction = unitNormal.scale2(this.radius + particle.radius)
            this.position = vector.VectorSum(particle.position,correction)

      const u1_vec = this.velocity;
      const u2_vec = particle.velocity;
      
      const u1_n = u1_vec.dotProduct(unitNormal);
      const u2_n = u2_vec.dotProduct(unitNormal);
      const u1_t = u1_vec.dotProduct(unitTangent);
      const u2_t = u2_vec.dotProduct(unitTangent);

      const m1 = this.mass
      const m2 = particle.mass
      const v1_n = u1_n * (m1-m2)/(m1+m2)  + u2_n * 2 * m2 / (m1+m2)
      const v2_n = u2_n * (m2-m1)/(m1+m2)  + u1_n * 2 * m1 / (m1+m2)

      const v1_n_vec = unitNormal.scale2(v1_n);
      const v2_n_vec = unitNormal.scale2(v2_n);
      const v1_t_vec = unitTangent.scale2(u1_t);
      const v2_t_vec = unitTangent.scale2(u2_t);
     
      this.velocity  = vector.VectorSum(v1_n_vec,v1_t_vec);
      particle.velocity = vector.VectorSum(v2_n_vec,v2_t_vec);
        }   
    },

    particle.__proto__.inverseSquareForce=function(particleArray){
     
        let netAcceleration = vector.create(0,0)
        for(let particle of particleArray){     
               if(this.id != particle.id){            
                   const dsquared = this.position.distanceToSquared(particle.position)  
                   const componentAcceleration = vector.create(0,0)
                   componentAcceleration.setLength(particle.mass/dsquared)
                   componentAcceleration.setAngle(this.position.angleTo(particle.position))
                   netAcceleration.addTo(componentAcceleration)                   
               }
        }     
        this.acceleration=netAcceleration
        this.force.setLength(this.acceleration.getLength() * this.mass)
        this.force.setAngle(this.acceleration.getAngle())
    },

    particle.__proto__.frictionForce=function(){

        return vector.create(0,0)
    }

    module.exports=particle