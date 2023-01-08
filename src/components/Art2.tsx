import React from "react";
import p5Types from "p5"; //Import this for typechecking and intellisense
import dynamic from 'next/dynamic'

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
	ssr: false,
})

interface ComponentProps {
	//Your component props
}

let x = 50;
const y = 50;

export const Art: React.FC<ComponentProps> = (props: ComponentProps) => {

	const setup = (p5: p5Types, canvasParentRef: Element) => {
		p5.noLoop();

		let canv = p5.createCanvas(1000, 1000).parent(
			canvasParentRef
		);
		p5.background(150);
		p5.smooth();

		canv.mousePressed(function () {
			p5.background(150);
			p5.redraw();
		});

		// canv.mousePressed(function () {
		// 	p5.noLoop();
		// 	p5.fadeOut(500, function () {
		// 		p5.background(150);
		// 		p5.redraw();
		// 		p5.fadeIn(500);
		// 	});
		// });

	};


	const drawVertLine = (p5: p5Types, startX: number, startY: number) => {
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


	const draw = (p5: p5Types) => {
		// determine start and end points for the line
		let startX = p5.random(100, 900);
		let startY = p5.random(100, 200);

		let vars = [];

		while (startY < 700) {
			vars = drawVertLine(p5, startX, startY);
			startX = vars[0]
			startY = vars[1]
		}
	};

	return <Sketch setup={setup} draw={draw} />;
};
