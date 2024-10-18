export async function getVariables(keys) {
    const variables = {};
    for (const [name, key] of Object.entries(keys)) {
        variables[name] = await figma.variables.importVariableByKeyAsync(key);
    }
    return variables;
}
export function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}
export async function loadFonts(fontsToLoad) {
    const fontLoadPromises = fontsToLoad.map((font) => figma.loadFontAsync(font));
    await Promise.all(fontLoadPromises);
}
// Usage example:
// await loadFonts(fonts);
