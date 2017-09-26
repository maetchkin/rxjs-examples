import AppChannel from 'AppChannel';

export default function SocketChannel( channel ){

    return Object.assign(
                AppChannel.sub('socket')
                    .filter   ( msg => msg.channel === channel )
                    .map      ( ({content}) => content         )
                ,
                {
                    send: content => Channel.send({channel, content})
                }
            )
}