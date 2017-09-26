import { CONNECTED, INIT }    from 'ConnectionStatuses';
import   AppChannel           from 'AppChannel';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Subject }            from 'rxjs/Subject';
import                             'rxjs/add/operator/filter';
import                             'rxjs/add/operator/map';
import                             'rxjs/add/operator/distinctUntilChanged';
import                             'rxjs/add/operator/bufferToggle';

var Channel           = AppChannel.sub('socket'),
    ConnectionSubject = new BehaviorSubject( INIT ),
    Messages          = new Subject(),
    СonnectedSubject  = ConnectionSubject.map( status => status === CONNECTED ).distinctUntilChanged(),
    Notconnected      = СonnectedSubject.filter( connected => !connected ),
    Connected         = СonnectedSubject.filter( connected =>  connected ),
    sendMessages      = (...messages) =>  messages.forEach( Channel.send );

AppChannel
    .sub('socket-connection')
    .subscribe( ConnectionSubject );

Messages
    .filter( ()=> ConnectionSubject.getValue() == CONNECTED )
    .subscribe( sendMessages );

Messages
    .bufferToggle( Notconnected, () => Connected )
    .subscribe( messages => sendMessages(...messages) )

export default class SocketChannel {
    constructor( channel ) {
        return Object.assign(
                    Channel
                        .filter( msg => msg.channel === channel )
                        .map   ( ({content}) => content         )
                    ,
                    { send: content => Messages.next({channel, content}) }
                )
    }
}