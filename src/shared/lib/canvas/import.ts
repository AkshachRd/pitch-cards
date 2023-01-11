/**
 * Select file(s).
 * @returns {Promise<ReturnType<typeof JSON.parse>>} A promise of a file or array of files in case the multiple parameter is true.
 */
export function loadJSON(): Promise<ReturnType<typeof JSON.parse>> {
    return new Promise((resolve, reject) => {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "json";

        input.onchange = (e) => {
            if (!input.files || input.files.length < 1) {
                reject("no selected files")
            }
            let file = input.files![0];
            let reader = new FileReader();
            reader.onload = (e) => {
                let content = e.target!.result;
                if (typeof content === "string") {
                    resolve(JSON.parse(content));
                }
                else {
                    reject("wrong file content");
                }
            }
            reader.readAsText(file,'UTF-8');
        };

        input.click();
    });
}