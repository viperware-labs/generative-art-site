function setup() {
    let canv = createCanvas(1000, 1000);
    canv.mousePressed(setup);
    background(150);
    noLoop();  // disable looping so the draw function is only called once

    // add redraw function to run the whole script as if it were from the start
    redraw();
}

function drawVertLine(startX, startY) {
    strokeCap(ROUND);

    let endX = random(100, 900);
    let endY = startY + random(50, 200);

    // Outline
    stroke(0);
    strokeWeight(105);
    line(startX, startY, endX, endY);

    // Inline
    stroke(random(255), random(255), random(255));
    strokeWeight(100);
    line(startX, startY, endX, endY);

    // Start Dot
    const diameter = random(20, 80);
    const dotColor = color(random(255), random(255), random(255));

    stroke(0)
    strokeWeight(4);

    if (random(1) < 0.5) {
        // Tsp
        noFill();
        stroke(0);
    } else {
        // No tsp
        fill(dotColor);
        stroke(0);
    }
    ellipse(startX, startY, diameter, diameter);

    if (random(1) < 0.5) {
        // add a black dot at the center
        stroke(0)
        ellipse(startX, startY, 2, 2);
    }

    return [endX, endY];
}

function draw() {

    // determine start and end points for the line
    let startX = random(100, 900);
    let startY = random(100, 200);

    let vars = [];

    while (startY < 700) {
        vars = drawVertLine(startX, startY);
        startX = vars[0]
        startY = vars[1]
    }

}
