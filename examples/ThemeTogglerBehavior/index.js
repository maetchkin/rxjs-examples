
import React                from 'react';
import ChangeBodyThemeClass from 'ChangeBodyThemeClass';
import ThemeBehaviorSubject from './ThemeBehaviorSubject.js';


export default class ThemeToggler_Behavior extends React.Component {

    componentWillMount() {
        this.subscription = ThemeBehaviorSubject.subscribe(
                                $ => this.setState($)
                            );
    }

    componentWillUnmount() {
        this.subscription.unsubscribe();
    }

    render () {
        return  <button
                    onClick={ ThemeBehaviorSubject.toggle }
                    className="theme-toggler"
                >
                    Toggle theme
                </button>
    }
}