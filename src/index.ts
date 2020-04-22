import { view, setup } from "paper"
import block from "./block";
import "../res/styles.css";

function init()
{
	const canvas = document.getElementById("editor") as HTMLCanvasElement;

	canvas.classList.add('editor')

	setup($("#editor")[0] as HTMLCanvasElement);

	new block();

	view.draw();

	view.onFrame = render;

}

function render()
{
	console.log("rendering...");
}

window.onload = init;