type TWebSocketOptions = {
  onOpen?: () => void;
  onClose?: () => void;
  onError?: () => void;
  onMessage: (event: MessageEvent) => void;
  enablePing?: boolean;
  reconnectOnClose?: boolean;
  reconnectOnCloseOptions?: {
    maxRetries?: number;
    interval?: number;
  };
};

type TConnectWebSocketReturn = {
  socket: WebSocket | null;
  reconnectWS: (WebSocketUrl: string) => void;
  closeWS: () => void;
};

const reconnectDefaultOptions: Required<TWebSocketOptions['reconnectOnCloseOptions']> = {
  maxRetries: 5,
  interval: 5000,
};

const defaultPingIntervalTime = 30000;

export const connectWebSocket = (
  WebSocketUrl: string,
  options: TWebSocketOptions
): TConnectWebSocketReturn => {
  let socket: WebSocket | null = null;

  const {
    enablePing,
    reconnectOnClose,
    reconnectOnCloseOptions,
    onOpen,
    onClose,
    onMessage,
    onError,
  } = options;

  let pingInterval: ReturnType<typeof setInterval> | null = null;
  const clearPingInterval = (): void => {
    if (pingInterval !== null) {
      clearInterval(pingInterval);
    }
  };

  const reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  const clearReconnectInterval = (): void => {
    if (reconnectTimeout !== null) {
      clearTimeout(reconnectTimeout);
    }
  };

  let reconnectAttempts = 0;
  let manuallyClosed = false;

  const connect = (url: string): void => {
    manuallyClosed = false;
    socket = new WebSocket(url);

    if (!socket) {
      return;
    }

    socket.addEventListener('open', () => {
      reconnectAttempts = 0;

      if (typeof onOpen === 'function') {
        onOpen();
      }
    });

    socket.addEventListener('close', () => {
      clearPingInterval();

      if (typeof onClose === 'function') {
        onClose();
      }

      if (manuallyClosed) {
        return;
      }

      if (reconnectOnClose) {
        const { maxRetries, interval } = {
          ...reconnectDefaultOptions,
          ...reconnectOnCloseOptions,
        };

        if (reconnectAttempts < maxRetries) {
          reconnectAttempts++;

          setTimeout(() => {
            connect(url);
          }, interval);
        }
      }
    });

    socket.addEventListener('error', () => {
      console.error('Ошибка при подключении к WebSocket');

      if (typeof onError === 'function') {
        onError();
      }
    });

    if (typeof onMessage === 'function') {
      socket.addEventListener('message', onMessage);
    }

    if (enablePing) {
      pingInterval = setInterval(() => {
        socket?.send('ping');
      }, defaultPingIntervalTime);
    }
  };

  const close = (): void => {
    manuallyClosed = true;
    socket?.close();
    clearPingInterval();
    clearReconnectInterval();
  };

  connect(WebSocketUrl);

  return {
    socket,
    reconnectWS: connect,
    closeWS: close,
  };
};
