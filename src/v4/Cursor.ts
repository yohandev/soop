import Block from "./Block";
import { Point, MouseEvent } from "paper";

export default class Cursor
{
    private static active: Block;
    private static start: Point;

    public static init()
    {
        paper.project.view.onMouseUp = e => Cursor.stop(e); // register
    }

    public static drag(target: Block, e: MouseEvent)
    {
        if (this.active && this.active !== target)
        {
            return;
        }
        else if (!this.active)
        {
            this.active = target;
            this.start = e.point;
        }

        this.active.group.translate(e.delta);
    }

    private static stop(e: paper.MouseEvent)
    {
        if (!this.active)
        {
            return; // no drag
        }

        console.log(`dragged ${e.point.getDistance(this.start)}pts`);

        this.active = undefined;
    }
}