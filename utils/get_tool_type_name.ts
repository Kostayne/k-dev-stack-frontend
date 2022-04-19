import { ToolType } from "../enums/tool_type.enum";

export function getToolTypeName(t: ToolType) {
    if (t == ToolType.framework) {
        return 'фреймворк';
    }

    return 'библиотека';
}