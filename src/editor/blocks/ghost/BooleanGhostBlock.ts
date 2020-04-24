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

    public ghost_join(block: BooleanBlock): void
    {
        if (!(this.children[0] instanceof TextBlock))
        {
            return;
        }
        this.children[0].graphics().remove();
        this.children = [];

        this.add_child(block);
        this.top().render(); 
    }

    public ghost_remove(block: BooleanBlock): void
    {
        if (!(this.children[0] instanceof BooleanBlock))
        {
            return;
        }
        this.children = [];
        this.add_child(new TextBlock("         "));
        this.top().render(); 
    }
}