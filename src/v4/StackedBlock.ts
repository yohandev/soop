import Block from "./Block";
import Prop from "./Prop";
import IVisitable from "./IVisitable";

export default abstract class StackedBlock extends Block
{
    private m_next: StackedBlock | undefined;
    private m_prev: StackedBlock | undefined;

    public draw(): void
    {
        super.draw();
        this.shape.path.onMouseDown = e => console.log(`prev: ${this.m_prev}, next: ${this.m_next}`);

        if (this.m_next)
        {
            this.m_next.draw(); // draw next

            this.m_next.group.bounds.topLeft = this.group.bounds.topLeft; // adjust position
            this.m_next.group.position.y += this.shape.height; // 'stack' below

            this.group.addChild(this.m_next.group); // group
        }
    }

    public get next(): StackedBlock | undefined
    {
        return this.m_next;
    }

    public get top(): StackedBlock | undefined
    {
        if (this.m_prev === undefined)
        {
            return this;
        }
        if (this.m_prev === this)
        {
            console.warn("somehow connected to itself");
            
            return this.m_prev = undefined;
        }
        return this.m_prev.top;
    }

    private get bottom(): StackedBlock | undefined
    {
        if (!this.m_next)
        {
            return this;
        }
        return this.m_next.bottom;
    }

    public connect(b: Block | Prop): boolean
    {
        if (!(b instanceof StackedBlock))
        {
            return false; // only connects to stack
        }

        if (this.m_prev)
        {
            this.disconnect();
        }
        
        if (b.m_next) // place block in between
        {
            const n = b.m_next;

            n.disconnect();
            n.connect(this.bottom);
            // const bo = this.bottom;

            // bo.m_next = b.m_next;
            // b.m_next.m_prev = bo;
        }

        b.m_next = this; // this -> b
        this.m_prev = b; // b <- this

        console.log("starting draw");
        this.top.draw();
        console.log("done draw");

        return true;
    }

    public disconnect(): boolean
    {
        if (!this.m_prev) // no previous, can't disconnect
        {
            return false;
        }

        this.m_prev.m_next = undefined; // prev no longer knows about this
        this.top.draw(); // redraw entire script except this

        this.m_prev = undefined; // this no longer knows about prev
        this.draw(); // redraw this

        return true;
    }

    public visit(func: (v: IVisitable) => void): void
    {
        super.visit(func);

        if (this.m_next)
        {
            this.m_next.visit(func);
        }
    }
}