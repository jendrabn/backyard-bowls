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

  _onMessageHandler(message, title = 'Notification from websocket') {
    NotificationHelper.sendNotification({
      title,
      options: {
        body: message,
        icon: 'icons/icon-192x192.png',
        vibrate: [200, 100, 200],
      },
    });
  },
};

export default WebSocketInitiator;
