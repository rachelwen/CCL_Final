

let sketch = function(p){
    p.webcam;
    p.tracker;//
    p.fr;
    p.particles = [];
    p.w = 400;
    p.h = 400;

    p.setup = function(){
        p.webcam = p.createCapture({
            audio: false,
            video: {
                width: p.w,
                height: p.h
            }
        }, function () {
            console.log('webcam ready.')
        });
       p.webcam.elt.setAttribute('playsinline', '');
       p.cnv = p.createCanvas(p.w, p.h);
        p.x = (p.windowWidth - p.width) / 2;
        p.y = (p.windowHeight - p.height) / 2;
        p.cnv.position(p.x, p.y);
        p.webcam.size(p.w, p.h);
        p.webcam.hide();
    
        p.colorMode(p.HSB);
    
        p.fr = p.createP('');
        p.noCursor()
    
        
        //connect facetracking to web cam
        p.tracker = new clm.tracker();
        p.tracker.init();
        p.tracker.start(p.webcam.elt); // connects tracker
     
    }
    p.draw = function(){
        p.background(0, 86, 65);

        p.bowl();
        p.chopsticks(p.mouseX, p.mouseY)
    
    
        p.positions = p.tracker.getCurrentPosition();
        
    
        p.noFill();
        
    
        for (p.i = 0; p.i < p.positions.length; p.i++) {
    
            p.particle = new Particle(p.positions[p.i][0], p.positions[p.i][1]);
            p.particles.push(p.particle); //adds particle to particle array
        }
    
        for (p.j = p.particles.length - 1; p.j > 0; p.j--) { // two faces show up bc for loops starts at end
            p.particles[p.j].behaviors();
            p.particles[p.j].show();
            p.particles[p.j].update();
    
            if (p.particles.length > 71) { // if >0, stationary face will be hidden
                p.particles.splice(p.j, 1);
            }
    
        }

    }

    p.chopsticks = function(x,y){
        p.strokeWeight(5)
        p.stroke(0, 51, 35)
        p.line(p.x + 65, p.y - 30, p.x - 50, p.y + 40 - p.random(5))
        p.line(p.x + 70, p.y, p.x - 45, p.y + 40 + p.random(5))
    
    }

    p.bowl = function(){
        p.fill(0, 0, 20)
        p.noStroke()
        p.ellipse((-5 + p.width / 2), (5 + p.height / 2), p.w - 10, p.h - 10);
    
        p.strokeWeight(1);
    
        p.fill(0, 0, 90)
        p.stroke(0, 0, 80);
        p.ellipse(p.width / 2, p.height / 2, p.w - 15, p.h - 15);
    
    
    
        p.noFill()
        p.stroke(228, 69, 93);
        p.ellipse(p.width / 2, p.height / 2, p.w - 30, p.h - 30);
     
    
    
        p.fill(48, 99, 92)
        p.stroke(0, 0, 80);
        p.ellipse(p.width / 2, p.height / 2, p.w - 100, p.h - 100);
      
    }
}

let mainDish = new p5(sketch); //making the p5 sketch

