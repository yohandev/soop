import { Path } from "paper";
import Shape from "./Shape";

export default class HatShape extends Shape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M.5,20.5a20,20,0,0,1,20-20h92a20,20,0,0,1,20,20v52a4,4,0,0,1-4,4h-80a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`);
    }

    public get path(): paper.Item
    {
        return this.m_path;
    }

    public get width(): number
    {
        return this.m_path.bounds.width;
    }

    public set width(n: number) // 2-5 inclusive
    {
        const a = n - this.width;

        this.range(2, 5).forEach(n => this.m_path.segments[n].point.x += a);
    }

    public get height(): number
    {
        return this.m_path.segments[5].point.y - this.m_path.segments[2].point.y;
    }

    public set height(n: number) // 4-15 inclusive
    {
        const a = n - this.height;

        this.range(4, 15).forEach(n => this.m_path.segments[n].point.y += a);
    }
}