import InputProp from "./InputProp";
import IBlock from "./IBlock";
import { Colour } from "./Colour";
import Shapes, { ShapeType } from "./Shapes";
import Shape from "./Shape";

export default class BooleanInputProp extends InputProp
{
    constructor(parent: IBlock)
    {
        super(parent);
    }

    protected get empty(): { shape: Shape, colour: Colour }
    {
        return { shape: Shapes.BOOLEAN, colour: { fill: this.parent.colour.stroke, stroke: this.parent.colour.fill } };
    }

    public compatible(s: ShapeType): boolean
    {
        return s === 'boolean';
    }
}