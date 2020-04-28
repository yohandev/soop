import { Svg, SVG, extend, Rect, Number } from "@svgdotjs/svg.js";

class Rounded extends Rect
{
    public size(w?: string | number | Number | undefined, h?: string | number | Number | undefined): this
    {
        console.log("overloaded");
        
        return this.attr({ width: w, height: h, rx: (h as any) / 5, ry: (h as any) / 5 });
    }
}

export default class Graphics
{
    private static m_panes: Svg[];

    public static init(): void
    {
        this.m_panes =
        [
            SVG().addTo("body").id("editor").size('100%', '100%')
        ]

        const group = this.m_panes[0].group();
        
        group.rect(20, 20).move(50, 100);
        group.rect(1, 1).move(50, 100).fill('red');
        
        const bbox = group.rbox();
        //group.scale(4, 10, bbox.x + bbox.width / 2, bbox.y + bbox.height / 2);

        group.put(new Rounded().size(30, 40).fill('blue').move(50, 100).height(400));        
    }
}