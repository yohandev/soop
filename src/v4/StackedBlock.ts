import Block from "./Block";

export default abstract class StackedBlock extends Block
{
    private m_next: StackedBlock;

    public draw(): void
    {
        super.draw();

        if (this.m_next)
        {
            this.m_next.draw(); // draw next

            this.m_next.group.bounds.topLeft = this.group.bounds.topLeft; // adjust position
            this.m_next.group.position.y += this.shape.height; // 'stack' below
        }
    }

    public get next(): StackedBlock | undefined
    {
        return this.m_next;
    }

    public connect(b: StackedBlock): boolean
    {
        this.m_next = b;

        return true;
    }
}