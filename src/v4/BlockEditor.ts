import { project, Layer, Path, Point, CompoundPath, Rectangle, Group, PointText, Size, TextItem, Color } from "paper";
import Editor from "./Editor";
import { Blocks } from "./Blocks";
import Block from "./Block";
import { Colours } from "./Colour";
import Shapes from "./Shapes";
import Workspace from "./Workspace";
import DefineBlock from "./DefineBlock";

export default class BlockEditor
{
    private static first: Layer;
    private static layer: Layer;

    private static pane: Rectangle;
    private static btns: Group;

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
        circs.bounds.center = this.pane.topCenter.clone().add([0, 200]);

        // prop btns
        const rect = new Path.Rectangle
        ({
            width: 100,
            height: 80,
            fillColor: Editor.Colours.LIGHT,
            strokeColor: Editor.Colours.DARK,
            strokeWidth: 3.5,
            radius: 10
        })

        // text btn
        const txt = new PointText
        ({
            content: "text",
            fillColor: Editor.Colours.TEXT,
            justification: 'center',
            fontFamily: 'Roboto',
            fontSize: '1.5em'
        })
        txt.bounds.center = rect.bounds.center;
        const text_btn = new Group([rect.clone(), txt]);
        text_btn.onClick = e => 
        {
            this.props.push({ type: 'text', args: [window.prompt("text label", "describe your block!")] })
            this.refresh_block();
        }

        // boolean btn
        const shape = Shapes.BOOLEAN;
        shape.draw();
        shape.colour({ fill: Editor.Colours.LIGHT, stroke: Editor.Colours.DARK });
        shape.path.bounds.center = rect.bounds.center;
        shape.path.strokeWidth = 3.5;
        const bool_btn = new Group([rect.clone(), shape.path]);
        bool_btn.position.x += 150;
        bool_btn.onClick = e =>
        {
            this.props.push({ type: 'boolean', args: [window.prompt("add an input", "true or false")] })
            this.refresh_block();
        }

        // reporter btn
        const shape2 = Shapes.REPORTER;
        shape2.draw();
        shape2.colour({ fill: Editor.Colours.LIGHT, stroke: Editor.Colours.DARK });
        shape2.path.bounds.center = rect.bounds.center;
        shape2.path.strokeWidth = 3.5;
        const rep_btn = new Group([rect, shape2.path]);
        rep_btn.position.x += 150 * 2;
        rep_btn.onClick = e =>
        {
            this.props.push({ type: 'reporter', args: [window.prompt("add an input", "number, text, or object")] })
            this.refresh_block();
        }

        this.btns = new Group([text_btn, rep_btn, bool_btn]);
        this.btns.bounds.center = this.pane.topCenter.clone().add([0, 300]);

        const rect2 = new Path.Rectangle
        ({
            width: 120,
            height: 50,
            fillColor: Editor.Colours.SUBTEXT,
            radius: 4,
            //opacity: 0.5
        })
        const ok = new PointText
        ({
            content: "✔",
            fillColor: Editor.Colours.TEXT,
            justification: 'center',
            fontFamily: 'Roboto',
            fontSize: '1em'
        })
        ok.bounds.center = rect2.bounds.clone().center;
        const ok_btn = new Group([rect2.clone(), ok]);
        ok_btn.bounds.bottomRight = this.pane.bottomRight.clone().add([-20, -20]);
        ok_btn.onClick = e => 
        {
            this.hide();

            const d = this.desc();

            Editor.active.add(d);
            Workspace.active.add(new DefineBlock(d));
        }
        this.btns.addChild(ok_btn);

        const cancel = new PointText
        ({
            content: "cancel",
            fillColor: Editor.Colours.TEXT,
            justification: 'center',
            fontFamily: 'Roboto',
            fontSize: '1em'
        })
        cancel.bounds.center = rect2.bounds.center;
        const cancel_btn = new Group([rect2, cancel]);
        cancel_btn.bounds.bottomRight = this.pane.bottomRight.clone().add([-150, -20]);
        cancel_btn.onClick = e => 
        {
            this.hide();
        }

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
        x.onClick = e => this.hide();

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

    public static desc(): string
    {
        return `
        {
            shape: 'STACK',
            category: '${this.category}',
            props:
            [
                ${this.props.map(p => `{ type: '${p.type}', args: [${p.args.map(s => `"${s}"`).join(',')}] }`).join(',')}
            ],
            virtual: true
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
        this.block.group.bounds.topCenter = this.pane.topCenter.clone().add([0, 60]);

        // update btns
        this.btns.children.forEach(c =>
        {
            const fill = (Colours as any)[this.category].fill;
            const stroke = (Colours as any)[this.category].stroke;

            if (!(c.children[1] instanceof PointText)) // text
            {
                c.children[1].fillColor = '#0000000F';
                c.children[1].strokeColor = stroke;
            }
            c.children[0].fillColor = fill;
            c.children[0].strokeColor = stroke;
        })
    }

    public static hide()
    {
        this.first.activate();
        this.layer.visible = false;
    }
}