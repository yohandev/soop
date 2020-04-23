import BlockField from "./BlockField";
import { Path, Point } from "paper";
import ReporterBlockBase from "../reporter/ReporterBlockBase";

const SVG_DATA = `M16.5.5h8a16,16,0,0,1,16,16h0a16,16,0,0,1-16,16h-8a16,16,0,0,1-16-16h0A16,16,0,0,1,16.5.5Z`;

export default class BlockReporterField extends BlockField
{
    public value: undefined | ReporterBlockBase;

    constructor()
    {
        super('reporter');

        this.value = undefined;
    }

    public create_graphics(): void
    {
        if (this.value) // draw boolean block itself
        {
            this.value.render();

            this.graphics = this.value.graphics;
            this.graphics.translate(new Point(0, -26));
            this.graphics.scale(0.8, this.graphics.bounds.leftCenter);
        }
        else // empty boolean slot
        {
            this.graphics = new Path(SVG_DATA);
            this.graphics.fillColor = 'white';
            this.graphics.strokeColor = this.owner.color_stroke;

            this.graphics.translate(new Point(0, -22));
        }
    }
}