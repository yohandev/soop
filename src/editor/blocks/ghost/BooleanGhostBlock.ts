import BooleanBlock from "../abstract/BooleanBlock";
import TextBlock from "../abstract/TextBlock";

export default class BooleanGhostBlock extends BooleanBlock
{
    protected draw(): void
    {
        super.draw();

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
}