import Block from "./Block";
import Cursor from "./Cursor";
import InputProp from "./InputProp";
import Prop from "./Prop";

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
        const bounds = block.shape.path.bounds.clone().expand(Cursor.threshold);
        let found = false;

        for (const blo of this.blocks)
        {
            if (blo === block) // don't connect to yourself
            {
                continue;
            }

            blo.visit(b =>
            { 
                if (found)
                {
                    return;
                }  

                if (b.intersects(bounds)) // interesect within threshold
                {
                    if (block.connect(b as Block | Prop))
                    {
                        this.blocks.splice(this.blocks.indexOf(block), 1) // rm from loose blocks

                        found = true; // connected ;; done
                    }
                }
            });
        }

        return found;
    }

    public load(): void
    {
        this.blocks.forEach(b => b.draw()); // draw
    }

    private unload(): void
    {
        for (const blo of this.blocks)
        {
            blo.visit(v =>
            {
                if ("erase" in v)
                {
                    (v as any).erase();
                }
            });
        }
        this.blocks.forEach(b => { if (b.group) b.group.remove() }); // erase
    }

    public reload(): void
    {
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