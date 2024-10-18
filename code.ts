// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".

figma.showUI(__html__, { width: 400, height: 400 });

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
  labelText.fontName = { family: "Inter", style: "Bold" };

  labelText.fills = [
    {
      type: "SOLID",
      color: { r: 1, g: 1, b: 1 },
    },
  ];

  const valueText = figma.createText();
  valueText.characters = value;
  valueText.fontSize = 14;
  valueText.fontName = { family: "Inter", style: "Regular" };
  valueText.fills = [
    {
      type: "SOLID",
      color: { r: 1, g: 1, b: 1 },
    },
  ];

  row.appendChild(labelText);
  row.appendChild(valueText);

  return { row, labelText, valueText };
}

function createHeaderCaption(label: string) {
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
  createHeaderHeaderText.characters = label;
  createHeaderHeaderText.fontSize = 14;
  createHeaderHeaderText.fontName = {
    family: "Inter",
    style: "Regular",
  };
  createHeaderHeaderText.fills = [
    {
      type: "SOLID",
      color: { r: 1, g: 1, b: 1 },
    },
  ];

  createHeaderHeader.appendChild(createHeaderHeaderText);

  return createHeaderHeader;
}

function createHeaderDetails({ task, lead, documentationLink, jiraUrl }) {
  const details = figma.createFrame();
  details.layoutMode = "VERTICAL";
  details.counterAxisSizingMode = "AUTO";
  details.primaryAxisSizingMode = "AUTO";
  details.paddingLeft = 16;
  details.paddingRight = 16;
  details.paddingTop = 16;
  details.paddingBottom = 16;
  details.itemSpacing = 4;
  details.fills = [];

  if (task) {
    const design = createRow("🛠️ Task", task);
    details.appendChild(design.row);
  }

  if (lead) {
    const code = createRow("👨‍💻 Design Lead", lead);
    details.appendChild(code.row);
  }

  if (jiraUrl) {
    // use regex to get ticket name from JIRA url
    const jiraTicket = jiraUrl.match(/[A-Z]+-\d+/)?.[0];
    const jira = createRow("🔗 Jira", jiraTicket);

    jira.valueText.hyperlink = {
      type: "URL",
      value: jiraUrl,
    };

    details.appendChild(jira.row);
  }

  const link = figma.createText();
  link.characters = "🔗 Design Documentation";
  link.fontSize = 14;
  link.fontName = { family: "Inter", style: "Regular" };
  if (documentationLink) {
    link.hyperlink = {
      type: "URL",
      value: documentationLink,
    };
  }
  link.fills = [
    {
      type: "SOLID",
      color: { r: 1, g: 1, b: 1 },
    },
  ];

  //@ts-ignore
  details.appendChild(link);

  return details;
}

