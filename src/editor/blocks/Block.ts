const PADDING: number = 10;

export default abstract class Block
{
    protected parent: Block | undefined;
    protected children: Block[];
    
    constructor()
    {
        this.parent = undefined;
        this.children = [];
    }

    public add_child(child: Block)
    {
        child.parent = this;

        this.children.push(child);
    }

    private top(): Block
    {
        if (!this.parent)
        {
            return this;
        }
        return this.parent.top();
    }

    public render(): void
    {
        // 1. draw child in full size
        // 2. accomodate for child size

        this.draw();

        let w = PADDING;
        let h = 0;

        this.children.forEach(c =>
        {
            c.render();
            c.translate_recursively(w, 0);
            c.translate(0, this.top().height() / 2 - c.height() / 2);

            w += c.width() + PADDING;
            h = Math.max(h, c.height());
        });

        this.expand(w - this.width(), h - this.height() + PADDING);
    }

    public translate_recursively(x: number, y: number): void
    {
        this.translate(x, y);
        this.children.forEach(c => c.translate_recursively(x, y));
    }

    protected abstract translate(x: number, y: number): void;
    protected abstract draw(): void;

    public abstract width(): number;
    public abstract height(): number;

    protected abstract expand(w: number, h: number): void;

    public abstract fill(): string;
    public abstract stroke(): string;
}