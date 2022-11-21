export const exportAsPng = (): string => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    return canvas.toDataURL("image/png");
};