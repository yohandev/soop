const max = Math.max;

import BlockDescription from "./BlockDescription";


export default class Block
{
    public readonly desc: BlockDescription;
    public readonly inputs: Block[];

    constructor(desc: BlockDescription)
    {
        this.desc = desc;
        this.inputs = [];
    }

    /* comment this out extensively because it's taken me five iterations to get this right. */
    public draw() /* returns this.graphics */
    {
        // RENDER

        if (false /* not drawn */)
        {
            // this.graphics.add(BlockShape.create(desc), 0) ;; zero index is block shape
        }

        let w = 0; // width tracker
        let h = 0; // max height

        let p = 1; // prop indexer
        let i = 0; // input indexer
        for (const prop of this.desc.props)
        {
            //const flags = BlockProp.flags(prop);

            if (true /* flags.input */)
            {
                if (true /* this.graphics[p] !== this.inputs[i].graphics ;; newly added input */)
                {
                    if (true /* this.graphics[p] ;; something is there*/)
                    {
                        // this.graphics[p].remove() ;; remove it, whatever it is
                    }
                    // this.graphics.add(this.inputs[i]##.draw()##, p) ;; draw input block ## not needed, probably
                }
            }
            else if (true /* this.graphics[p] not drawn */)
            {
                // this.graphics.add(BlockProp.create(prop), p);
            }

            // h = max(h, this.graphics[p].bbox.height) ;; cache max height
            p++; // next prop
        }

        // ALIGN

    }
}