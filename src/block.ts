import { Path, PointText, Point, Group, PathItem, Style, Color } from "paper";
import { util } from "./util";

const BLOCK_HEIGHT = 40;

export default class block
{
    private graphics: Group;

    constructor()
    {
        this.graphics_begin();
        this.graphics_append_text("hey there");
        this.graphics_append_text("more text??");
        this.graphics_add_connector();
        this.graphics_add_connectable();
        this.graphics_end('red');

        this.graphics.position = new Point(350, 100);
        //this.graphics.scale(3);
    }

    private graphics_begin()
    {
        const round = new Path.Rectangle
        ({
            position: [0, 0],
            width: 7,
            height: BLOCK_HEIGHT,
            radius: 0
        });

        this.graphics = new Group();
        this.graphics.addChild(round);
    }

    private graphics_append_text(content: string)
    {
        const start = this.graphics.bounds.right;

        const text = new PointText
        ({
            point: [start, 0],
            content: content,
            fontSize: '1.25em',
            fillColor: 'white',
            fontFamily: 'jetbrains-mono'
        });
        text.point.y += text.bounds.height * .35;
        // @ts-ignore
        const rect = new Path.Rectangle
        ({
            position: [start + text.bounds.width / 2, 0],
            width: text.bounds.width,
            height: BLOCK_HEIGHT
        });

        const combined = (this.graphics.children[0] as PathItem).unite(rect);

        rect.remove();

        this.graphics.children[0].remove();
        this.graphics.children[0] = combined;
        this.graphics.addChild(text);
    }

    private graphics_add_connector()
    {
        const left = this.graphics.bounds.left;

        const rect = new Path.Rectangle
        ({
            position: [left + 30, BLOCK_HEIGHT - 25],
            width: 46,
            height: 25
        });
        rect.curves[0].point1.x += 12;
        rect.curves[2].point2.x -= 12;

        const combined = (this.graphics.children[0] as PathItem).unite(rect);

        rect.remove();

        this.graphics.children[0].remove();
        this.graphics.children[0] = combined;
    }

    private graphics_add_connectable()
    {
        const left = this.graphics.bounds.left;

        const rect = new Path.Rectangle
        ({
            position: [left + 30, BLOCK_HEIGHT - 65],
            width: 46,
            height: 25
        });
        rect.curves[0].point1.x += 12;
        rect.curves[2].point2.x -= 12;

        const combined = (this.graphics.children[0] as PathItem).subtract(rect);

        rect.remove();

        this.graphics.children[0].remove();
        this.graphics.children[0] = combined;
    }

    private graphics_end(fill: string)
    {
        const start = this.graphics.bounds.right;
        const round = new Path.Rectangle
        ({
            position: [start, 0],
            width: 15,
            height: BLOCK_HEIGHT,
            radius: 0
        });

        const combined = (this.graphics.children[0] as PathItem).unite(round);

        round.remove();

        this.graphics.children[0].remove();
        this.graphics.children[0] = util.round_path(combined as Path, 2.5);

        this.graphics.children[0].fillColor = fill;

        const stroke = new Color(fill);
        stroke.lightness -= 0.125;
        this.graphics.children[0].strokeColor = stroke;
        this.graphics.children[0].strokeJoin = 'round';
        this.graphics.children[0].strokeWidth = 1.5;
        // this.graphics.children[0].selected = true;

    }
}