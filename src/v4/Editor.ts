import Class from "./Class";
import { Symbol, Path, CompoundPath, Group, PointText, Point } from "paper";
import Workspace from "./Workspace";
import { Colours } from "./Colour";
import Palette from "./Palette";
import Sprite from "./Sprite";
import BlockEditor from "./BlockEditor";

export default class Editor
{
    public static readonly padding = 10;

    public static readonly palette_width = 300;
    public static readonly player_width = 480 / 2;
    public static readonly header_height = 50;

    public static readonly Colours =
    {
        DARK: '#26282e',
        LIGHT: '#303840',
        TEXT: 'white',
        SUBTEXT: '#aaaeb3'
    }

    private static m_active: Class;
    private static m_classes: Class[];

    private static m_script_pane: Group;
    private static m_palette_pane: Group;

    public static init(): void
    {
        this.m_classes = [new Class("Player", new Sprite())];
        this.active = this.m_classes[0];

        this.draw();
    }

    private static draw(): void
    {
        /* CLASS */
        const header = new Path.Rectangle
        ({
            x: this.padding + 1.75,
            y: this.padding + 1.75,
            width: this.palette_width - 3.5,
            height: this.header_height,
            radius: 10,
            strokeColor: Editor.Colours.LIGHT,
            fillColor: Editor.Colours.DARK,
            strokeWidth: 3.5
        });

        const size = '1.2em';
        const txt0 = new PointText
        ({
            point: [0, 0],
            content: "class ",
            fillColor: Editor.Colours.SUBTEXT,
            fontFamily: 'Roboto',
            fontWeight: '700',
            fontSize: size
        })
        const txt1 = new PointText
        ({
            point: [txt0.bounds.right, 0],
            content: this.active.name,
            fillColor: Editor.Colours.TEXT,
            fontFamily: 'Roboto',
            fontSize: size
        })
        const txt2 = new PointText
        ({
            point: [txt1.bounds.right, 0],
            content: " extends ",
            fillColor: Editor.Colours.SUBTEXT,
            fontFamily: 'Roboto',
            fontWeight: 'italic 700',
            fontSize: size
        })
        const txt3 = new PointText
        ({
            point: [txt2.bounds.right, 0],
            content: this.active.extends.name,
            fillColor: Editor.Colours.TEXT,
            fontFamily: 'Roboto',
            fontSize: size
        })
        const txts = new Group([txt0, txt1, txt2, txt3]);

        txts.bounds.leftCenter = new Point(this.padding * 2, header.bounds.center.y);

        const circ = new Path.Circle
        ({
            center: [header.bounds.right - 10 - this.padding, header.bounds.center.y],
            radius: 10,
            fillColor: Editor.Colours.DARK,
            strokeColor: Editor.Colours.LIGHT,
            strokeWidth: 3
        })
        const plus = new CompoundPath
        ({
            children:
            [
                new Path.Rectangle({ position: [0, 0], width: 10, height: 3, radius: 1 }),
                new Path.Rectangle({ position: [0, 0], width: 3, height: 10, radius: 1 }),
            ],
            fillColor: Editor.Colours.LIGHT
        })
        plus.bounds.center = circ.bounds.center;

        const btn = new Group([circ, plus]);
        btn.onMouseDown = e => BlockEditor.show();

        /* SCRIPT */
        const cross = new Symbol(new CompoundPath
        ({
            children:
            [
                new Path.Rectangle({ position: [0, 0], width: 20, height: 2, radius: 3 }),
                new Path.Rectangle({ position: [0, 0], width: 2, height: 20, radius: 3 }),
            ],
            fillColor: Editor.Colours.LIGHT,
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
        for (let x = rect.bounds.left + 3; x <= rect.bounds.right + 70; x += 70)
        {
            for (let y = rect.bounds.top + 3; y <= rect.bounds.bottom + 70; y += 70)
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
            y: this.header_height + this.padding * 2,
            width: this.palette_width,
            height: this.height() - this.header_height - this.padding * 3,
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
        const dy = rect2.bounds.height / 8;
        let y = rect2.bounds.top - dy / 2;
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
                fillColor: Editor.Colours.TEXT,
                justification: 'center',
                fontFamily: 'Roboto',
                fontSize: '0.7em'
            }))
        }

        this.m_palette_pane = new Group
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
        this.m_palette_pane.moveBelow(Palette.active.group);
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

    public static get palette_pane(): Group
    {
        return this.m_palette_pane;
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

    public static get classes(): Class[]
    {
        return this.m_classes;
    }
}