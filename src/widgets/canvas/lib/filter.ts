import {Filters} from "shared/types";

const hexToRgb = (hex: string) => {
    const replaced = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
        , (m: string, r: string, g: string, b: string) => '#' + r + r + g + g + b + b)
        .substring(1).match(/.{2}/g);
    if (!replaced) throw new Error("Hex input string can't be processed");

    return replaced.map((x) => parseInt(x, 16))
}

export const applyFilter = (ctx: CanvasRenderingContext2D, filter: Filters, opacity = 0.5) => {
    if (filter === Filters.None) return;

    const [r, g, b] = hexToRgb(filter);
    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}