// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".

figma.showUI(__html__);

figma.variables.getLocalVariablesAsync().then((localVariables) => {
  console.log("Local Variables", localVariables);

  const variable = localVariables[0];
  console.log("Variable", variable);
});

async function getVariables(keys: { [name: string]: string }) {
  const variables: { [name: string]: Variable } = {};

  for (const [name, key] of Object.entries(keys)) {
    variables[name] = await figma.variables.importVariableByKeyAsync(key);
  }

  return variables;
}

function clone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function createHeader({ label, textColorVariable, docUrl }) {
  const headerWrapper = figma.createFrame();
  headerWrapper.layoutMode = "VERTICAL";
  headerWrapper.counterAxisSizingMode = "AUTO";
  headerWrapper.primaryAxisSizingMode = "AUTO";
  headerWrapper.paddingLeft = 0;
  headerWrapper.paddingRight = 0;
  headerWrapper.paddingTop = 0;
  headerWrapper.paddingBottom = 0;
  headerWrapper.itemSpacing = 0;
  headerWrapper.fills = [];

  const headerFrame = figma.createFrame();
  headerFrame.layoutMode = "HORIZONTAL";
  headerFrame.counterAxisSizingMode = "AUTO";
  headerFrame.primaryAxisSizingMode = "AUTO";
  headerFrame.paddingLeft = 48;
  headerFrame.paddingRight = 48;
  headerFrame.paddingTop = 48;
  headerFrame.paddingBottom = 48;
  headerFrame.itemSpacing = 16;
  headerFrame.fills = [];

  const createHeaderHeader = figma.createFrame();
  createHeaderHeader.layoutMode = "HORIZONTAL";
  createHeaderHeader.counterAxisSizingMode = "AUTO";
  createHeaderHeader.primaryAxisSizingMode = "AUTO";
  createHeaderHeader.paddingLeft = 48;
  createHeaderHeader.paddingRight = 48;
  createHeaderHeader.paddingTop = 24;
  createHeaderHeader.paddingBottom = 24;
  createHeaderHeader.itemSpacing = 0;
  createHeaderHeader.fills = [];
  createHeaderHeader.name = "Header Details";

  const createHeaderHeaderText = figma.createText();
  createHeaderHeaderText.characters = "Foundation Redesign 2024";
  createHeaderHeaderText.fontSize = 14;
  createHeaderHeaderText.fontName = {
    family: "Builder Mono",
    style: "Regular",
  };
  const headerTextFills = clone(createHeaderHeaderText.fills);
  headerTextFills[0] = figma.variables.setBoundVariableForPaint(
    headerTextFills[0],
    "color",
    textColorVariable
  );
  createHeaderHeaderText.fills = headerTextFills;

  createHeaderHeader.appendChild(createHeaderHeaderText);
  headerWrapper.appendChild(createHeaderHeader);

  headerFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
  const details = figma.createFrame();
  details.layoutMode = "VERTICAL";
  details.counterAxisSizingMode = "AUTO";
  details.primaryAxisSizingMode = "AUTO";
  details.paddingLeft = 16;
  details.paddingRight = 16;
  details.paddingTop = 16;
  details.paddingBottom = 16;
  details.itemSpacing = 0;
  details.fills = [];

  function createRow(label: string, value: string) {
    const row = figma.createFrame();
    row.layoutMode = "HORIZONTAL";
    row.counterAxisSizingMode = "AUTO";
    row.primaryAxisSizingMode = "AUTO";
    row.paddingLeft = 0;
    row.paddingRight = 0;
    row.paddingTop = 0;
    row.paddingBottom = 0;
    row.itemSpacing = 16;
    row.fills = [];

    const labelText = figma.createText();
    labelText.characters = label + ":";
    labelText.fontSize = 14;
    labelText.fontName = { family: "Builder Mono", style: "Bold" };
    const textFills = clone(labelText.fills);
    textFills[0] = figma.variables.setBoundVariableForPaint(
      textFills[0],
      "color",
      textColorVariable
    );
    labelText.fills = textFills;

    const valueText = figma.createText();
    valueText.characters = value;
    valueText.fontSize = 14;
    valueText.fontName = { family: "Builder Mono", style: "Regular" };
    const valueFills = clone(valueText.fills);
    valueFills[0] = figma.variables.setBoundVariableForPaint(
      valueFills[0],
      "color",
      textColorVariable
    );
    valueText.fills = valueFills;

    row.appendChild(labelText);
    row.appendChild(valueText);

    return row;
  }

  const design = createRow("Design", "Foundation Redesign 2024");
  const code = createRow("Design Lead", "Matthew Ortega");
  const jira = createRow("Jira", "UI-Blox 1143");

  const link = figma.createText();
  link.characters = "Design Documentation";
  link.fontSize = 14;
  link.fontName = { family: "Builder Mono", style: "Regular" };
  const linkFills = clone(link.fills);
  linkFills[0] = figma.variables.setBoundVariableForPaint(
    linkFills[0],
    "color",
    textColorVariable
  );
  link.fills = linkFills;

  details.appendChild(design);
  details.appendChild(code);
  details.appendChild(jira);
  details.appendChild(link);
  headerFrame.appendChild(label);
  headerFrame.appendChild(details);

  headerWrapper.appendChild(headerFrame);

  return headerWrapper;
}

