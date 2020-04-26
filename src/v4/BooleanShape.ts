import { Path } from "paper";
import Shape from "./Shape";

export default class BooleanShape extends Shape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M20.71.5h105l20,20h0l-20,20h-105l-20-20h0Z`);
        this.width = 70;
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
        const a = Math.max(70, n) - this.width;

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