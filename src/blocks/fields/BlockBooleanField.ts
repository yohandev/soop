import BlockField from "./BlockField";
import { BlockBase } from "../BlockBase";
import { Path, Point } from "paper";
import BooleanBlockBase from "../boolean/BooleanBlockBase";

const SVG_DATA = `M16,0H32L48,16h0L32,32H16L0,16H0Z`;

export default class BlockBooleanField extends BlockField
{
    public value: undefined | BooleanBlockBase;

    constructor()
    {
        super('boolean');

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
            this.graphics.fillColor = this.owner.color_stroke;

            this.graphics.translate(new Point(0, -22));
        }
    }
}