import BooleanBlock from "./BooleanBlock";
import { Colours } from "./Colour";
import ReporterInputProp from "./ReporterInputProp";
import TextProp from "./TextProp";

export default class EqualsBlock extends BooleanBlock
{
    constructor()
    {
        super(Colours.OPERATOR);

        this.add(ReporterInputProp);
        this.add(TextProp, "=");
        this.add(ReporterInputProp);
    }
}