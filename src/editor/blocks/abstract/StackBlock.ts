import Block from "../Block";

export default abstract class StackBlock extends Block
{
    private m_next: StackBlock;
    private m_prev: StackBlock;

    public abstract cap(): boolean; // next always undefined
    public abstract hat(): boolean; // prev always undefined

    public render()
    {
        super.render();

        if (this.m_next)
        {
            this.m_next.render();
            this.m_next.translate(0, this.height());
        }
    }

    protected top(): Block
    {
        if (this.m_prev)
        {
            return this.m_prev;
        }
        return super.top();
    }

    public iterate(func: (b: Block) => void): void
    {
        super.iterate(func);

        if (this.m_next)
        {
            this.m_next.iterate(func);
        }
    }

    public translate(x: number, y: number): void
    {
        super.translate(x, y);

        if (this.m_next)
        {
            this.m_next.translate(x, y);
        }
    }

    public join(to: Block): boolean
    {
        if (!this.can_join(to))
        {
            return false;
        }

        this.m_next = (to as StackBlock).m_next;
        this.m_prev = (to as StackBlock);
        (to as StackBlock).m_next = this;

        return true;
    }

    public can_join(to: Block): boolean
    {
        if (!(to instanceof StackBlock))
        {
            return false;
        }

        if (this.hat() || to.cap())
        {
            return false;
        }

        return true;
    }

    public separate(): boolean
    {
        if (this.m_prev)
        {
            this.m_prev.m_next = undefined;
            this.m_prev = undefined;

            return true;
        }

        return false;
    }

    public next(set?: StackBlock): StackBlock | undefined
    {
        if (set)
        {
            if (set.hat() || this.cap())
            {
                console.error(`cannot stack ${set} onto ${this}`);
            }
            else
            {
                this.m_next = set;
                set.m_prev = this;
            }
        }
        return this.m_next;
    }

    public prev(): StackBlock | undefined
    {
        return this.m_prev;
    }
}