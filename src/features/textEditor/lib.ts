const trimFontName = (fontName: string) => {
    if (fontName[0] === "'" && fontName.slice(-1) === "'")
    {
        return fontName.slice(1, -1);
    }

    return fontName;
};

export const getFontFamilyName = (fontFamily: string) => {
    return trimFontName(fontFamily.substring(0, fontFamily.indexOf(",")));
};