export async function getVariables(keys: { [name: string]: string }) {
  const variables: { [name: string]: Variable } = {};

  for (const [name, key] of Object.entries(keys)) {
    variables[name] = await figma.variables.importVariableByKeyAsync(key);
  }

  return variables;
}

export function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export async function loadFonts(
  fontsToLoad: Array<{ family: string; style: string }>
) {
  const fontLoadPromises = fontsToLoad.map((font) => figma.loadFontAsync(font));

  await Promise.all(fontLoadPromises);
}

// Usage example:
// await loadFonts(fonts);
