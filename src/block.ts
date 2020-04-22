import { Group, Point } from "paper";

export default abstract class Block
{
    protected graphics: Group;

    constructor()
    {
        this.draw();

        this.graphics.position = Point.random().multiply(100);

        this.graphics.onMouseDrag = evt =>
        {
            this.graphics.position.x += evt.delta.x;
            this.graphics.position.y += evt.delta.y;
        }
    }

    protected abstract draw(): void;
}