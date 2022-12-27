import Rect from "./rect";
import Triangle from "./triangle";
import Circle from "./circle";
import Cross from "./cross";

export const IconNames = {
    Rect: "Rectangle",
    Triangle: "Triangle",
    Circle: "Circle",
    Cross: "Cross",
} as const;

export type IconNames = typeof IconNames[keyof typeof IconNames];

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
        case IconNames.Cross:
            return <Cross width={width} height={height} color={color} strokeWidth={5}/>
        default:
            return <div/>
    }
}

export default Icon;