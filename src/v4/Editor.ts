import Class from "./Class";
import { Symbol, Path, CompoundPath, Group } from "paper";
import Workspace from "./Workspace";

export default class Editor
{
    public static readonly padding = 20;
    public static readonly palette_width = 40;
    public static readonly player_width = 480;

    private static m_active: Class;
    private static m_classes: Class[];

    private static m_script_pane: Group;

    public static init(): void
    {
        this.m_classes = [this.active = new Class(undefined)];

        this.draw();
    }

    private static draw(): void
    {
        /* BACKGROUND */
        const cross = new Symbol(new CompoundPath
        ({
            children:
            [
                new Path.Rectangle({ position: [0, 0], width: 20, height: 2, radius: 3 }),
                new Path.Rectangle({ position: [0, 0], width: 2, height: 20, radius: 3 }),
            ],
            fillColor: '#303840',
            //opacity: 0.1,
            rotation: 45
        }))
        
        const rect = new Path.Rectangle
        ({
            x: this.palette_width + this.padding,
            y: this.padding,
            width: this.width() - this.palette_width - this.player_width - this.padding * 3,
            height: this.height() - this.padding * 2,
            radius: 10,
            strokeColor: '#303840',
            fillColor: '#26282e',
            strokeWidth: 7
        });

        const crosses = new Group();
        for (let x = rect.bounds.left + 35; x < rect.bounds.right; x += 70)
        {
            for (let y = rect.bounds.top + 35; y < rect.bounds.bottom; y += 70)
            {
                // @ts-ignore
                crosses.addChild(cross.place([x, y]));
            }
        }

        this.m_script_pane = new Group
        ({
            children:
            [
                /* clipping */ rect,
                /* border */ rect.clone(),
                /* pattern */ crosses,
                /* scripts */ Workspace.active.group
            ],
            clipped: true
        });
    }

    public static width(): number
    {
        return paper.project.view.size.width;
    }

    public static height(): number
    {
        return paper.project.view.size.height;
    }

    public static get script_pane(): Group
    {
        return this.m_script_pane;
    }

    public static get active(): Class
    {
        return this.m_active;
    }

    public static set active(c: Class)
    {
        this.m_active = c;
        this.m_active.show();
    }
}