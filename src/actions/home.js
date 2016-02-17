import socketCluster from 'socketcluster-client';

const RAND_SET = 'RAND_SET'

export function homeInit () {
  return dispatch => {
    var socket = socketCluster.connect();
    socket.on('rand', function (data) {
      dispatch({
        type: RAND_SET,
        value: data.rand
      });
    });
  }
}
