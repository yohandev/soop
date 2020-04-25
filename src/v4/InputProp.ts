import Prop from "./Prop";
import NestedBlock from "./NestedBlock";
import Shape from "./Shape";
import { Colour } from "./Colour";

export default abstract class InputProp<T extends NestedBlock> extends Prop
{
    private m_value: T | undefined;
    private m_empty: Shape;

    public draw(): void
    {
        if (this.m_value)
        {
            this.m_value.draw();
        }
        else
        {
            const e = this.empty;

            this.m_empty = e.shape;

            this.m_empty.draw();
            this.m_empty.colour(e.colour);
        }
    }

    public erase(): void
    {
        if (this.m_empty)
        {
            this.m_empty.erase();
        }
    }

    public get path(): paper.Item
    {
        if (this.m_value)
        {
            return this.m_value.group;
        }
        else if (this.m_empty)
        {
            return this.m_empty.path;
        }

        return undefined;
    }

    public get width(): number
    {
        if (this.m_value)
        {
            return this.m_value.shape.width;
        }
        else
        {
            return this.m_empty.width;
        }
    }

    public set width(n: number)
    {
        if (this.m_value)
        {
            this.m_value.shape.width = n;
        }
        else
        {
            this.m_empty.width = n;   
        }
    }

    public get height(): number
    {
        if (this.m_value)
        {
            return this.m_value.shape.height;
        }
        else
        {
            return this.m_empty.height;
        }
    }

    public set height(n: number)
    {
        if (this.m_value)
        {
            this.m_value.shape.height = n;
        }
        else
        {
            this.m_empty.height = n;
        }
    }
    
    protected abstract get empty(): { shape: Shape, colour: Colour };
}