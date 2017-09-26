import { CONNECTED, INIT }    from 'ConnectionStatuses';
import AppChannel             from 'AppChannel';
import { Observable }         from 'rxjs/Observable';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Subject }            from 'rxjs/Subject';
import                             'rxjs/add/operator/filter';
import                             'rxjs/add/operator/map';
import                             'rxjs/add/operator/distinctUntilChanged';
import                             'rxjs/add/operator/bufferToggle';


var Channel           = AppChannel.sub('socket'),
    ConnectionChannel = AppChannel.sub('socket-connection'),
    ConnectionSubject = new BehaviorSubject( INIT ),
    Messages          = new Subject(),
    send              = channel => content => Messages.next({channel, content}),
    buffer            = []
    ;


ConnectionChannel.subscribe( ConnectionSubject );


Messages.subscribe(
    msg => (
        ConnectionSubject.getValue() === CONNECTED
            ? Channel.send(msg)
            : buffer.push(msg)
    )
);

ConnectionSubject
    .map( status => status === CONNECTED )
    .distinctUntilChanged()
    .subscribe(
        connection => {
            var m;
            while( m = buffer.shift() ){
                Messages.next(m)
            }
        }
    );

export default class SocketChannel {
    constructor( channel ) {
        return Object.assign(
                    Channel
                        .filter   ( msg => msg.channel === channel )
                        .map      ( ({content}) => content         )
                    ,
                    { send: send(channel) }
                )
    }
}