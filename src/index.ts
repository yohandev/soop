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
import AndBlock from "./v4/AndBlock";
import DefineBlock from "./v4/DefineBlock";
import Editor from "./v4/Editor";

function init()
{
	paper.setup($("#editor")[0] as HTMLCanvasElement); // init paperjs
	
	Cursor.init();
	Editor.init();

	Workspace.active = new Workspace();
	
	Workspace.active.add(new GoToBlock());
	Workspace.active.add(new GoToBlock());
	Workspace.active.add(new GoToBlock());
	Workspace.active.add(new EqualsBlock());
	Workspace.active.add(new PositionXBlock());
	Workspace.active.add(new AndBlock());
	Workspace.active.add(new DefineBlock());

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
	// const path = new Path(`M.5,20.5a20,20,0,0,1,20-20h92a20,20,0,0,1,20,20v52a4,4,0,0,1-4,4h-80a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`);
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

window.onkeydown = (e: KeyboardEvent) =>
{
	if (e.key == 'F1')
	{
		Workspace.active.highlight_loose();
	}
	if (e.key == 'F2')
	{
		Workspace.active.unload();
	}
}

window.onkeyup = (e: KeyboardEvent) =>
{
	if (e.key == 'F1')
	{
		Workspace.active.unhighlight_loose();
	}
	if (e.key == 'F2')
	{
		Workspace.active.load();
	}
}