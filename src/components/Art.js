import React, { Component } from "react";
import Sketch from "react-p5";

export default class Art extends Component {
  setup = (p5, canvasParentRef) => {
    let canv = p5.createCanvas(1000, 1000).parent(
      canvasParentRef
    );
    p5.frameRate(this.fr);

    // let canv = p5.createCanvas(1000, 1000);
    canv.mousePressed(this.setup);
    p5.background(150);
    p5.noLoop();  // disable looping so the draw function is only called once
    
    // add redraw function to run the whole script as if it were from the start
    p5.redraw();
  };

  drawVertLine = (p5, startX, startY) => {
    // p5.strokeCap(ROUND);
    
    let endX = p5.random(100, 900);
    let endY = startY + p5.random(50, 200);
    
    // Outline
    p5.stroke(0);
    p5.strokeWeight(105);
    p5.line(startX, startY, endX, endY);
  
    // Inline
    p5.stroke(p5.random(255), p5.random(255), p5.random(255));
    p5.strokeWeight(100);
    p5.line(startX, startY, endX, endY);
    
    // Start Dot
    const diameter = p5.random(20, 80);
    const dotColor = p5.color(p5.random(255), p5.random(255), p5.random(255));
  
    p5.stroke(0)
    p5.strokeWeight(4);
  
    if (p5.random(1) < 0.5) {
      // Tsp
      p5.noFill();
      p5.stroke(0);
    } else {
      // No tsp
      p5.fill(dotColor);
      p5.stroke(0);
    }
    p5.ellipse(startX, startY, diameter, diameter);
  
    if (p5.random(1) < 0.5) {
      // add a black dot at the center
      p5.stroke(0)
      p5.ellipse(startX, startY, 2, 2);
    }
    
    return [endX, endY];
  };

  draw = p5 => {
    // determine start and end points for the line
    let startX = p5.random(100, 900);
    let startY = p5.random(100, 200);
    
    let vars = [];
    
    while (startY < 700) {
      vars = this.drawVertLine(p5, startX, startY);
      startX = vars[0]
      startY = vars[1]
    }
  };

  render() {
    return <Sketch setup={this.setup} draw={this.draw} />;
  }
}
