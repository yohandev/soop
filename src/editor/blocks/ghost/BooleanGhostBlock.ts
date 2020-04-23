import BooleanBlock from "../abstract/BooleanBlock";
import TextBlock from "../abstract/TextBlock";
import IGhostBlock from "./GhostBlock";

export default class BooleanGhostBlock extends BooleanBlock implements IGhostBlock<BooleanBlock>
{
    constructor()
    {
        super();

        this.add_child(new TextBlock("         "));
    }

    public fill(): string
    {
        return this.parent.stroke();
    }

    public stroke(): string
    {
        return this.parent.fill();
    }

    public draggable(): boolean
    {
        return false;
    }
}