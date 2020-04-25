import { Group, Item, Path, Rectangle, Raster, PathItem } from "paper";

const CROSS_SIZE = 20;

export namespace Background
{
    let g: Group;

    export function init()
    {
        g = new Group
        ([
            new Path.Rectangle({ width: paper.view.size.width, height: paper.view.size.height, fillColor: '#26282e' })
        ]);

        g.addChild(new Path());
        for (let x = 0; x < g.bounds.width; x += CROSS_SIZE * 3.5)
        {
            for (let y = 0; y < g.bounds.height; y += CROSS_SIZE * 3.5)
            {
                g.addChild(gen_cross(x, y));
            }
        }
    }

    function gen_cross(x: number, y: number): Item
    {
        const g = new Group
        ([
            new Path.Rectangle({ position: [x, y], width: CROSS_SIZE, height: CROSS_SIZE / 9, radius: CROSS_SIZE / 8 }),
            new Path.Rectangle({ position: [x, y], width: CROSS_SIZE / 9, height: CROSS_SIZE, radius: CROSS_SIZE / 8 }),
        ]);
        g.opacity = 0.1;
        g.fillColor = 'white';

        g.rotate(45);

        return g;
    }
}