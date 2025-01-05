
export const getParsedValue = (name: string) => {
    const value = localStorage.getItem(name);

    if (value === null) {
        return null;
    }

    return JSON.parse(value);
}
export const getPlainValue = (name: string) => {
    return localStorage.getItem(name);
}

export const setParsedValue = (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value));
}

export const setPlainValue = (name: string, value: string) => {
    localStorage.setItem(name, value);
}
