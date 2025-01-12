import { clone } from "./utils";
export function createHeader({ label, textColorVariable, docUrl }) {
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
    headerTextFills[0] = figma.variables.setBoundVariableForPaint(headerTextFills[0], "color", textColorVariable);
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
    function createRow(label, value) {
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
        textFills[0] = figma.variables.setBoundVariableForPaint(textFills[0], "color", textColorVariable);
        labelText.fills = textFills;
        const valueText = figma.createText();
        valueText.characters = value;
        valueText.fontSize = 14;
        valueText.fontName = { family: "Builder Mono", style: "Regular" };
        const valueFills = clone(valueText.fills);
        valueFills[0] = figma.variables.setBoundVariableForPaint(valueFills[0], "color", textColorVariable);
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
    linkFills[0] = figma.variables.setBoundVariableForPaint(linkFills[0], "color", textColorVariable);
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
