var webcam;
var tracker;//
let fr;
let particles = [];
//let features = null; // list of facial features
var w = 640;
var h = 480;
let mouth = [44, 61, 60, 59, 50, 58, 57, 56] // points of outside of mouth taken from reference
////www.auduno.com/clmtrackr/docs/reference.html
let prevPos = [];
function setup(){
    webcam = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('webcam ready.')
    });
    webcam.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    webcam.size(w, h);
    webcam.hide();
    
    colorMode(HSB);

   fr = createP('');
   

    //connect facetracking to web cam
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(webcam.elt); // connects tracker
    
}

function draw(){
    background(203, 56, 35);
    translate(width,0)// reflect video
    scale(-1,1);
   //image(webcam,0,0,w,h);

         var positions = tracker.getCurrentPosition();
    
    // if(frameCount%50 == 0){
    // var positions = tracker.getCurrentPosition();
    // prevPos = positions;
    // }else{
    //     positions = prevPos;
    // }

    noFill();
    //if(random(1)<0.1){ // makes face 'flashy'
    for (let i = positions.length-1; i > 0; i--) {
        //point(positions[i][0],positions[i][1])
      //  let dot = positions[i];
      
       let particle = new Particle(positions[i][0],positions[i][1]);
        particles.push(particle); 
        
     }
   // }
    for(let j = particles.length-1; j > 0; j-- ){
        
        particles[j].behaviors();
        particles[j].show();
        particles[j].update();
        
        // if(particles[j].toDelete()){
        //     // remove this particle
        //     particles.splice(j,1); // from coding train simple particle system tutorial
        // }
        if(particles.length > 71){ // if >0, stationary face will be hidden
            particles.splice(j,1);
        }
        
    }
   
    fr.html(floor(frameRate()));

}