const generateHandoffSpec = async ({ message, jiraUrl }) => {
  const variables = await getVariables({
    Surface_0: "1f72d46302681ea8675ac6507e562463997e3aa2",
    ContentDefault: "73c1a96f15949c3e8e70d180031dcb8920fbecb3",
    // Add more variables here as needed
  });

  console.log(message);
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

    console.log("Links", node.documentationLinks);
    const specFrame = figma.createFrame();
    specFrame.name = `${node.name} Handoff`;
    specFrame.x = 0;
    specFrame.y = 0;
    specFrame.layoutMode = "VERTICAL";
    specFrame.counterAxisSizingMode = "AUTO";
    specFrame.primaryAxisSizingMode = "AUTO";

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
    headerWrapper.strokeBottomWeight = 1;
    headerWrapper.strokes = [
      {
        type: "SOLID",
        color: { r: 44 / 255, g: 44 / 255, b: 44 / 255 },
      },
    ];
    // bottom border for headerWrapper

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

    const label = figma.createText();
    label.characters = node.name;
    label.fontSize = 48;
    label.fontName = { family: "Inter", style: "Bold" };
    const textFills = clone(label.fills);
    textFills[0] = figma.variables.setBoundVariableForPaint(
      textFills[0],
      "color",
      variables.ContentDefault
    );
    label.fills = [
      {
        type: "SOLID",
        color: { r: 1, g: 1, b: 1 },
      },
    ];

    const specFills = clone(specFrame.fills);
    specFills[0] = figma.variables.setBoundVariableForPaint(
      specFills[0],
      "color",
      variables.Surface_0
    );
    specFrame.fills = specFills;

    const headerDetails = createHeaderDetails({
      task: message.designInitiative,
      lead: message.designLead,
      documentationLink: node.documentationLinks[0].uri ?? null,
      jiraUrl: jiraUrl ?? null,
    });

    const headerCaption = createHeaderCaption("FDK Version 1.0");
    headerCaption.strokeBottomWeight = 1;
    headerCaption.strokes = [
      {
        type: "SOLID",
        color: { r: 44 / 255, g: 44 / 255, b: 44 / 255 },
      },
    ];

    headerWrapper.appendChild(headerCaption);
    headerFrame.appendChild(label);
    headerFrame.appendChild(headerDetails);
    headerWrapper.appendChild(headerFrame);

    headerCaption.layoutSizingHorizontal = "FILL";

    specFrame.appendChild(headerWrapper);

    // Get all variant properties
    const propertyDefinitions = node.componentPropertyDefinitions;
    console.log("Property Definitions: ", propertyDefinitions);

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
    darkModeFrame.name = "Mode Frame";
    darkModeFrame.layoutMode = "VERTICAL";
    darkModeFrame.counterAxisSizingMode = "AUTO";
    darkModeFrame.primaryAxisSizingMode = "AUTO";
    darkModeFrame.paddingLeft = 40;
    darkModeFrame.paddingRight = 40;
    darkModeFrame.paddingTop = 40;
    darkModeFrame.paddingBottom = 40;
    darkModeFrame.itemSpacing = 40;
    darkModeFrame.fills = [];
    darkModeFrame.name = "Dark Mode";
    darkModeFrame.fills = specFills;

    const lightModeFrame = figma.createFrame();
    lightModeFrame.name = "Mode Frame";
    lightModeFrame.layoutMode = "VERTICAL";
    lightModeFrame.counterAxisSizingMode = "AUTO";
    lightModeFrame.primaryAxisSizingMode = "AUTO";
    lightModeFrame.paddingLeft = 40;
    lightModeFrame.paddingRight = 40;
    lightModeFrame.paddingTop = 40;
    lightModeFrame.paddingBottom = 40;
    lightModeFrame.itemSpacing = 40;
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
      propertyFrame.paddingLeft = 0;
      propertyFrame.paddingRight = 0;
      propertyFrame.paddingTop = 0;
      propertyFrame.paddingBottom = 0;
      propertyFrame.itemSpacing = 16;
      propertyFrame.fills = [];

      const propertyFrameText = figma.createText();
      propertyFrameText.characters = key;
      propertyFrameText.fontSize = 16;
      propertyFrameText.fontName = { family: "Inter", style: "Regular" };
      propertyFrameText.fills = [
        {
          type: "SOLID",
          color: { r: 1, g: 1, b: 1 },
        },
      ];
      propertyFrame.appendChild(propertyFrameText);

      const propertyFrameRow = figma.createFrame();
      propertyFrameRow.name = "Property Row";
      propertyFrameRow.layoutMode = "HORIZONTAL";
      propertyFrameRow.counterAxisSizingMode = "AUTO";
      propertyFrameRow.primaryAxisSizingMode = "AUTO";
      propertyFrameRow.paddingLeft = 0;
      propertyFrameRow.paddingRight = 0;
      propertyFrameRow.paddingTop = 0;
      propertyFrameRow.paddingBottom = 0;
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

          const variantProperty = variant.variantProperties?.[key];
          console.log("Variant Property", variantProperty);
          const variantFrame = figma.createFrame();
          variantFrame.name = "Variant";
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
          text.fontName = { family: "Inter", style: "Regular" };
          text.fills = [
            {
              type: "SOLID",
              color: { r: 1, g: 1, b: 1 },
            },
          ];

          const instance = variant.createInstance();

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

    // headerFrame.layoutSizingHorizontal = "FILL";
    // headerFrame.name = "Header";

    headerWrapper.layoutSizingHorizontal = "FILL";
    headerFrame.layoutSizingHorizontal = "FILL";
    headerFrame.primaryAxisAlignItems = "SPACE_BETWEEN";
    headerFrame.counterAxisAlignItems = "CENTER";
  }
};

// figma.on("run", generateHandoffSpec);

figma.ui.on("message", (message) => {
  if (message.type === "create-handoff-spec") {
    console.log("Received message:", message);
    console.log("Received message:", message.jiraUrl);
    generateHandoffSpec({ message, jiraUrl: message.jiraUrl });
  }
});
