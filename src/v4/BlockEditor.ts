import { project, Layer, Path, Point, CompoundPath, Rectangle, Group, PointText, Size } from "paper";
import Editor from "./Editor";
import { Blocks } from "./Blocks";
import Block from "./Block";
import { Colours } from "./Colour";

export default class BlockEditor
{
    private static first: Layer;
    private static layer: Layer;

    private static pane: Rectangle;

    // block currently editing
    private static category: string;
    private static props: { type: string, args: any[] }[];
    private static block: Block;

    private static draw()
    {
        this.first = project.activeLayer;

        this.layer = new Layer(); // draw above
        this.layer.activate();
        
        // dark overlay
        const bg = new Path.Rectangle
        ({
            x: 0,
            y: 0,
            width: project.view.size.width,
            height: project.view.size.height,
            fillColor: Editor.Colours.DARK,
            opacity: 0.8
        })

        // light grey bg
        const bg2 = new Path.Rectangle
        ({
            width: Math.max(700, project.view.size.width / 2),
            height: Math.max(500, project.view.size.height / 2),
            fillColor: Editor.Colours.LIGHT,
            radius: 10
        });
        bg2.bounds.center = project.view.center;
        this.pane = bg2.bounds;

        // category circles
        const circs = new Group();
        let pos = 0;
        for (const col in Colours)
        {
            const c = (Colours as any)[col];

            circs.addChild(new Path.Circle
            ({
                center: [pos += 70, 0],
                radius: 15,
                fillColor: c.fill,
                strokeColor: c.stroke,
                strokeWidth: 2
            }))

            circs.lastChild.onMouseDown = e =>
            {
                this.category = col;
                this.refresh_block();
            }

            circs.addChild(new PointText
            ({
                point: [pos, 30],
                content: col.toLowerCase(),
                fillColor: Editor.Colours.TEXT,
                justification: 'center',
                fontFamily: 'Roboto',
                fontSize: '0.7em'
            }))
        }
        circs.bounds.center = this.pane.topCenter.clone().add([0, 150]);

        // close btn
        const x = new CompoundPath
        ({
            children:
            [
                new Path.Rectangle({ position: [project.view.size.width - 30, 30], width: 20, height: 4, radius: 3 }),
                new Path.Rectangle({ position: [project.view.size.width - 30, 30], width: 4, height: 20, radius: 3 }),
            ],
            fillColor: Editor.Colours.TEXT,
            rotation: 45
        });
        x.onMouseDown = e => this.hide();

        this.first.activate();
    }

    public static show()
    {
        if (!this.layer)
        {
            this.draw();
        }
        this.layer.visible = true;
        this.layer.activate();

        this.props = [];
        this.category = 'OBJECT';

        this.refresh_block();
    }

    private static desc(): string
    {
        return `
        {
            shape: 'STACK',
            category: '${this.category}',
            props:
            [
                { type: 'text', args: ['go to'] },
                { type: 'text', args: ['x:'] },
                { type: 'reporter', args: ['x'] },
                { type: 'text', args: ['y:'] },
                { type: 'reporter', args: ['y'] }
            ]
        }`;
    }

    private static refresh_block()
    {
        if (this.block)
        {
            this.block.group.remove();
        }
        this.block = Blocks.create(this.desc());

        this.block.draw_display();
        this.block.group.bounds.topCenter = this.pane.topCenter.clone().add([0, 30]);
    }

    public static hide()
    {
        this.first.activate();
        this.layer.visible = false;
    }
}