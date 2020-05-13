class Particle {
    constructor(x, y) {
        //this.pos = createVector(x, y);
        this.pos = p5.Vector.random2D(); //particles fly in -> form stationary face
        this.prevPos = this.pos.copy();
        this.target = createVector(x, y); // =p5.Vector.random2D(); particles sucked out to top right of screen
         //this.target = p5.Vector.random2D();
       // this.target = this.prevPos;
        this.vel = p5.Vector.random2D();
        this.acc = createVector();

        this.maxSpeed = 10;
        this.maxForce = 0.5; //controls how well the particle can return to its position
        this.alpha = 255;
        this.characters = "一二三十木禾上下土个八入大天人火文六七儿九无口日";
        for(let i = 0; i < this.characters.length; i++){
            this.randomCharacter = this.characters[floor(random(this.characters.length))];
            return this.randomCharacter;
        }
       
        
        
    }

    update() {
         this.alpha -= 55; // fades out particles
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0); //acc accumulates forces, every frame needs to start from zero
        
    }

    show() {
       // this.hueVal = floor(random(35));
        this.satVal = floor(random(40,80));
        
        
        stroke(random(35),random(40,80), 50);
       
    
       // strokeWeight(random(4,8));
       strokeWeight(1)
       // line(this.pos.x, this.pos.y,this.prevPos.x,this.prevPos.y);
       this.updatePrev(); 
       noFill()
       //ellipse(this.pos.x,this.pos.y,5,5)
      
      // text(alphabet[randomLetter],this.pos.x,this.pos.y,20,20)
      text(this.randomCharacter,this.pos.x,this.pos.y,20,20)
       
       
        
    }

    toDelete() { //this looks to see if the alpha is less than zero
        return this.alpha < 0;
    }

    // randomLetter(){
    //     for(let i = 0; i < this.alphabet.length; i++){
    //         randomLetter = floor(random(alphabet.length));
    //         return this.alphabet[randomLetter];
    //     }
    // }
  
   

    updatePrev(){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
        
    }

    behaviors() { //function that makes particles go back to where they belong
        // let seek = this.seek(this.target);
        // let arrive = this.arrive(this.target);
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);
        let flee = this.flee(mouse);

        arrive.mult(1);
        flee.mult(5);

        this.applyForce(arrive);
        this.applyForce(flee);

    }

    applyForce(f) {
        this.acc.add(f); //many forces at use, this adds them to the acceleration
    }


    arrive(target) { // same as seek() but differt desired magnitude
        let desired = p5.Vector.sub(target, this.pos); //subtract to find vector that points from position to target
        let d = desired.mag();
        let speed = this.maxSpeed;
        if (d < 100) {
            speed = map(d, 0, 100, 0, this.maxSpeed);
        }
        desired.setMag(speed);
        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);
        return steer;
    }

    flee(target) { //modified seek function to react to mouse
        //need to find vector from obj location to the place its seeking
        let desired = p5.Vector.sub(target, this.pos); //subtract to find vector that points from position to target
        let d = desired.mag();
       
        if (d < 50) { // particles only react to mouse when this close
            desired.mult(-1);
            // push()
            //     fill(255)
            //     translate(width,0)
            //     scale(-1,1)
            //     text('hovered',100,100)
            // pop()
        
            desired.setMag(this.maxSpeed);
    
            // changes vector to go in opposite direction
            //steering = desired - velocity:
            let steer = p5.Vector.sub(desired, this.vel);
          //  let steer = p5.Vector.sub(desired, this.pos)
            steer.limit(this.maxForce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }





}


