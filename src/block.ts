import { Path, TextItem, PointText, Point, project } from "paper";

export default class block
{
    private graphics: Path.Rectangle;
    private text: PointText;

    constructor()
    {
        this.text = new PointText(new Point(20, 100));
        this.text.fillColor = 'red';
        this.text.content = "hey";
        this.text.fontSize = '1em';

        this.graphics = new Path.Rectangle(new paper.Point(this.text.bounds.left, 100), new paper.Point(this.text.bounds.right, 120));
        this.graphics.fillColor = '#00FF00FF';
        this.graphics.insertBelow(this.text);
    
        // const txt = new TextItem();
        
        // txt.content = "hey";
        // txt.fillColor = 'red';
    }
}