import { Item, Point } from "paper";
import { Cursor } from "../Cursor";
import BlockShape from "./abstract/BlockShapes";

const PADDING: number = 10;

export default abstract class Block
{
    protected parent: Block | undefined;
    protected children: Block[];

    protected shape: BlockShape;

    constructor(shape: BlockShape)
    {
        this.parent = undefined;
        this.children = [];
        this.shape = shape;
    }

    public add_child(child: Block)
    {
        child.parent = this;

        this.children.push(child);
    }

    protected top(): Block
    {
        if (!this.parent)
        {
            return this;
        }
        return this.parent.top();
    }

    public render(): void
    {
        let pos = new Point(0, 0);

        if (this.top().shape.path())
        {
            pos = this.top().shape.path().bounds.topLeft;
        }

        if (this.shape.path())
        {
            this.shape.path().remove();
        }

        this.shape.draw();
        this.shape.path().translate(pos);

        if (this.draggable())
        {
            this.shape.path().onMouseDrag = e => Cursor.drag(this, e);
        }

        let w = PADDING;
        let h = 0;

        this.children.forEach(c =>
        {
            c.render(); // 1. draw child in full size
            c.translate(w, 0); // 2. adjust size position and padding
            
            // @ts-ignore
            c.graphics().translate([0, this.top().shape.height() / 2 - c.shape.height() / 2]); // 2.5. correct height

            w += c.shape.width() + PADDING;
            h = Math.max(h, c.shape.height());
        });

        this.shape.grow(w - this.shape.width(), h - this.shape.height() + PADDING); // 3. accomodate for child size
    }

    public translate(x: number, y: number): void
    {
        // @ts-ignore
        this.graphics().translate([x, y]);

        this.children.forEach(c => c.translate(x, y));
    }

    public iterate(func: (b: Block) => void): void
    {
        func(this);

        this.children.forEach(i => i.iterate(func));
    }

    public abstract separate(): boolean;
    public abstract can_join(to: Block): boolean;
    public abstract join(to: Block): boolean;

    protected abstract draggable(): boolean;

    public abstract fill(): string;
    public abstract stroke(): string;
}