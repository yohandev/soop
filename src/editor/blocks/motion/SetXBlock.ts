import MotionBlock from "./MotionBlock";
import TextBlock from "../abstract/TextBlock";
import GhostBlock from "../ghost/GhostBlock";
import ReporterBlock from "../abstract/ReporterBlock";
import SensingBlock from "../sensing/SensingBlock";

export default class SetXBlock extends MotionBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("set x to"));
        this.add_child(new GhostBlock<ReporterBlock>(SensingBlock));
    }

    public draggable(): boolean
    {
        return true;
    }
}