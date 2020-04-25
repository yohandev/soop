import Block from "./Block";
import { Colours } from "./Colour";
import TextProp from "./TextProp";
import Shapes from "./Shapes";
import ReporterInputProp from "./ReporterInputProp";
import PositionXBlock from "./PositionXBlock";

export default class GoToBlock extends Block
{
    constructor()
    {
        super(Shapes.STACK, Colours.MOTION);

        this.add(TextProp, "go to");
        this.add(TextProp, "x:");
        this.add(ReporterInputProp);
        this.add(TextProp, "y:");
        this.add(ReporterInputProp);

        (this.props[2] as ReporterInputProp)["m_value"] = new PositionXBlock();
    }
}