const doTheThing = async () => {
  const variables = await getVariables({
    Surface_0: "1f72d46302681ea8675ac6507e562463997e3aa2",
    ContentDefault: "73c1a96f15949c3e8e70d180031dcb8920fbecb3",
    // Add more variables here as needed
  });
  // @ts-ignore
  console.log("Surface_0 variable:", variables.Surface_0);

  console.log("Collection Variables", variables);

  await figma.loadFontAsync({
    family: "Inter",
    style: "Bold",
  });

  await figma.loadFontAsync({
    family: "Builder Mono",
    style: "Regular",
  });

  await figma.loadFontAsync({
    family: "Builder Mono",
    style: "Bold",
  });

  await figma.loadFontAsync({
    family: "Inter",
    style: "Regular",
  });

  await figma.loadFontAsync({
    family: "Builder Sans",
    style: "Bold",
  });

  await figma.loadFontAsync({
    family: "Builder Extended",
    style: "Bold",
  });

  const nodes = figma.currentPage.selection;
  const node = nodes[0];

  if (node && node.type === "COMPONENT_SET") {
    console.log("Selected node is a component set:", node);

    const specFrame = figma.createFrame();
    specFrame.name = `${node.name} Handoff`;
    specFrame.x = 0;
    specFrame.y = 0;
    specFrame.layoutMode = "VERTICAL";
    specFrame.counterAxisSizingMode = "AUTO";
    specFrame.primaryAxisSizingMode = "AUTO";

    const label = figma.createText();
    label.characters = node.name;
    label.fontSize = 48;
    label.fontName = { family: "Builder Extended", style: "Bold" };
    const textFills = clone(label.fills);
    textFills[0] = figma.variables.setBoundVariableForPaint(
      textFills[0],
      "color",
      variables.ContentDefault
    );
    label.fills = textFills;

    const specFills = clone(specFrame.fills);
    specFills[0] = figma.variables.setBoundVariableForPaint(
      specFills[0],
      "color",
      variables.Surface_0
    );
    specFrame.fills = specFills;

    const headerFrame = createHeader({
      label,
      textColorVariable: variables.ContentDefault,
      docUrl:
        "https://www.figma.com/design/1234567890/Foundation-Redesign-2024",
    });

    specFrame.appendChild(headerFrame);

    // Get all variant properties
    const propertyDefinitions = node.componentPropertyDefinitions;
    console.log("I am the definitions", propertyDefinitions);

    const contentFrame = figma.createFrame();
    contentFrame.name = "Content Frame";
    contentFrame.layoutMode = "HORIZONTAL";
    contentFrame.counterAxisSizingMode = "AUTO";
    contentFrame.primaryAxisSizingMode = "AUTO";
    contentFrame.paddingLeft = 0;
    contentFrame.paddingRight = 0;
    contentFrame.paddingTop = 0;
    contentFrame.paddingBottom = 0;
    contentFrame.itemSpacing = 0;
    contentFrame.fills = [];

    const darkModeFrame = figma.createFrame();
    darkModeFrame.layoutMode = "VERTICAL";
    darkModeFrame.counterAxisSizingMode = "AUTO";
    darkModeFrame.primaryAxisSizingMode = "AUTO";
    darkModeFrame.paddingLeft = 16;
    darkModeFrame.paddingRight = 16;
    darkModeFrame.paddingTop = 16;
    darkModeFrame.paddingBottom = 16;
    darkModeFrame.itemSpacing = 16;
    darkModeFrame.fills = [];
    darkModeFrame.name = "Dark Mode";
    darkModeFrame.fills = specFills;

    const lightModeFrame = figma.createFrame();
    lightModeFrame.layoutMode = "VERTICAL";
    lightModeFrame.counterAxisSizingMode = "AUTO";
    lightModeFrame.primaryAxisSizingMode = "AUTO";
    lightModeFrame.paddingLeft = 16;
    lightModeFrame.paddingRight = 16;
    lightModeFrame.paddingTop = 16;
    lightModeFrame.paddingBottom = 16;
    lightModeFrame.itemSpacing = 16;
    lightModeFrame.fills = [];
    lightModeFrame.name = "Light Mode";
    lightModeFrame.fills = specFills;

    Object.keys(propertyDefinitions).forEach((key) => {
      const property = propertyDefinitions[key];
      console.log("I am the property", property);

      if (property.type !== "VARIANT") {
        return;
      }

      // Create an auto-layout frame for each property
      const propertyFrame = figma.createFrame();
      propertyFrame.name = `Property: ${key}`;
      propertyFrame.layoutMode = "VERTICAL";
      propertyFrame.counterAxisSizingMode = "AUTO";
      propertyFrame.primaryAxisSizingMode = "AUTO";
      propertyFrame.paddingLeft = 16;
      propertyFrame.paddingRight = 16;
      propertyFrame.paddingTop = 16;
      propertyFrame.paddingBottom = 16;
      propertyFrame.itemSpacing = 16;
      propertyFrame.fills = [];

      const propertyFrameText = figma.createText();
      propertyFrameText.characters = key;
      propertyFrameText.fontSize = 16;
      propertyFrameText.fontName = { family: "Builder Mono", style: "Regular" };
      propertyFrameText.fills = textFills;
      propertyFrame.appendChild(propertyFrameText);

      const propertyFrameRow = figma.createFrame();
      propertyFrameRow.layoutMode = "HORIZONTAL";
      propertyFrameRow.counterAxisSizingMode = "AUTO";
      propertyFrameRow.primaryAxisSizingMode = "AUTO";
      propertyFrameRow.paddingLeft = 16;
      propertyFrameRow.paddingRight = 16;
      propertyFrameRow.paddingTop = 16;
      propertyFrameRow.paddingBottom = 16;
      propertyFrameRow.itemSpacing = 16;
      propertyFrameRow.fills = [];

      const currentProperty = propertyDefinitions[key];
      console.log(currentProperty);

      const currentVariantOptions = currentProperty.variantOptions;
      console.log("Current Variant Options", currentVariantOptions);

      // Check if currentVariantOptions is not undefined
      if (!currentVariantOptions) {
        return;
      }

      currentVariantOptions.forEach((option) => {
        console.log(option);
        const matchingVariant = node.children.filter(
          (child): child is ComponentNode =>
            child.type === "COMPONENT" &&
            child.variantProperties?.[key] === option &&
            Object.entries(child.variantProperties || {}).every(
              ([propKey, propValue]) =>
                propKey === key ||
                propValue === propertyDefinitions[propKey]?.defaultValue
            )
        );

        console.log("Matching variant:", matchingVariant);
        matchingVariant.forEach((variant) => {
          console.log("Variant Properties", variant.variantProperties);

          // if (interactable) {
          //   console.log("Interactable", interactable);
          //   // remove the interactable from the variant
          //   interactable.remove();
          // }

          const variantProperty = variant.variantProperties?.[key];
          console.log("Variant Property", variantProperty);
          const variantFrame = figma.createFrame();
          variantFrame.layoutMode = "VERTICAL";
          variantFrame.counterAxisSizingMode = "AUTO";
          variantFrame.primaryAxisSizingMode = "AUTO";
          variantFrame.paddingLeft = 16;
          variantFrame.paddingRight = 16;
          variantFrame.paddingTop = 16;
          variantFrame.paddingBottom = 16;
          variantFrame.itemSpacing = 16;
          variantFrame.fills = [];

          console.log(variant.name);

          const text = figma.createText();
          text.characters = `${key}=${variantProperty}`;
          text.fontSize = 14;
          text.fontName = { family: "Builder Mono", style: "Regular" };
          text.fills = textFills;
          text.opacity = 0.7;

          const instance = variant.createInstance();
          // const interactable = instance.findOne(
          //   (child) => child.name === "Interactable"
          // );

          // if (interactable) {
          //   console.log("Interactable", interactable);
          //   // remove the interactable from the variant
          //   interactable.remove();
          //   instance.hide
          // }

          variantFrame.appendChild(instance);

          variantFrame.appendChild(text);
          propertyFrameRow.appendChild(variantFrame);
        });
      });

      propertyFrame.appendChild(propertyFrameRow);

      // Append the propertyFrame to the specFrame after processing all variants
      darkModeFrame.appendChild(propertyFrame);
      const clone = propertyFrame.clone();

      lightModeFrame.appendChild(clone);
    });

    contentFrame.appendChild(darkModeFrame);
    contentFrame.appendChild(lightModeFrame);
    specFrame.appendChild(contentFrame);
  }
};

figma.on("run", doTheThing);
