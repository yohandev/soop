import { Item, Path, Group } from "paper";

export namespace Player
{
    export const WIDTH = 480;
    export const HEIGHT  = 360;

    export let scene: Group

    export function init()
    {
        const w = paper.view.size.width;
        const h = paper.view.size.height;

        scene = new Group
        ([
            new Path.Rectangle({ x: w - WIDTH, y: 0, width: WIDTH, height: HEIGHT, fillColor: 'white', radius: 3 })
        ]);
        scene.scale(0.9, scene.bounds.topRight);
    }
}