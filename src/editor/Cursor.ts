import Block from "./blocks/Block";
import { BlockEnvironment } from "./BlockEnvironment";

export namespace Cursor
{
    let dragging: Block | undefined;
    let start: paper.Point;

    export function init()
    {
        paper.project.view.onMouseUp = stop_drag;
    }

    export function drag(block: Block, e: paper.MouseEvent): boolean
    {
        if (dragging === undefined)
        {
            dragging = block;
            start = e.point;
        }
        else if (dragging !== block)
        {
            return false;
        }

        dragging.translate(e.delta.x, e.delta.y);

        return true;
    }

    function stop_drag(e: paper.MouseEvent)
    {
        if (dragging === undefined)
        {
            return;
        }
        
        const dist = e.point.getDistance(start);

        if (dist > 30)
        {
            if (dragging.separate())
            {
                BlockEnvironment.add(dragging);
            }
        }
        
        const near = BlockEnvironment.nearest(dragging);

        if (near)
        {
            dragging.join(near);

            BlockEnvironment.remove(dragging);
            BlockEnvironment.render();
        }

        dragging = undefined;
    }
}