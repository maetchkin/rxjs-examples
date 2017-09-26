import { BehaviorSubject }   from 'rxjs/BehaviorSubject';
import AppChannel            from 'AppChannel';
import ChangeBodyThemeClass  from 'ChangeBodyThemeClass';
import                            'rxjs/add/operator/distinctUntilChanged';

var DefaultTheme = 'light',

    ThemeBehaviorSubject = new BehaviorSubject(
        global.localStorage.getItem('theme') || DefaultTheme
    ),

    Channel = AppChannel.sub('theme'),

ThemeBehaviorSubject.toggle = () =>
    ThemeBehaviorSubject.next(
        ThemeBehaviorSubject.getValue() === 'light'
            ? 'dark'
            : 'light'
    )

ThemeBehaviorSubject
    .distinctUntilChanged()
    .subscribe(
        theme => {
            ChangeBodyThemeClass(theme);
            global.localStorage.setItem('theme', theme);
            Channel.send(theme);
        }
    );

Channel.subscribe( ThemeBehaviorSubject );

export default ThemeBehaviorSubject;