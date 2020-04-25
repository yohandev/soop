import "../res/styles.css";
import { BlockEnvironment } from "./editor/BlockEnvironment";
import OrBlock from "./editor/blocks/operator/OrBlock";
import MultiplyBlock from "./editor/blocks/operator/MultiplyBlock";
import Transpiler from "./vm/Transpiler";
import GoToBlock from "./v4/GoToBlock";
import ReporterInputProp from "./v4/ReporterInputProp";
import PositionXBlock from "./v4/PositionXBlock";
import Cursor from "./v4/Cursor";
import { Path, Point } from "paper";
import Workspace from "./v4/Workspace";
import EqualsBlock from "./v4/EqualsBlock";

function init()
{
	paper.setup($("#editor")[0] as HTMLCanvasElement); // init paperjs
	
	Cursor.init();
	Workspace.active = new Workspace();
	
	Workspace.active.add(new GoToBlock());
	Workspace.active.add(new GoToBlock());
	Workspace.active.add(new GoToBlock());
	Workspace.active.add(new EqualsBlock());
	Workspace.active.add(new PositionXBlock());

	Workspace.active.load();

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
	// const path = new Path(`M20.5.5h45a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20h-45a20,20,0,0,1-20-20h0A20,20,0,0,1,20.5.5Z`);
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
	if (e.key == ' ')
	{
		Workspace.active.highlight_loose();
	}
}

window.onkeyup = (e: KeyboardEvent) =>
{
	if (e.key == ' ')
	{
		Workspace.active.unhighlight_loose();
	}
}