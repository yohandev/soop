import { project, Layer, Path, Point, CompoundPath } from "paper";
import Editor from "./Editor";

export default class BlockEditor
{
    private static layer: Layer;

    private static draw()
    {
        const first = project.activeLayer;

        this.layer = new Layer(); // draw above
        this.layer.activate();
        
        const bg = new Path.Rectangle
        ({
            x: 0,
            y: 0,
            width: project.view.size.width,
            height: project.view.size.height,
            fillColor: Editor.Colours.DARK,
            opacity: 0.8
        })

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

        first.activate();
    }

    public static show()
    {
        if (!this.layer)
        {
            this.draw();
        }
        this.layer.visible = true;
    }

    public static hide()
    {
        this.layer.visible = false;
    }
}