import Class from "../vm/Class";
import { Group, Path } from "paper";

const TABS_WIDTH = 50;
const TOTAL_WIDTH = 300;

export namespace Palette
{
    let graphics: Group;
    let target: Class;

    export function init(target?: Class)
    {
        if (graphics)
        {
            graphics.remove();
        }
        graphics = new Group();

        graphics.addChild(new Path.Rectangle
        ({
            width: TABS_WIDTH,
            height: paper.view.size.height,
            fillColor: '#26282e'
        }));

        graphics.addChild(new Path.Rectangle
        ({
            x:TABS_WIDTH,
            width: TOTAL_WIDTH - TABS_WIDTH,
            height: paper.view.size.height,
            fillColor: '#73797d',
            opacity: 0.5
        }));
        
    }
}