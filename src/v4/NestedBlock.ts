import Block from "./Block";
import InputProp from "./InputProp";

export default abstract class NestedBlock extends Block
{
    private m_container: InputProp<this>;

    public disconnect(): boolean
    {
        if (!this.m_container)
        {
            return false;
        }

        this.m_container.value = undefined; // container no longer knows about this
        this.top.draw(); // redraw parent block of container prop

        this.m_container = undefined; // this no longer knows about container
        this.draw(); // redraw this

        return true;
    }

    public set container(c: InputProp<this>)
    {
        this.m_container = c;
    }

    public get top(): Block
    {
        return (this.m_container.parent as Block).top;
    }
}