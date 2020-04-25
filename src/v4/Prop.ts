import Drawable from "./Drawable";
import IBlock from "./IBlock";

export default abstract class Prop extends Drawable
{
    protected parent: IBlock;

    protected constructor(parent: IBlock)
    {
        super();
        
        this.parent = parent;
    }
}