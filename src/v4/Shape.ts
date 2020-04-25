import Drawable from "./Drawable";
import { Colour } from "./Colour";
import { ShapeType } from "./Shapes";

export default abstract class Shape extends Drawable
{
    public readonly type: ShapeType;

    constructor(type: ShapeType)
    {
        super();

        this.type = type;
    }

    public colour(c: Colour): void
    {
        this.path.fillColor = c.fill;
        this.path.strokeColor = c.stroke;
    }

    protected range(lo: number, hi: number): number[] // utility method (3, 6) -> [3, 4, 5, 6]
    {
        let out: number[] = [];

        for (let i = lo; i <= hi; i++) { out.push(i); }

        return out;
    }
}