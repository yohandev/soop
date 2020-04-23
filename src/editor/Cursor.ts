import Block from "./blocks/Block";

export namespace Cursor
{
    let dragging: Block | undefined;

    export function init()
    {
        paper.project.view.onMouseUp = stop_drag;
    }

    export function drag(block: Block, e: paper.MouseEvent): boolean
    {
        if (dragging !== undefined && dragging !== block)
        {
            return false;
        }

        (dragging = block).translate_recursively(e.delta.x, e.delta.y);

        return true;
    }

    function stop_drag(e: paper.MouseEvent)
    {
        dragging = undefined;
    }
}