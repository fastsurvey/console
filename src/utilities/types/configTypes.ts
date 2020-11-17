namespace configTypes {
    export interface SurveyConfig {
        local_id: number;
        admin_name: string;
        survey_name: string;
        start: number;
        end: number;
        mode: 0 | 1 | 2;
        draft: boolean;
        submission_limit: number;
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

    export interface EmailField extends GeneralSurveyField {
        type: 'Email';
        regex: string;
        hint: string;
    }

    export interface OptionField extends GeneralSurveyField {
        type: 'Option';
        title: string;
        description: string;
        mandatory: boolean;
    }

    export interface RadioField extends GeneralSurveyField {
        type: 'Radio';
        title: string;
        description: string;
        fields: FieldOption[];
    }

    export interface SelectionField extends GeneralSurveyField {
        type: 'Selection';
        min_select: number;
        max_select: number;
        fields: FieldOption[];
    }

    export interface FieldOption extends GeneralSurveyField {
        mandatory: false;
    }

    export interface TextField extends GeneralSurveyField {
        type: 'Text';
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

export default configTypes;
