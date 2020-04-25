import { Colours } from "./Colour";
import TextProp from "./TextProp";
import Shapes from "./Shapes";
import ReporterInputProp from "./ReporterInputProp";
import PositionXBlock from "./PositionXBlock";
import StackedBlock from "./StackedBlock";

export default class GoToBlock extends StackedBlock
{
    constructor()
    {
        super(Shapes.STACK, Colours.MOTION);

        this.add(TextProp, "go to");
        this.add(TextProp, "x:");
        this.add(ReporterInputProp);
        this.add(TextProp, "y:");
        this.add(ReporterInputProp);
    }
}