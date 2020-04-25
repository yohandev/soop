import Block from "./Block";
import { Point, MouseEvent } from "paper";

export default class Cursor
{
    public static readonly threshold = 0;

    private static active: Block;
    private static start: Point;

    public static init()
    {
        paper.project.view.onMouseUp = e => Cursor.stop(e); // register
        //paper.project.view.onFrame = e => console.log(this.active);
    }

    public static drag(target: Block, e: MouseEvent): void
    {
        if (this.active && this.active !== target) // already dragging
        {
            return;
        }
        else if (!this.active) // new drag
        {
            this.active = target;
            this.start = e.point;
        }

        this.active.group.translate(e.delta); // move

        if (this.distance(e) > this.threshold) // drag away
        {
            if (this.active.disconnect())
            {
                console.log("disconnected blocks!");
            }
        }
    }

    private static stop(e: paper.MouseEvent): void
    {
        if (!this.active)
        {
            return; // no drag
        }

        console.log(`dragged ${e.point.getDistance(this.start)}pts`);

        this.active = undefined;
    }

    private static distance(e: MouseEvent): number
    {
        return this.start.getDistance(e.point);
    }
}