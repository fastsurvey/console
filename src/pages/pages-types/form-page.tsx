import React from 'react';
import {MainWrapper} from 'components';

interface Props {
    children: React.ReactNode;
    image: string;
}
function FormPage(props: Props) {
    return <MainWrapper>{props.children}</MainWrapper>;
}

export default FormPage;
