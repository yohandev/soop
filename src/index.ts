import { view, setup, Path, Point } from "paper"
import "../res/styles.css";
import SetXBlock from "./editor/blocks/motion/SetXBlock";
import SetYBlock from "./editor/blocks/motion/SetYBlock";
import { Cursor } from "./editor/Cursor";
import { BlockEnvironment } from "./editor/BlockEnvironment";
import OrBlock from "./editor/blocks/operator/OrBlock";
import MultiplyBlock from "./editor/blocks/operator/MultiplyBlock";
import DefineBlock from "./editor/blocks/object/DefineBlock";
import Transpiler from "./vm/Transpiler";
import { Palette } from "./editor/Palette";
import { Background } from "./editor/Background";
import { Player } from "./vm/Player";

function init()
{
	setup($("#editor")[0] as HTMLCanvasElement); // init paperjs
	
	Cursor.init(); // init cursor
	Background.init();
	Palette.init();
	Player.init();
	BlockEnvironment.init();

	BlockEnvironment.add(new DefineBlock());
	BlockEnvironment.add(new DefineBlock());
	BlockEnvironment.add(new SetXBlock())
	BlockEnvironment.add(new SetYBlock())
	BlockEnvironment.add(new SetXBlock())

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
window.onkeypress = (e: KeyboardEvent) =>
{
	if (e.key == ' ')
	{
		BlockEnvironment.add(new OrBlock());
	}
	if (e.key == 'a')
	{
		BlockEnvironment.add(new MultiplyBlock());
	}
	if (e.key == 'r')
	{
		Transpiler.Class("myClass");
	}
}