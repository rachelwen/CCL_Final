var webcam;
var tracker;//
//let features = null; // list of facial features
var w = 640;
var h = 480;
let mouth = [44, 61, 60, 59, 50, 58, 57, 56] // points of outside of mouth taken from reference
////www.auduno.com/clmtrackr/docs/reference.html
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

    //connect facetracking to web cam
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(webcam.elt); // connects tracker
    
}

function draw(){
    background(200);
    translate(width,0)// reflect video
    scale(-1,1);
    //image(webcam,0,0,w,h);
    var positions = tracker.getCurrentPosition();

    noFill();
    
    strokeWeight(5)
   
    for (var i = 0; i < positions.length; i++) {
        stroke(151)
        line(positions[i][0]-50, positions[i][1],positions[i][0]-10, positions[i][1]-75);
        stroke(0)
        line(positions[i][0]+50, positions[i][1],positions[i][0]+10, positions[i][1]-75);
    }


}