import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import TextBlock from "../abstract/TextBlock";
import { OperatorBooleanBlock } from "./OperatorBlock";

export default class OrBlock extends OperatorBooleanBlock
{
    constructor()
    {
        super();

        this.add_child(new BooleanGhostBlock());
        this.add_child(new TextBlock("or"))
        this.add_child(new BooleanGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }
}