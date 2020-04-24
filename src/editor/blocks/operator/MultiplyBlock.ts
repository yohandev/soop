import { OperatorReporterBlock } from "./OperatorBlock";
import TextBlock from "../abstract/TextBlock";
import ReporterGhostBlock from "../ghost/ReporterGhostBlock";

export default class MultiplyBlock extends OperatorReporterBlock
{
    constructor()
    {
        super();

        this.add_child(new ReporterGhostBlock());
        this.add_child(new TextBlock("*"))
        this.add_child(new ReporterGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }
}