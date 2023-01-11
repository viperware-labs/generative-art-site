import React from "react";

import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

// Will only import `react-p5` on client-side
const p5 = dynamic(() => import('p5').then((mod) => mod.default), {
  ssr: false,
})

export const Flows = (props) => {

  let dimensions = props.dimensions;
  let colors = props.colors;
  const artWidth = 880;

  const lineWeight = 8;
  const lineStroke = 0;

  function completePuzzle(p5, array, colors) {
    console.log("start");
    const queue = [];
    const directions = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ];

    // Find all of the starting points for the colors
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (array[i][j] !== 0) {
          queue.push([i, j, array[i][j]]);
        }
      }
    }

    // While there are still empty spaces in the puzzle,
    // find the next available spot and fill it with the correct piece
    while (queue.length > 0) {
      const [x, y, val] = queue.shift();
      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < array.length && ny >= 0 && ny < array[nx].length && array[nx][ny] === 0) {
          array[nx][ny] = val;
          queue.push([nx, ny, val]);
        }
      }
    }

    return array;
  }

  function generateArray(p5, dimensions, colors) {

    // Create an empty array to represent the puzzle
    const puzzle = [];
    for (let i = 0; i < dimensions; i++) {
      puzzle.push([]);
      for (let j = 0; j < dimensions; j++) {
        puzzle[i].push(0);
      }
    }

    // Generate a set of random starting points
    const starts = new Set();
    while (starts.size < colors) {
      starts.add([Math.floor(Math.random() * dimensions), Math.floor(Math.random() * dimensions)]);
    }

    // Place the colors on the board
    let current = 1;
    for (const start of starts) {
      let x = start[0];
      let y = start[1];
      puzzle[x][y] = current;
      current++;
    }

    return puzzle;
  }

  const setup = (p5, canvasParentRef) => {
    p5.noLoop();

    const canv = p5
      .createCanvas(artWidth + 100, artWidth + 100)
      .parent(canvasParentRef);
    p5.background(150);
    p5.smooth();

    canv.mousePressed(function () {
      p5.background(150);
      p5.redraw();
    });
  };

  const draw = (p5) => {

    // Generate a random color for each section
    let sectionColors = [];
    for (let i = 0; i < colors; i++) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      sectionColors.push([r, g, b]);
    }
  
    let puzzle = generateArray(p5, dimensions, colors);
    const solution = completePuzzle(p5, puzzle, colors);
    
    p5.noStroke();

    for (let i = 0; i < dimensions; i++) {
      for (let j = 0; j < dimensions; j++) {
        // Draw Squares
        let index = i * dimensions + j;
        let x = (artWidth / dimensions) * j + 50;
        let y = (artWidth / dimensions) * i + 50;
        p5.noStroke();
        p5.fill(sectionColors[solution[i][j] - 1]);
        p5.rect(x, y, artWidth / dimensions, artWidth / dimensions);
      }
    }

    for (let i = 0; i < dimensions; i++) {
      for (let j = 0; j < dimensions; j++) {
        // Draw Lines
        let index = i * dimensions + j;
        let x = (artWidth / dimensions) * j + 50;
        let y = (artWidth / dimensions) * i + 50;
        p5.strokeWeight(lineWeight);
        p5.stroke(lineStroke);
        if (j > 0 && j < dimensions) {
          if ((solution[i][j] != solution[i][j - 1])) {
            // console.log(i, j)
            p5.line(x, y, x, y + (artWidth / dimensions));
          }
        }
        if (i > 0 && i < dimensions) {
          if ((solution[i][j] != solution[i - 1][j])) {
            // console.log(i, j)
            p5.line(x, y, x + (artWidth / dimensions), y);
          }
        }
      }
    }

    // Outline
    p5.noFill();
    p5.rect(50, 50, artWidth, artWidth, 3);
  };

  return <Sketch setup={setup} draw={draw} />;
};
