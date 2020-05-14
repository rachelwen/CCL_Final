var webcam;
var tracker;//
let fr;
let particles = [];
//let features = null; // list of facial features
var w = 400;
var h = 400;
let randomColor;
let randomLetter = [];
let mouth = [44, 61, 60, 59, 50, 58, 57, 56] // points of outside of mouth taken from reference
////www.auduno.com/clmtrackr/docs/reference.html
let prevPos = [];
// let alphabet = "abcdefghijklmnopqrstuvwxyz";
let alphabet;
let backgroundImage;


function setup() {
    backgroundImage = loadImage('sqplate.png');
    webcam = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function () {
        console.log('webcam ready.')
    });
    webcam.elt.setAttribute('playsinline', '');
    let cnv = createCanvas(w, h);
    let x = (windowWidth - width) / 2;
    let y = (windowHeight - height) / 2;
    cnv.position(x, y);
    // cnv.style('z-index','-1');
    webcam.size(w, h);
    webcam.hide();

    colorMode(HSB);

    fr = createP('');
    noCursor()

    //     for(let i = 0; i < alphabet.length; i++){
    //         randomLetter = floor(random(alphabet.length));
    //    }

    //connect facetracking to web cam
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(webcam.elt); // connects tracker
    randomColor = floor(random(30, 360));







}

function draw() {


    //background(203, 56, 35);
    background(0, 86, 65);
    //image(backgroundImage,0,0,w,h);

    bowl();
    if(mouseX > 0 && mouseX < w && mouseY >0 && mouseY < h){
        chopsticks(mouseX, mouseY);
      }


    // translate(width,0)// reflect video
    // scale(-1,1);
    //image(webcam,0,0,w,h);

    var positions = tracker.getCurrentPosition();
    // if(frameCount % 100 == 0){
    //     tracker.reset();
    // }
    // if(frameCount%50 == 0){
    // var positions = tracker.getCurrentPosition();
    // prevPos = positions;
    // }else{
    //     positions = prevPos;
    // }

   // noFill();
    //if(random(1)<0.1){ // makes face 'flashy'

    for (let i = positions.length-1; i > 0; i--) {


        let particle = new Particle(positions[i][0], positions[i][1]);
        particles.push(particle); //adds particle to particle array

        // ellipse(positions[62][0],positions[62][0],200,20);

    }





    // }
    for (let j =0; j <  particles.length; j++) { // two faces show up bc for loops starts at end


        particles[j].behaviors();
        particles[j].show();
        particles[j].update();





        // if(particles[j].toDelete()){
        //     // remove this particle
        //     particles.splice(j,1); // from coding train simple particle system tutorial
        // }
        if (particles.length > 71) { // if >0, stationary face will be hidden
            particles.splice(j, 1);

        }

        //if(millis() > 3000){
        //tracker.stop(webcam.elt)
        //particles.splice(j,1);
        // }

    }
   // fr.html(floor(frameRate()));

}

function chopsticks(x, y) {
    strokeWeight(5)
    stroke(0, 51, 35)
    line(x + 65, y - 30, x - 50, y + 40 - random(5))
    line(x + 70, y, x - 45, y + 40 + random(5))

}

function stick(x, y) {
    strokeWeight(4)
    stroke(0, 51, 35)
    line(x, y - 5, x - 50, y + 40)
    push()
    beginShape()
    noStroke()
    fill('green');
    vertex(x - 10, y + 0)
    vertex(x - 15, y - 10)
    vertex(x - 20, y + 10)
    endShape()
    pop()
}

function bowl() {

    push()
    fill(0, 0, 20)
    noStroke()
    ellipse((-5 + width / 2), (5 + height / 2), w - 10, h - 10);
    pop();
    strokeWeight(1);
    push()
    fill(0, 0, 90)
    stroke(0, 0, 80);
    ellipse(width / 2, height / 2, w - 15, h - 15);
    pop()

    push()
    noFill()
    stroke(228, 69, 93);
    ellipse(width / 2, height / 2, w - 30, h - 30);
    pop()

    push()
    fill(48, 99, 92)
    stroke(0, 0, 80);
    ellipse(width / 2, height / 2, w - 100, h - 100);
    pop()

}

