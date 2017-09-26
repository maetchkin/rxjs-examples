import React                from 'react';
import ChangeBodyThemeClass from 'ChangeBodyThemeClass';

export default class ThemeToggler extends React.Component {

    constructor () {
        super();
        let theme = global.localStorage.getItem( 'theme' ) || 'light';
        ChangeBodyThemeClass( theme );
        this.state = { theme };
    }

    toggle = () => {
        let theme = this.state.theme === 'light' ? 'dark' : 'light';
        global.localStorage.setItem( 'theme', theme );
        ChangeBodyThemeClass( theme );
        this.setState( {theme} )
    }

    render = () =>
        <button className="theme-toggler" onClick={ this.toggle }>
            Toggle theme
        </button>
}