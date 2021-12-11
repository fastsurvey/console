import React, {useState} from 'react';
import NavbarContent from './navbar-content/navbar-content';

function VisualRegularNavbar(props: {logOut(): void}) {
    const [mouseOver, setMouseOver] = useState(false);

    return (
        <React.Fragment>
            <div
                className={
                    'fixed -left-2 top-0 pl-4 pr-2 pt-3 pb-1 h-100vh group ' +
                    'bg-gray-900 flex-col-left shadow no-selection'
                }
                data-cy='navbar'
                onMouseEnter={() => {
                    setMouseOver(true);
                    console.debug('opening sidebar');
                }}
                onMouseLeave={(e) =>
                    e.clientX < 30 ? setMouseOver(true) : setMouseOver(false)
                }
            >
                <NavbarContent
                    closeNavbar={() => {}}
                    logOut={props.logOut}
                    mouseOver={mouseOver}
                />
            </div>
        </React.Fragment>
    );
}

export default VisualRegularNavbar;
