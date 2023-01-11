export const exportAsPng = (): string => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;

    return canvas.toDataURL("image/png");
};

export function exportAsJSON(exportObj: Object, exportName: string){
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}