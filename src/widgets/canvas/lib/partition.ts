export function partition<T>(array: Array<T>, isValid: (...args: T[]) => boolean): [T[], T[]] {
    return array.reduce<[T[], T[]]>(([pass, fail], elem) => {
        return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    }, [[], []]);
}

interface MergeItem {
    id: string;
}

export const replaceElementsById = <T extends MergeItem>(initialArray: T[], replacingArray: T[]): T[] =>
    initialArray.map(obj => replacingArray.find(o => o.id === obj.id) || obj);