import Block from "./Block";
import Cursor from "./Cursor";
import Prop from "./Prop";
import { Group, Point, Rectangle } from "paper";
import Editor from "./Editor";

export default class Workspace
{
    private static m_active: Workspace; // visible workspace

    private blocks: Block[]; // floating blocks
    
    public readonly group: Group; // scroll pane group

    constructor()
    {
        this.blocks = [];
        this.group = new Group();

        window.onwheel = (e: WheelEvent) =>
        {
            if (Workspace.active !== this)
            {
                return;
            }

            // @ts-ignore
            if (!Editor.script_pane.bounds.intersects(new Rectangle([e.x, e.y], [1, 1])))
            {
                return;
            }
            
            // @ts-ignore
            this.group.translate([-e.deltaX, -e.deltaY]);
        }
    }

    public add(b: Block)
    {
        this.blocks.push(b);

        b.draw();
    }

    public disconnect(block: Block): boolean
    {
        if (block.disconnect())
        {
            this.blocks.push(block); // add to loose blocks

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
        this.group.visible = true;
    }

    public unload(): void
    {
        this.group.visible = false;
    }

    public highlight_loose(): void
    {
        this.blocks.forEach(b => b.shape.colour({ fill: b.colour.fill, stroke: 'red' }));
    }

    public unhighlight_loose(): void
    {
        this.blocks.forEach(b => b.shape.colour(b.colour));
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