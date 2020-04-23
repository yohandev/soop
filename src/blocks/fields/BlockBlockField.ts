import BlockField from "./BlockField";
import BlockBase from "../BlockBase";
import { Point } from "paper";

export default class BlockBlockField extends BlockField
{
    public value: undefined | BlockBase;

    constructor()
    {
        super('block');

        this.value = undefined;
    }

    public create_graphics(): void // draw the block, but small
    {
        this.value.render();

        this.graphics = this.value.graphics;
        this.graphics.translate(new Point(0, -30));
        this.graphics.scale(0.8, this.graphics.bounds.leftCenter);
    }

    // TODO recursively iterate down this.value and
        // turn reporter fields to variable-like
        // turn boolean fields to variable-boolean-like
        // turn color scheme to owner's color scheme
}