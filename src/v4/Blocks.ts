import StackedBlock from "./StackedBlock";
import Shapes from "./Shapes";
import { Colours, Colour } from "./Colour";
import ReporterBlock from "./ReporterBlock";
import BooleanBlock from "./BooleanBlock";
import Block from "./Block";
import TextProp from "./TextProp";
import ReporterInputProp from "./ReporterInputProp";
import BooleanInputProp from "./BooleanInputProp";

export namespace Blocks
{
    /**
     * Generic Block Format ;; Example for the 'go to' block
     * 
     *  {
     *      shape: 'STACK',
     *      category: 'MOTION',
     *      props:
     *      [
     *          { type: 'text', args: ['go to'] },
     *          { type: 'text', args: ['x:'] },
     *          { type: 'reporter' }
     *          { type: 'text', args: ['y:'] },
     *          { type: 'reporter' }
     *      ]
     *  }
     */


    export function create(desc: string): Block
    {
        const parsed = parse(desc);
        const block = mkshape(parsed.shape, parsed.colour) as Block;

        for (const prop of parsed.props)
        {
            mkprop(block, prop);
        }

        return block;
    }

    export function parse(desc: string): { shape: string, colour: Colour, props: { type: string, args?: any[] }[], virtual: boolean }
    {
        const parsed = eval(`(${desc})`);

        const shape = parsed["shape"].toLowerCase().trim() as string;
        const category = parsed["category"] as string;
        const props = parsed["props"] as { type: string, args?: any[] }[];
        const virtual = parsed["virtual"] as boolean || false;

        const colour = (Colours as any)[category];

        return { shape, colour, props, virtual };
    }

    function mkshape(shape: string, colour: Colour)
    {
        switch (shape)
        {
            case "stack": return new Stack(colour);
            case "boolean": return new Boolean(colour);
            case "reporter": return new Reporter(colour);
            case "hat": return new Hat(colour);
            case "cap": return new Cap(colour);
            default: throw new Error(`Couldn't parse shape "${shape}"`);
        }
    }

    function mkprop(block: Block, desc: { type: string, args?: any[] }): void
    {
        switch (desc.type.toLowerCase())
        {
            case "text": return block["add"](TextProp, ...desc.args);
            case "reporter": return block["add"](ReporterInputProp, ...desc.args);
            case "boolean": return block["add"](BooleanInputProp, ...desc.args);
            default: throw new Error(`Couldn't parse prop "${desc.type}"`);
        }
    }

    class Stack extends StackedBlock
    {
        constructor(colour: Colour)
        {
            super(Shapes.STACK, colour);
        }
    }

    class Reporter extends ReporterBlock { }

    class Boolean extends BooleanBlock { }

    class Hat extends StackedBlock
    {
        constructor(colour: Colour)
        {
            super(Shapes.STACK, colour, true);
        }
    }

    class Cap extends StackedBlock
    {
        constructor(colour: Colour)
        {
            super(Shapes.STACK, colour, false, true);
        }
    }
}