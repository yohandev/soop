import StackedBlock from "./StackedBlock";
import Shapes from "./Shapes";
import { Colours } from "./Colour";
import TextProp from "./TextProp";

export default class DefineBlock extends StackedBlock
{
    constructor()
    {
        super(Shapes.HAT, Colours.OBJECT, true);

        this.add(TextProp, "define");
    }
}