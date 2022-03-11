export type BaseActionStatusType = 'none' | 'success' | 'error';

export interface ActionStatusInfo {
    type: BaseActionStatusType,
    text: string;
}