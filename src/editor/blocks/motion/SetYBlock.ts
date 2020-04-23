import MotionBlock from "./MotionBlock";
import TextBlock from "../abstract/TextBlock";
import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import AndBlock from "../operator/AndBlock";

export default class SetYBlock extends MotionBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("set y to"));
        this.add_child(new BooleanGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }
}