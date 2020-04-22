import { view, setup } from "paper"
import Block from "./Block";
import "../res/styles.css";
import SetXBlock from "./blocks/SetXBlock";
import SetYBlock from "./blocks/SetYBlock";
import GoToXYBlock from "./blocks/GoToXYBlock";
import MethodBlock from "./blocks/MethodBlock";

let one: Block, two: Block;

function init()
{
	const canvas = document.getElementById("editor") as HTMLCanvasElement;

	canvas.classList.add('editor')

	setup($("#editor")[0] as HTMLCanvasElement);

	one = new SetXBlock();
	two = new GoToXYBlock();
	new MethodBlock();

	view.draw();

	view.onFrame = render;

}

function render()
{
	//console.log("one: " + one.graphics.position.y + "two: " + two.graphics.position.y);
}

window.onload = init;