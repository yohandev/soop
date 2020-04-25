import Drawable from "./Drawable";
import IBlock from "./IBlock";
import IVisitable from "./IVisitable";
import { Rectangle } from "paper";

export default abstract class Prop extends Drawable implements IVisitable
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

    public abstract visit(func: (v: IVisitable) => void): void;
    public abstract intersects(b: Rectangle): boolean;
}