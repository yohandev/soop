import StackBlock from "./StackBlock";

export default class MethodBlock extends StackBlock
{
    protected draw(): void
    {
        this.graphics_begin();
        this.graphics_append_text("This is a method block");
        this.graphics_append_space(90);
        this.graphics_make_connector();
        this.graphics_end("#c71c49");
        this.graphics_make_hat();
    }
}