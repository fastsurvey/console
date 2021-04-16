export declare namespace configTypes {
    export interface SurveyConfig {
        local_id: number;
        admin_name: string;
        survey_name: string;
        start: number;
        end: number;
        authentication: 'email' | 'open';
        draft: boolean;
        limit: number;
        title: string;
        description: string;
        fields: SurveyField[];
    }

    export type SurveyField =
        | EmailField
        | OptionField
        | RadioField
        | SelectionField
        | TextField;

    interface GeneralSurveyField {
        local_id: number;
        title: string;
        description: string;
    }

    export type FieldType = 'email' | 'option' | 'radio' | 'selection' | 'text';

    export interface EmailField extends GeneralSurveyField {
        type: 'email';
        regex: string;
        hint: string;
    }

    export interface OptionField extends GeneralSurveyField {
        type: 'option';
        required: boolean;
    }

    export interface RadioField extends GeneralSurveyField {
        type: 'radio';
        fields: FieldOption[];
    }

    export interface SelectionField extends GeneralSurveyField {
        type: 'selection';
        min_select: number;
        max_select: number;
        fields: FieldOption[];
    }

    export interface FieldOption extends GeneralSurveyField {
        type: 'option';
        required: boolean;
    }

    export interface TextField extends GeneralSurveyField {
        type: 'text';
        min_chars: number;
        max_chars: number;
    }

    export interface EmailRegexSetup {
        label: string;
        value: number;
        regex: string;
        hint: string;
    }
}
