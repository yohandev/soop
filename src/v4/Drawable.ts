export default abstract class Drawable
{
    public abstract draw(): void;
    public abstract erase(): void;

    public abstract get path(): paper.Item;

    public abstract get width(): number;
    public abstract set width(n:number);

    public abstract get height(): number;
    public abstract set height(n:number);
}