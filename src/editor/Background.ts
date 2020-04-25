import { Group, Item, Path, Rectangle, Raster, PathItem, Symbol } from "paper";

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

        const cross = new Symbol(gen_cross());

        for (let x = 0; x < g.bounds.width; x += CROSS_SIZE * 3.5)
        {
            for (let y = 0; y < g.bounds.height; y += CROSS_SIZE * 3.5)
            {
                // @ts-ignore
                g.addChild(cross.place([x, y]));
            }
        }
    }

    function gen_cross(): Item
    {
        const g = new Group
        ([
            new Path.Rectangle({ position: [0, 0], width: CROSS_SIZE, height: CROSS_SIZE / 9, radius: CROSS_SIZE / 8 }),
            new Path.Rectangle({ position: [0, 0], width: CROSS_SIZE / 9, height: CROSS_SIZE, radius: CROSS_SIZE / 8 }),
        ]);
        g.opacity = 0.1;
        g.fillColor = 'white';

        g.rotate(45);

        return g;
    }
}