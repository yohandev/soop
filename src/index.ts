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
import GoToBlock from "./v4/GoToBlock";

function init()
{
	setup($("#editor")[0] as HTMLCanvasElement); // init paperjs
	
	new GoToBlock().draw();

	// Cursor.init(); // init cursor
	// Background.init();
	// Palette.init();
	// Player.init();
	// BlockEnvironment.init();

	// BlockEnvironment.add(new DefineBlock());
	// BlockEnvironment.add(new DefineBlock());
	// BlockEnvironment.add(new SetXBlock())
	// BlockEnvironment.add(new SetYBlock())
	// BlockEnvironment.add(new SetXBlock())

	//COMMENTED OUT CODE BELOW IS DEV TOOL TO FIND WHICH VERTICES IN THE SVG PATHS HAVE TO DO WITH SCALING
	// const path = new Path(`M.5,4.5a4,4,0,0,1,4-4h8a5.2,5.2,0,0,1,4,2l4,4a5.2,5.2,0,0,0,4,2h12a5.2,5.2,0,0,0,4-2l4-4a5.2,5.2,0,0,1,4-2h131a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H48.5a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`);
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

	// view.draw();

	//view.onFrame = render;

}

window.onload = init;
window.onkeypress = (e: KeyboardEvent) =>
{
	if (e.key == 'o')
	{
		BlockEnvironment.add(new OrBlock());
	}
	if (e.key == 'm')
	{
		BlockEnvironment.add(new MultiplyBlock());
	}
	if (e.key == 'r')
	{
		Transpiler.Class("myClass");
	}
}