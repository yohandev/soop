import BlockBase from "./blocks/BlockBase";
import { Point } from "paper";

let currently_being_dragged: BlockBase | undefined;

export function start_dragging(block: BlockBase)
{
    if (!currently_being_dragged && block.draggable)
    {
        currently_being_dragged = block;
    }
}

export function stop_dragging(block: BlockBase)
{
    if (block === currently_being_dragged)
    {
        currently_being_dragged = undefined;
    }
}

window.onmousemove = (evt: MouseEvent) =>
{
    if (currently_being_dragged)
    {
        if ('next' in currently_being_dragged)
        {
            let c: BlockBase = currently_being_dragged;

            while (c !== undefined)
            {
                c.graphics.translate(new Point(evt.movementX, evt.movementY));
                c = (c as any).next;
            }
        }
        else
        {
            currently_being_dragged.graphics.translate(new Point(evt.movementX, evt.movementY));
        }
    }
}