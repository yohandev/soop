import { view, setup, Path, Point } from "paper"
import "../res/styles.css";
import SetXBlock from "./editor/blocks/motion/SetXBlock";
import SetYBlock from "./editor/blocks/motion/SetYBlock";
import { Cursor } from "./editor/Cursor";
import { BlockEnvironment } from "./editor/BlockEnvironment";

function init()
{
	setup($("#editor")[0] as HTMLCanvasElement); // init paperjs
	
	Cursor.init(); // init cursor
	BlockEnvironment.init();

	const a = new SetXBlock();
	const b = a.next(new SetYBlock());
	const c = b.next(new SetXBlock());

	a.render();
	// const myScript = new Script();

	// myScript.push(new DefineBlock(new SetXBlock()));
	// myScript.push(new SetXBlock());
	// myScript.push(new SetXBlock(new MultiplicationBlock(new AdditionBlock(new MultiplicationBlock()))));

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

	//view.onFrame = render;

}

window.onload = init;