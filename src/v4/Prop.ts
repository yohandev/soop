import Drawable from "./Drawable";
import IBlock from "./IBlock";

export default abstract class Prop extends Drawable
{
    private m_parent: IBlock;

    protected constructor(parent: IBlock)
    {
        super();
        
        this.m_parent = parent;
    }

    public get parent(): IBlock
    {
        return this.m_parent;
    }
}