import { Item, Point } from "paper";
import { Cursor } from "../Cursor";

const PADDING: number = 10;

export default abstract class Block
{
    protected parent: Block | undefined;
    public children: Block[];

    constructor()
    {
        this.parent = undefined;
        this.children = [];
    }

    public add_child(child: Block, index?: number)
    {
        child.parent = this;

        if (index)
        {
            this.children.splice(index, 0, child);
        }
        else
        {
            this.children.push(child);
        }
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

        if (this.graphics())
        {
            pos = this.top().graphics().bounds.topLeft;

            this.graphics().remove();
        }

        this.draw();
        this.graphics().translate(pos);

        if (this.draggable())
        {
            this.graphics().onMouseDrag = e => Cursor.drag(this, e);
        }

        let w = PADDING;
        let h = 0;

        this.children.forEach(c =>
        {
            c.render(); // 1. draw child in full size
            c.translate_recursively(w, 0); // 2. adjust size position and padding
            
            // @ts-ignore
            c.graphics().translate([0, this.top().height() / 2 - c.height() / 2]); // 2.5. correct height

            w += c.width() + PADDING;
            h = Math.max(h, c.height());
        });

        this.expand(w - this.width(), h - this.height() + PADDING); // 3. accomodate for child size
    }

    public translate_recursively(x: number, y: number): void
    {
        // @ts-ignore
        this.graphics().translate([x, y]);

        this.children.forEach(c => c.translate_recursively(x, y));
    }

    protected abstract draw(): void;
    public abstract graphics(): Item;

    public abstract width(): number;
    public abstract height(): number;

    protected abstract expand(w: number, h: number): void;

    public abstract separate(): boolean;
    public abstract join(to: Block): boolean;

    protected abstract draggable(): boolean;

    public abstract fill(): string;
    public abstract stroke(): string;
}