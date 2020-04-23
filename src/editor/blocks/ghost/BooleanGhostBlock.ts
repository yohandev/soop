import BooleanBlock from "../abstract/BooleanBlock";
import TextBlock from "../abstract/TextBlock";

export default class BooleanGhostBlock extends BooleanBlock
{
    protected draw(drag: boolean): void
    {
        super.draw(drag);

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