import { Path } from "paper";
import Shape from "./Shape";

export default class ReporterShape extends Shape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M20.5.5h45a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20h-45a20,20,0,0,1-20-20h0A20,20,0,0,1,20.5.5Z`);
        this.width = 50;
    }

    public get path(): paper.Item
    {
        return this.m_path;
    }

    public get width(): number
    {
        return this.m_path.bounds.width;
    }

    public set width(n: number) // 1-4 inclusive
    {
        const a = Math.max(50, n) - this.width;

        this.range(1, 4).forEach(n => this.m_path.segments[n].point.x += a);
    }

    public get height(): number
    {
        return this.m_path.bounds.height;
    }

    public set height(n: number) // 3-6 inclusive
    {
        const a = n - this.height;

        this.range(3, 6).forEach(n => this.m_path.segments[n].point.y += a);
    }
}