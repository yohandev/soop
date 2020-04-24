import MotionBlock from "./MotionBlock";
import TextBlock from "../abstract/TextBlock";
import ReporterGhostBlock from "../ghost/ReporterGhostBlock";

export default class SetXBlock extends MotionBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("set x to"));
        this.add_child(new ReporterGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }
}