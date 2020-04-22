import { view, setup, Path, Point } from "paper"
import "../res/styles.css";
import DefineBlock from "./blocks/DefineBlock";
import SetXBlock from "./blocks/motion/SetXBlock";

function init()
{
	const canvas = document.getElementById("editor") as HTMLCanvasElement;

	canvas.classList.add('editor')

	setup($("#editor")[0] as HTMLCanvasElement);
	
	const blocks = [new DefineBlock(), new SetXBlock()]
	
	blocks.forEach(b => b.render());
	
	// COMMENTED OUT CODE BELOW IS DEV TOOL TO FIND WHICH VERTICES IN THE SVG PATHS HAVE TO DO WITH SCALING
	// const path = new Path(SVG_DATA);
	// path.fillColor = 'green';

	// let i = 0;
	// path.segments[i].point.selected = true;
	// window.onkeypress = (evt: KeyboardEvent) =>
	// {
	// 	if (evt.key == ' ')
	// 	{
	// 		path.segments[i].point.selected = false;
	// 		path.segments[++i].point.selected = true;

	// 		console.log(i);
	// 	}
	// }

	view.draw();

	view.onFrame = render;

}

function render()
{
	//console.log("one: " + one.graphics.position.y + "two: " + two.graphics.position.y);
}

window.onload = init;