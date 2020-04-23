import BlockBase from "./blocks/BlockBase";
import { Point } from "paper";

let currently_being_dragged: BlockBase | undefined;
let distance_dragged = 0;

export function start_dragging(block: BlockBase)
{
    if (!currently_being_dragged && block.draggable)
    {
        currently_being_dragged = block;
        distance_dragged = 0;
    }
}

export function stop_dragging(block: BlockBase)
{
    if (block === currently_being_dragged)
    {
        currently_being_dragged = undefined;

        if (distance_dragged > 30)
        {
            console.log('disconect');

            if ('previous' in block)
            {
                if ((block as any).previous)
                {
                    (block as any).previous.next = undefined;
                }
                (block as any).previous = undefined;
            }
        }
        distance_dragged = 0;
    }
}

window.onmousemove = (evt: MouseEvent) =>
{
    const x = evt.movementX;
    const y = evt.movementY;

    if (currently_being_dragged)
    {
        distance_dragged += Math.sqrt(x*x + y*y);

        if ('next' in currently_being_dragged)
        {
            let c: BlockBase = currently_being_dragged;

            while (c !== undefined)
            {
                c.graphics.translate(new Point(x, y));
                c = (c as any).next;
            }
        }
        else
        {
            currently_being_dragged.graphics.translate(new Point(x, y));
        }
    }
}