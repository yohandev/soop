const max = Math.max;

import { Container } from "@svgdotjs/svg.js";
import BlockDescription from "./BlockDescription";
import BlockProp from "./BlockProp";
import { BlockShape } from "./BlockShape";
import BlockGraphics from "./BlockGraphics";

export default class Block
{
    public readonly desc: BlockDescription;
    public readonly inputs: Block[];
    public readonly graphics: BlockGraphics;

    constructor(desc: BlockDescription, where: Container)
    {
        this.desc = desc;
        this.inputs = [];
        this.graphics = new BlockGraphics(desc.props.length + 1, where);
    }

    /* comment this out extensively because it's taken me five iterations to get this right. */
    public draw() /* returns this.graphics */
    {
        // PARAMS
        const padding = { h: 10, v: 7 };

        // RENDER

        if (this.graphics.drawn(0)) // not drawn
        {
            this.graphics.draw(0, BlockShape.create(this.desc)) // zero index is the block shape
        }

        let w = padding.h; // width tracker
        let h = padding.v; // max height

        let p = 1; // prop indexer
        let i = 0; // input indexer
        for (const prop of this.desc.props)
        {
            const flags = BlockProp.flags(prop);

            if (flags.input && this.inputs[i]) // prop is of input type, input slot filled 
            {
                if (this.graphics.get(p) !== this.inputs[i].graphics.group) // newly added input
                {
                    this.graphics.draw(p, this.inputs[i].graphics.group) // add input block to group
                }
                else; // graphics for input accurately added ;; no change
            }
            else if (!this.graphics.drawn(p))
            {
                this.graphics.draw(p, BlockProp.create(prop));
            }

            h = max(h, this.graphics.get(p)?.bbox().height || 0) // cache max height
            p++; // next prop
        }

        // ALIGN
        w = padding.h;
        for (p = 1; p < this.graphics.count; p++) // go through every prop graphics
        {
            this.graphics.get(p)?.x(w).cy(h / 2); // align x to current width and y to vertical center

            w += padding.h + (this.graphics.get(p)?.bbox().width || 0); // increment current width
        }
        this.graphics.get(0)?.size(w, h); // size block shape
    }
}