import {types} from '/src/types';

import {
    assertCommonNumbering,
    assertCommonCollapsing,
    assertCommonValidation,
} from './utilities/common-asserts';

const INITIAL_STATE: types.TextField = {
    identifier: 0,
    local_id: 0,
    type: 'text',
    description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    min_chars: 274,
    max_chars: 813,
};

it('numbering, collapsing, validation', () => {
    assertCommonNumbering(INITIAL_STATE);
    assertCommonCollapsing(INITIAL_STATE);
    assertCommonValidation(INITIAL_STATE);
});
