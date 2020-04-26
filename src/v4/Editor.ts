import Class from "./Class";
import { Symbol, Path, CompoundPath, Group, PointText } from "paper";
import Workspace from "./Workspace";
import { Colours } from "./Colour";

export default class Editor
{
    public static readonly padding = 20;
    public static readonly palette_width = 300;
    public static readonly player_width = 480 / 2;

    public static readonly Colours =
    {
        DARK: '#26282e',
        LIGHT: '#303840'
    }

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
            fillColor: Editor.Colours.LIGHT,
            //opacity: 0.1,
            rotation: 45
        }))
        
        const rect = new Path.Rectangle
        ({
            x: this.palette_width + this.padding * 2,
            y: this.padding,
            width: this.width() - this.palette_width - this.player_width - this.padding * 3,
            height: this.height() - this.padding * 2,
            radius: 10,
            strokeColor: Editor.Colours.LIGHT,
            fillColor: Editor.Colours.DARK,
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

        /* PALETTE */
        const rect2 = new Path.Rectangle
        ({
            x: this.padding,
            y: this.padding,
            width: this.palette_width,
            height: this.height() - this.padding * 2,
            radius: 10,
            strokeColor: Editor.Colours.LIGHT,
            fillColor: Editor.Colours.DARK,
            strokeWidth: 7
        });

        const tabs = new Path.Rectangle
        ({
            x: this.padding,
            y: this.padding,
            width: 60,
            height: this.height() - this.padding * 2,
            fillColor: Editor.Colours.LIGHT,
        });

        const circs = new Group();
        const dy = tabs.bounds.height / 8;
        let y = this.padding - dy / 2;
        for (const col in Colours)
        {
            const c = (Colours as any)[col];

            circs.addChild(new Path.Circle
            ({
                center: [tabs.bounds.center.x, y += dy],
                radius: 15,
                fillColor: c.fill,
                strokeColor: c.stroke,
                strokeWidth: 2
            }))

            circs.addChild(new PointText
            ({
                point: [tabs.bounds.center.x, y + 30],
                content: col.toLowerCase(),
                fillColor: 'white',
                justification: 'center',
                fontFamily: 'Roboto',
                fontSize: '0.7em'
            }))
        }

        const palette_pane = new Group
        ({
            children:
            [
                /* clipping */ rect2,
                /* border */ rect2.clone(),
                /* tabs bg */ tabs,
                /* tabs*/ circs
            ],
            clipped: true
        })
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