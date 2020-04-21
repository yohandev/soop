import { Path, Point, view, setup } from "paper"
import block from "./block";

function init()
{
	const canvas = document.getElementById("editor") as HTMLCanvasElement;

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