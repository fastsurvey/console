import React from 'react';
import {mount, unmount} from '@cypress/react';
import {FieldStateWrapper, fieldElements} from './field-state-wrapper';

const DESCRIPTION =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

it('index is working', () => {
    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                identifier: 4,
                local_id: 0,
                type: 'text',
                description: DESCRIPTION,
                min_chars: 274,
                max_chars: 813,
            }}
            fieldIndex={7}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    fieldElements(7).panel();
    unmount();

    mount(
        <FieldStateWrapper
            initialFieldConfig={{
                identifier: 4,
                local_id: 0,
                type: 'text',
                description: DESCRIPTION,
                min_chars: 274,
                max_chars: 813,
            }}
            fieldIndex={13}
            validation={{valid: true}}
            disabled={false}
        />,
    );
    fieldElements(13).panel();
});
