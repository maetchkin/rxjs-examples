import { Subject } from 'rxjs/Subject';
import                  'rxjs/add/operator/map';
import                  'rxjs/add/operator/filter';

var ChannelBus     = new BroadcastChannel('application'),
    ChannelSubject = new Subject(),
    AppChannel     = ChannelSubject.map( ({data}) => data );

bus.onmessage = event => ChannelSubject.next( event )

AppChannel.sub = sub => Object.assign(
    AppChannel
        .filter ( msg => msg.sub == sub )
        .map    ( ({msg}) => JSON.parse(msg) ),
    {
        send: msg =>
            ChannelBus.postMessage(
                { sub, msg: JSON.stringify(msg) }
            )
    }
)

export default AppChannel;