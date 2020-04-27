import { Svg, SVG } from "@svgdotjs/svg.js";

export default class Graphics
{
    private static m_panes: Svg[];

    public static init(): void
    {
        this.m_panes =
        [
            SVG().addTo("body").id("editor").size('100%', '100%')
        ]
    }
}