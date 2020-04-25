import NestedBlock from "./NestedBlock";
import Shapes from "./Shapes";
import { Colour } from "./Colour";

export default class ReporterBlock extends NestedBlock
{
    constructor(colour: Colour)
    {
        super(Shapes.REPORTER, colour);
    }
}