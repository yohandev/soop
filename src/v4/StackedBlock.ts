import Block from "./Block";
import Prop from "./Prop";

export default abstract class StackedBlock extends Block
{
    private m_next: StackedBlock;
    private m_prev: StackedBlock;

    public draw(): void
    {
        super.draw();

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

    public get top(): StackedBlock
    {
        if (!this.m_prev)
        {
            return this;
        }
        return this.m_prev.top;
    }

    private get bottom(): StackedBlock
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
        
        if (b.m_next) // place block in between
        {
            const bo = this.bottom;

            bo.m_next = b.m_next;
            b.m_next.m_prev = bo;
        } 

        b.m_next = this; // this -> b
        this.m_prev = b; // b <- this

        b.top.draw();

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
}