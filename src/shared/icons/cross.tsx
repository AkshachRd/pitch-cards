interface CrossProps
{
    width: number;
    height: number;
    color: string;
    strokeWidth: number;
}

const Cross = ({width, height, color, strokeWidth}: CrossProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" 
            width={width} 
            height={height}
            viewBox={`0 0 ${width} ${height}`} 
            overflow="visible" 
            stroke={color} 
            strokeWidth={strokeWidth}
            strokeLinecap="square"
        >
            <line x2={width} y2={height} />
            <line x1={width} y2={height} />
        </svg>
    )
}

export default Cross;