import Shape from "./Shape";
import { Path } from "paper";

export default class StackShape extends Shape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M.5,4.5a4,4,0,0,1,4-4h8a5.2,5.2,0,0,1,4,2l4,4a5.2,5.2,0,0,0,4,2h12a5.2,5.2,0,0,0,4-2l4-4a5.2,5.2,0,0,1,4-2h131a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H48.5a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`);
    }

    public get path(): paper.Item
    {
        return this.m_path;
    }

    public get width(): number
    {
        return this.m_path.bounds.width;
    }

    public set width(n: number) // 10-13 inclusive
    {
        const a = Math.max(n, 60) - this.width;

        this.range(10, 13).forEach(n => this.m_path.segments[n].point.x += a);
    }

    public get height(): number
    {
        return this.m_path.segments[13].point.y - this.m_path.segments[10].point.y; // ignore btm notch
    }

    public set height(n: number) // 12-23 inclusive
    {
        const a = n - this.height;

        this.range(12, 23).forEach(n => this.m_path.segments[n].point.y += a);
    }
}