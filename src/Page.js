import React from 'react';

export default function Page({children, ButtonComponent, TextComponent}) {
    return (
        <div>
            <header>
                <div className={"BG"}>
                    {ButtonComponent && <ButtonComponent/>}
                    {TextComponent && <TextComponent/>}
                </div>
            </header>
            {children}
            {/*<footer></footer>*/}
        </div>)
}


Page.defaultProps = {
    ButtonComponent: null,
    TextComponent: ""
};