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
            this.m_next.translate_recursively(0, this.height());
        }
    }

    public translate_recursively(x: number, y: number): void
    {
        super.translate_recursively(x, y);

        if (this.m_next)
        {
            this.m_next.translate_recursively(x, y);
        }
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