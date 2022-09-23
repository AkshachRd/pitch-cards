import Rect from "./rect";
import Triangle from "./triangle";
import Circle from "./circle";

export enum IconNames
{
    Rect = "rect",
    Triangle = "triangle",
    Circle = "circle",
}

interface IconProps
{
    width: number;
    height: number;
    color: string;
    name: IconNames;
}

const Icon = ({width, height, color, name}: IconProps) => {
    switch (name)
    {
        case IconNames.Rect:
            return <Rect width={width} height={height} color={color}/>
        case IconNames.Triangle:
            return <Triangle width={width} height={height} color={color}/>
        case IconNames.Circle:
            return <Circle width={width} height={height} color={color}/>
        default:
            return <div/>
    }
}

export default Icon;