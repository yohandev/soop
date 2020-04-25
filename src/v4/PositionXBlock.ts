import ReporterBlock from "./ReporterBlock";
import { Colours } from "./Colour";
import TextProp from "./TextProp";
import ReporterInputProp from "./ReporterInputProp";

export default class PositionXBlock extends ReporterBlock
{
    constructor()
    {
        super(Colours.MOTION);

        this.add(TextProp, "x position");
    }
}