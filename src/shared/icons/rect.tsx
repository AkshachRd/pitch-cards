interface RectProps
{
    width: number;
    height: number;
    color: string;
}

const Rect = ({width, height, color}: RectProps) => {
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <rect width={width} height={height} style={{fill: color}}/>
        </svg>
    )
}

export default Rect;