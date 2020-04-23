import OperatorBlock from "./OperatorBlock";
import BooleanGhostBlock from "../ghost/BooleanGhostBlock";
import TextBlock from "../abstract/TextBlock";
import OrBlock from "./OrBlock";

export default class AndBlock extends OperatorBlock
{
    constructor()
    {
        super();

        this.add_child(new OrBlock());
        this.add_child(new TextBlock("and"))
        this.add_child(new BooleanGhostBlock());
    }
}