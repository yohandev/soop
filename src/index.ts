import "../res/styles.css";
import Cursor from "./v4/Cursor";
import Workspace from "./v4/Workspace";
import DefineBlock from "./v4/DefineBlock";
import Editor from "./v4/Editor";
import Sprite from "./v4/Sprite";
import BlockEditor from "./v4/BlockEditor";

function init()
{
	paper.setup($("#editor")[0] as HTMLCanvasElement); // init paperjs
	
	Cursor.init();
	Editor.init();

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
	if (e.key == 'F3')
	{
		window.prompt("current block", BlockEditor.desc());
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