interface CircleProps
{
    width: number;
    height: number;
    color: string;
}

const Circle = ({width, height, color}: CircleProps) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <circle cx={width/2} cy={height/2} r={width/2} style={{fill: color}}/>
        </svg>
    )
}

export default Circle;