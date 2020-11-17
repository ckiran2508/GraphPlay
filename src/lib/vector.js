const vector ={
  
    _x:0,
    _y:0,

    create(x,y){
        let v = Object.create(this)
        v._x = x
        v._y = y
        return v
    }
}
    vector.__proto__.setX=function(x){
        this._x = x
    },

    vector.__proto__.setY=function(y){
        this._y = y
    },

    vector.__proto__.getX=function(){
        return this._x
    },

    vector.__proto__.getY=function(){
        return this._y
    },
    
    vector.__proto__.setLength=function(l){
        var dir = this.getAngle()
        this._x = l * Math.cos(dir)
        this._y = l * Math.sin(dir)
    },

    vector.__proto__.setAngle=function(a){
        var length = this.getLength()
        this._x = length * Math.cos(a)
        this._y = length * Math.sin(a)
    },

    vector.__proto__.getLength=function(){
        return Math.sqrt( this._x * this._x  + this._y * this._y)
    },

    vector.__proto__.getAngle=function(){
        return Math.atan2(this._y, this._x)
    },

    vector.__proto__.scale=function(value){
          this._x= this._x * value
          this._y= this._y * value
    },

    vector.__proto__.distanceTo=function(v){
        let dx = v._x - this._x
        let dy = v._y - this._y
        return Math.sqrt(dx * dx + dy * dy)
    },

    vector.__proto__.distanceToSquared=function(v){
        let dx = v._x - this._x
        let dy = v._y - this._y
        return (dx*dx + dy*dy)
    },

    vector.__proto__.angleTo=function(v){
        let dx = v._x - this._x
        let dy = v._y - this._y
        return Math.atan2(dy,dx)
    },

    vector.__proto__.addTo=function(v){
        this._x+=v._x
        this._y+=v._y
    },
    
    vector.__proto__.normalVector=function(){
        return vector.create(-this._y,this._x)
    },

    vector.__proto__.unitVector=function(){
        const v = vector.create(this._x,this._y)
        v.setLength(1)
        return v
    },

    vector.__proto__.scale=function(value){
     this._x= this._x * value
     this._y= this._y * value
    },

    vector.__proto__.scale2=function(value){
        return vector.create(this._x * value, this._y * value)
    },

    vector.__proto__.div=function(value){
        this._x= this._x / value
        this._y= this._y / value
    },

    vector.__proto__.div2=function(value){
        return vector.create(this._x/value,this._y/value)
    },

    vector.__proto__.dotProduct = function(vec){
        return this._x * vec._x + this._y * vec._y
    },

    vector.__proto__.VectorSum=function(v1,v2){
        let vec = vector.create(0,0)
        vec._x = v1._x + v2._x
        vec._y = v1._y + v2._y
        return vec
    },

    vector.__proto__.VectorDiff=function(v1,v2){
        let vec = vector.create(0,0)
        vec._x = v1._x - v2._x
        vec._y = v1._y - v2._y 
        return vec
    },

    vector.__proto__.angleBetween=function(v){
       let diff = v.getAngle() - this.getAngle()
       return diff
    },

    vector.__proto__.lineVector = function(c,x,y,scale,color){
        const unit_vector = vector.create(0,1)
        unit_vector.setAngle(this.getAngle());
        unit_vector.setX(scale*this.getX());
        unit_vector.setY(scale*this.getY());
        let head_x=x+unit_vector.getX()
        let head_y=y+unit_vector.getY()
        c.beginPath();
        c.moveTo(x,y);
        c.lineTo(head_x,head_y);
        c.strokeStyle = color;
        c.stroke();
        c.closePath();
        c.strokeStyle = "black";
      }
      
      vector.__proto__.arrowVector = function(c,x,y,scale,color){
       
            this.lineVector(c,x,y,scale,color)
            let head_x = x+ (this.getX() * scale)
            let head_y = y+ (this.getY() * scale)
            let top_vector = vector.create(7,0)
            let bottom_vector = vector.create(7,0)
            bottom_vector.setAngle(this.getAngle() + 2.35)
            top_vector.setAngle(this.getAngle() - 2.35) 
            top_vector.lineVector(c,head_x,head_y,1,color)
            bottom_vector.lineVector(c,head_x,head_y,1,color)
            
          }

    vector.__proto__.rotateVector= function(angle){
        const x = this._x * Math.cos(angle) - this._y * Math.sin(angle)
        const y = this._x * Math.sin(angle) + this._y * Math.cos(angle)
        return vector.create(x,y)
    }

module.exports=vector