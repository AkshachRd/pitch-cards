interface TriangleProps
{
    width: number;
    height: number;
    color: string;
}

const Triangle = ({width, height, color}: TriangleProps) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <polygon points={`${width/2},0 ${width},${height} 0,${height}`} style={{fill: color}}/>
        </svg>
    )
}

export default Triangle;