import Block from "./Block";
import { Colours } from "./Colour";
import TextProp from "./TextProp";
import Shapes from "./Shapes";

export default class GoToBlock extends Block
{
    constructor()
    {
        super(Shapes.STACK, Colours.MOTION);

        this.add(TextProp, "go to");
    }
}