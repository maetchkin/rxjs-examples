var ConnectionStatuses = {
        INIT:       1,
        CONNECTION: 2,
        CONNECTED:  3,
        ERROR:      4,
        CLOSED:     5
    };

export const INIT       = ConnectionStatuses.INIT; 
export const CONNECTION = ConnectionStatuses.CONNECTION; 
export const CONNECTED  = ConnectionStatuses.CONNECTED; 
export const ERROR      = ConnectionStatuses.ERROR; 
export const CLOSED     = ConnectionStatuses.CLOSED;

export default ConnectionStatuses;