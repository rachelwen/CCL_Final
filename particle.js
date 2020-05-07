class Particle{
    constructor(x,y){
    this.pos = createVector(x,y);
    this.target = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 5;
    this.maxForce = 0.3; //controls how well the particle can return to its position
    this.alpha = 255;
    }

    update(){
        this.alpha -= 20; // fades out particles
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0); //acc accumulates forces, every frame needs to start from zero
    }

    show(){ 
        //mess with visual appearance here
        
        stroke(255,255,255,this.alpha);
        strokeWeight(5);
        point(this.pos.x,this.pos.y);
    }

    toDelete(){ //this looks to see if the alpha is less than zero
        return this.alpha < 0; 
    }

    behaviors(){ //function that makes particles go back to where they belong
        // let seek = this.seek(this.target);
        let arrive = this.arrive(this.target);
        this.applyForce(arrive); // 

    }

    applyForce(f){ 
        this.acc.add(f); //many forces at use, this adds them to the acceleration
    }

    seek(){
        //need to find vector from obj location to the place its seeking
        let desired = p5.Vector.sub(this.target,this.pos); //subtract to find vector that points from position to target
        desired.setMag(this.maxSpeed);
        //steering = desired - velocity:
        let steer = p5.Vector.sub(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    arrive(){ // same as seek() but differt desired magnitude
        let desired = p5.Vector.sub(this.target,this.pos); //subtract to find vector that points from position to target
        let d = desired.mag();
        let speed = this.maxSpeed;
        if (d < 100){
         speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired,this.vel);
        steer.limit(this.maxForce);
        return steer;
    }



}


