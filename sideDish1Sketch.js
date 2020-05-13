let w = 200;
let h = 200;

function setup(){
    let cnv = createCanvas(w, h);
    let x = (windowWidth - width) / 3;
    let y = (windowHeight - height) / 3;
    cnv.position(x, y);
}
function draw(){
    background(0,0,100);
}