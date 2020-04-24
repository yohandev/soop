import SensingBlock from "./SensingBlock";
import TextBlock from "../abstract/TextBlock";
import GhostBlock from "../ghost/GhostBlock";
import ReporterBlock from "../abstract/ReporterBlock";

export default class KeyPressedBlock extends SensingBlock
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("key"));
        this.add_child(new GhostBlock<ReporterBlock>(SensingBlock));
        this.add_child(new TextBlock("pressed?"));
    }

    public draggable(): boolean
    {
        return true;
    }
}