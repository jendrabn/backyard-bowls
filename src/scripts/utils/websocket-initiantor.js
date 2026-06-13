import NotificationHelper from './notification-helper';

const WebSocketInitiator = {
  init(url) {
    try {
      const webSocket = new WebSocket(url);
      webSocket.onmessage = this._onMessageHandler;
    } catch (error) {
      console.log(error);
    }
  },

  _onMessageHandler(event) {
    NotificationHelper.sendNotification({
      title: 'Notification from websocket',
      options: {
        body: event.data,
        icon: 'icons/icon-192x192.png',
        vibrate: [200, 100, 200],
      },
    });
  },
};

export default WebSocketInitiator;
