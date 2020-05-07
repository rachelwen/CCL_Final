var webcam;
var tracker;//
//let features = null; // list of facial features
let w = 640;
let h = 480;
let mouth = [44, 61, 60, 59, 50, 58, 57, 56] // points of outside of mouth taken from reference
////www.auduno.com/clmtrackr/docs/reference.html
function setup(){
    createCanvas(w,h);
    background(200);
    webcam = createCapture(VIDEO);
    webcam.size = (w,h);
    webcam.hide();

    //connect facetracking to web cam
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(webcam.elt); // connects tracker
    
}

function draw(){
    translate(width,0)// reflect video
    scale(-1,1);
    image(webcam,0,0,w,h);
    var features = tracker.getCurrentPosition();

    //https://editor.p5js.org/kylemcdonald/sketches/BJOcyD9hm 
    noFill();
    stroke(255);

    beginShape();
    for (var i = 0; i < features.length; i++) {
        vertex(features[i][0], features[i][1]);
    }
    endShape();


    // if(features.length > 0){
    //     let leftEye = features[27];
    //     let leftEyeX = leftEye[0];
    //     let leftEyeY = leftEye[1];

    //     let rightEye = features[32];
    //     let rightEyeX = rightEye[0];
    //     let rightEyeY = rightEye[1];
    //     console.log('detected');

    //     noFill();
    //     stroke(255)
    //     ellipse(leftEyeX,leftEyeY,25,25);
    //     ellipse(rightEyeX,rightEyeY,25,25);
    // }

}