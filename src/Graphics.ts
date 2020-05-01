import { Svg, SVG, Shape, Rect, Number } from "@svgdotjs/svg.js";

class Empty extends Rect
{

}

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

        this.m_panes[0].rect(200, 200).move(300, 300).x(0);
    }
}