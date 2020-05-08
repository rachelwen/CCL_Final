class Particle{
    constructor(x,y){
    this.pos = createVector(x,y);
    this.target = createVector(x,y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector();
    this.maxSpeed = 5;
    this.maxForce = 0.1; //controls how well the particle can return to its position
    this.alpha = 255;
    }

    update(){
        this.alpha -= 20; // fades out particles
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0); //acc accumulates forces, every frame needs to start from zero
    }

    show(){ 
        stroke(random(35),random(40,80),80,this.alpha);
        strokeWeight(random(4,8));
        point(this.pos.x,this.pos.y);
    }

    toDelete(){ //this looks to see if the alpha is less than zero
        return this.alpha < 0; 
    }

    behaviors(){ //function that makes particles go back to where they belong
        // let seek = this.seek(this.target);
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive); 
        this.applyForce(flee);

    }

    applyForce(f){ 
        this.acc.add(f); //many forces at use, this adds them to the acceleration
    }
 

    arrive(target){ // same as seek() but differt desired magnitude
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

    flee(target){ //modified seek function to react to mouse
        //need to find vector from obj location to the place its seeking
        let desired = p5.Vector.sub(target,this.pos); //subtract to find vector that points from position to target
        let d = desired.mag();
        console.log('desired mag',d); 
        if (d < 50){ // particles only react to mouse when this close
            desired.mult(-1);
            desired.setMag(this.maxSpeed);
            
            console.log('mouse on face');
              // changes vector to go in opposite direction
             //steering = desired - velocity:
             let steer = p5.Vector.sub(desired, this.vel);
             steer.limit(this.maxForce);
             return steer;
        }else{
            return createVector(0,0);
        }
    }

    



}


