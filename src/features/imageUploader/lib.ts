export const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            if (typeof fileReader.result !== "string") throw new Error("Can't process input image");

            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};

export const isImgBiggerThanCanvas = (imgWidth: number, imgHeight: number, canvasWidth: number, canvasHeight: number) => {
    return imgWidth > canvasWidth || imgHeight > canvasHeight;
};