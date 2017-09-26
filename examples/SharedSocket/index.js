import  {
    INIT, ERROR,
    CLOSED, CONNECTION,
    CONNECTED
}                           from 'ConnectionStatuses';
import   AppChannel         from 'AppChannel';
import { BehaviorSubject }  from 'rxjs/BehaviorSubject';
import { Subject }          from 'rxjs/Subject';

var SocketRoute               = `wss://${location.host}/api-socket`,
    SocketChannel             = AppChannel.sub('socket'),
    SocketConnectionChannel   = AppChannel.sub('socket-connection'),
    SocketMessages            = new Subject(),
    SocketConnectionSubject   = new BehaviorSubject( INIT ),
    reconnectTimeout          = 1000,
    Socket,
    SocketSend                = msg => Socket.send( JSON.stringify(msg) );

SocketConnectionSubject.subscribe( SocketConnectionChannel.send );
SocketMessages         .subscribe( SocketChannel          .send );
SocketChannel          .subscribe( SocketSend                   );

SocketConnectionSubject
    .subscribe(
        status => {
            switch (status) {
                
                case INIT: SocketConnectionSubject.next( CONNECTION ); break;
                
                case ERROR: Socket.close(); break;

                case CLOSED:
                    setTimeout(
                        () => SocketConnectionSubject.next( CONNECTION ),
                        reconnectTimeout
                    );
                break;

                case CONNECTION:
                    Socket = new WebSocket( SocketRoute );
                    Socket.onopen    = evt => SocketConnectionSubject.next( CONNECTED            );
                    Socket.onerror   = evt => SocketConnectionSubject.next( ERROR                );
                    Socket.onclose   = evt => SocketConnectionSubject.next( CLOSED               );
                    Socket.onmessage = msg => SocketMessages         .next( JSON.parse(msg.data) );
                break;
            }
        }
    );

global.onconnect = connectEvent => {
    SocketConnectionChannel.send( SocketConnectionSubject.getValue() )
}
