import InputProp from "./InputProp";
import Shape from "./Shape";
import Shapes, { ShapeType } from "./Shapes";
import IBlock from "./IBlock";
import { Colour } from "./Colour";

export default class ReporterInputProp extends InputProp
{
    constructor(parent: IBlock)
    {
        super(parent);
    }

    protected get empty(): { shape: Shape, colour: Colour }
    {
        return { shape: Shapes.REPORTER, colour: { fill: 'white', stroke: this.parent.colour.stroke } };
    }

    public compatible(s: ShapeType): boolean
    {
        return s === 'reporter' || s === 'boolean';
    }
}