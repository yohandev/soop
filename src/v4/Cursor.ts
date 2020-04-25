import Block from "./Block";
import { Point, MouseEvent } from "paper";

export default class Cursor
{
    public static readonly threshold = 30;

    private static active: Block;
    private static start: Point;

    public static init()
    {
        paper.project.view.onMouseUp = e => Cursor.stop(e); // register
        paper.project.view.onMouseMove = e => Cursor.move(e);
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
    }

    private static move(e: paper.MouseEvent): void
    {
        if (!this.active)
        {
            return; // no drag
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

        if (this.distance(e) < this.threshold)
        {
            this.active.top.draw(); // re-render to 'snap' back
        }

        this.active = undefined;
    }

    private static distance(e: MouseEvent): number
    {
        return this.start.getDistance(e.point);
    }
}