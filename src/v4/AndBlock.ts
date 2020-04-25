import BooleanBlock from "./BooleanBlock";
import { Colours } from "./Colour";
import BooleanInputProp from "./BooleanInputProp";
import TextProp from "./TextProp";

export default class AndBlock extends BooleanBlock
{
    constructor()
    {
        super(Colours.OPERATOR);

        this.add(BooleanInputProp);
        this.add(TextProp, "and");
        this.add(BooleanInputProp);
    }
}