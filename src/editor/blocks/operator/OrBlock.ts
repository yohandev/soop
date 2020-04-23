import OperatorBlock from "./OperatorBlock";
import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import TextBlock from "../abstract/TextBlock";

export default class OrBlock extends OperatorBlock
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