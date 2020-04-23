import MotionBlock from "./MotionBlock";
import TextBlock from "../abstract/TextBlock";
import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import OrBlock from "../operator/OrBlock";

export default class SetXBlock extends MotionBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("set x to"));
        this.add_child(new BooleanGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }
}