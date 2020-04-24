import { Item, Path } from "paper";

export default abstract class BlockShape
{
    public abstract draw(): void;
    public abstract grow(h: number, v: number): void;
    public abstract path(): Item;

    public abstract width(): number;
    public abstract height(): number;
}

export class BooleanBlockShape extends BlockShape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M20.71.5h105l20,20h0l-20,20h-105l-20-20h0Z`);
    }

    public grow(h: number, v: number): void
    {
        [1, 2, 3, 4].forEach(i => this.m_path.segments[i].point.x += h); // TODO vertical growth too
    }

    public path(): Item
    {
        return this.m_path;
    }
}

export class StackBlockShape extends BlockShape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M.5,4.5a4,4,0,0,1,4-4h8a5.2,5.2,0,0,1,4,2l4,4a5.2,5.2,0,0,0,4,2h12a5.2,5.2,0,0,0,4-2l4-4a5.2,5.2,0,0,1,4-2h131a4,4,0,0,1,4,4v40a4,4,0,0,1-4,4H48.5a5.2,5.2,0,0,0-4,2l-4,4a5.2,5.2,0,0,1-4,2h-12a5.2,5.2,0,0,1-4-2l-4-4a5.2,5.2,0,0,0-4-2h-8a4,4,0,0,1-4-4Z`);
    }

    public grow(h: number, v: number): void
    {
        [10, 11, 12, 13].forEach(i => this.m_path.segments[i].point.x += h); // TODO vertical growth too
    }

    public path(): Item
    {
        return this.m_path;
    }
}

export class ReporterBlockShape extends BlockShape
{
    private m_path: Path;

    public draw(): void
    {
        this.m_path = new Path(`M20.5.5h45a20,20,0,0,1,20,20h0a20,20,0,0,1-20,20h-45a20,20,0,0,1-20-20h0A20,20,0,0,1,20.5.5Z`);
    }

    public grow(h: number, v: number): void
    {
        [1, 2, 3, 4].forEach(i => this.m_path.segments[i].point.x += h); // TODO vertical growth too
    }

    public path(): Item
    {
        return this.m_path;
    } 
}