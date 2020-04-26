import Block from "./Block";
import InputProp from "./InputProp";
import Prop from "./Prop";

export default abstract class NestedBlock extends Block
{
    private m_container: InputProp;

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

    public connect(b: Block | Prop): boolean
    {
        if (this.m_container)
        {
            return false; // already connected
        }

        if (!(b instanceof InputProp))
        {
            return false;
        }
        const inp = b as InputProp;

        if (!inp.compatible(this.shape.type))
        {
            return false;
        }

        inp.value =  this; // todo check reporter or boolean 
        (inp.parent as Block).top.draw();

        return true;
    }

    public set container(c: InputProp)
    {
        this.m_container = c;
    }

    public get top(): Block
    {
        if (!this.m_container)
        {
            return this;
        }
        return (this.m_container.parent as Block).top;
    }
}