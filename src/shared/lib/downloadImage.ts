export const downloadImage = (blob: string, fileName: string): void => {
    const fakeLink = window.document.createElement("a");
    fakeLink.setAttribute("style", "display:none");
    fakeLink.download = fileName;
    fakeLink.href = blob;

    document.body.appendChild(fakeLink);
    fakeLink.click();
    document.body.removeChild(fakeLink);

    fakeLink.remove();
};