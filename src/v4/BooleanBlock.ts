import NestedBlock from "./NestedBlock";
import Shapes from "./Shapes";
import { Colour } from "./Colour";

export default class BooleanBlock extends NestedBlock
{
    constructor(colour: Colour)
    {
        super(Shapes.BOOLEAN, colour);
    }
}