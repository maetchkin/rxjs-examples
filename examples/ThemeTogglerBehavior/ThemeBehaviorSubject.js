import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import ChangeBodyThemeClass  from 'ChangeBodyThemeClass';

var DefaultTheme = 'light',

    ThemeBehaviorSubject = new BehaviorSubject(
        global.localStorage.getItem('theme') || DefaultTheme
    );

ThemeBehaviorSubject.toggle = () =>
    ThemeBehaviorSubject.next(
        ThemeBehaviorSubject.getValue() === 'light'
            ? 'dark'
            : 'light'
    )

ThemeBehaviorSubject.subscribe(
    theme => {
        ChangeBodyThemeClass(theme);
        global.localStorage.setItem('theme', theme);
    }
);

export default ThemeBehaviorSubject;