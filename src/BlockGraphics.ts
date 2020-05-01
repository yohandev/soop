import { G, Element, Container } from "@svgdotjs/svg.js"

export default class BlockGraphics
{
    private m_group: G;
    private m_elems: (Element | undefined)[];

    constructor(capacity: number, where: Container)
    {
        this.m_group = where.group();
        this.m_elems = new Array(capacity);
    }

    public drawn(i: number): boolean
    {
        return this.m_elems[i] !== undefined;
    }

    public draw(i: number, e: Element): void
    {
        this.erase(i);

        this.m_group.add(e);
        this.m_elems[i] = e;
    }

    public erase(i: number): void
    {
        if (!this.drawn(i))
        {
            return;
        }
        this.m_elems[i]!.remove();
        this.m_elems[i] = undefined;
    }

    public get(i: number)
    {
        return this.m_elems[i];
    }

    public get group(): G
    {
        return this.m_group;
    }

    public get count(): number
    {
        return this.m_elems.length;
    }
}