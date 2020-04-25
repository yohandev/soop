import Block from "./Block";
import Cursor from "./Cursor";

export default class Workspace
{
    private static m_active: Workspace; // visible workspace

    private blocks: Block[]; // floating blocks

    constructor()
    {
        this.blocks = [];
    }

    public add(b: Block)
    {
        this.blocks.push(b);
    }

    public disconnect(block: Block): boolean
    {
        if (block.disconnect())
        {
            this.add(block); // add to loose blocks

            return true;
        }
        return false;
    }

    public connect(block: Block): boolean // connects to nearest
    {
        const bb1 = block.shape.path.bounds;

        for (const b of this.blocks)
        {
            if (b === block) // don't connect to yourself
            {
                continue;
            }

            const bb2 = b.shape.path.bounds.clone().expand(Cursor.threshold);
            
            if (bb1.intersects(bb2)) // interesect within threshold
            {
                if (block.connect(b))
                {
                    this.blocks.splice(this.blocks.indexOf(block), 1) // rm from loose blocks

                    return true; // connected ;; done
                }
            }  
        }

        return false;
    }

    public load(): void
    {
        this.blocks.forEach(b => b.draw()); // draw
    }

    private unload(): void
    {
        this.blocks.forEach(b => { if (b.group) b.group.remove() }); // erase
    }

    public reload(): void
    {
        this.unload();
        this.load();
    }

    public static get active(): Workspace
    {
        return this.m_active;
    }

    public static set active(a: Workspace)
    {
        if (!a)
        {
            throw new Error("active workspace cannot be null!");
        }

        if (this.m_active)
        {
            this.m_active.unload();
        }

        (this.m_active = a).load();
    }
}