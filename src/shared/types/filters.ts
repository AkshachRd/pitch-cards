export const Filters = {
    None: "None",
    Red: "#F00",
    Blue: "#00F",
    Gray: "#FFF",
    Green: "#0F0"
} as const;

export type Filters = typeof Filters[keyof typeof Filters];