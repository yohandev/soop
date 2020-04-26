import Block from "./Block";
import { Point, MouseEvent } from "paper";
import Workspace from "./Workspace";

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
            if (Workspace.active.disconnect(this.active))
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

        if (Workspace.active.connect(this.active)) // connect
        {
        }
        else if (this.active.top !== this.active && this.distance(e) < this.threshold) // 'snap' back
        {
            this.active.top.draw();
        }

        this.active = undefined;
    }

    private static distance(e: MouseEvent): number
    {
        return this.start.getDistance(e.point);
    }
}