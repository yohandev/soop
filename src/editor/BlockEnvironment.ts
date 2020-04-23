import Block from "./blocks/Block";

export namespace BlockEnvironment
{
    let blocks: Block[]; // floating blocks only, not stacked or nested

    export function init()
    {
        blocks = [];
    }

    export function add(block: Block)
    {
        blocks.push(block);
    }

    export function render()
    {
        blocks.forEach(b => b.render());
    }
}