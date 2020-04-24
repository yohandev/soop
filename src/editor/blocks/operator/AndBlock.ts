import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import TextBlock from "../abstract/TextBlock";
import OrBlock from "./OrBlock";
import { OperatorBooleanBlock } from "./OperatorBlock";

export default class AndBlock extends OperatorBooleanBlock
{
    constructor()
    {
        super();

        this.add_child(new BooleanGhostBlock());
        this.add_child(new TextBlock("and"))
        this.add_child(new BooleanGhostBlock());
    }

    public draggable(): boolean
    {
        return true;
    }
}