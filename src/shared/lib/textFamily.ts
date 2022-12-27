import {FontFamily} from "../types";

const trimFontFamilyName = (fontFamilyName: string) => {
    if (fontFamilyName[0] === "'" && fontFamilyName.slice(-1) === "'")
    {
        return fontFamilyName.slice(1, -1);
    }

    return fontFamilyName;
};

export const getFontFamilyName = (fontFamily: FontFamily) => {
    return trimFontFamilyName(fontFamily.substring(0, fontFamily.indexOf(",")));
};