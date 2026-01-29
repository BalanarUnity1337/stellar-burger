import { omitBy } from 'lodash-es';

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

  let onOpenListener: ((event: Event) => void) | null = null;
  let onCloseListener: ((event: Event) => void) | null = null;
  let onErrorListener: ((event: Event) => void) | null = null;
  let onMessageListener: ((event: MessageEvent) => void) | null = null;

  const removeListeners = (): void => {
    if (!socket) {
      return;
    }

    if (typeof onOpenListener === 'function') {
      socket.removeEventListener('open', onOpenListener);
    }

    if (typeof onCloseListener === 'function') {
      socket.removeEventListener('close', onCloseListener);
    }

    if (typeof onErrorListener === 'function') {
      socket.removeEventListener('error', onErrorListener);
    }

    if (typeof onMessageListener === 'function') {
      socket.removeEventListener('message', onMessageListener);
    }

    onOpenListener = null;
    onCloseListener = null;
    onErrorListener = null;
    onMessageListener = null;
  };

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
      pingInterval = null;
    }
  };

  let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;
  const clearReconnectInterval = (): void => {
    if (reconnectTimeout !== null) {
      clearTimeout(reconnectTimeout);
      reconnectTimeout = null;
    }
  };

  let reconnectAttempts = 0;
  let manuallyClosed = false;

  const connect = (url: string): void => {
    manuallyClosed = false;
    removeListeners();

    socket = new WebSocket(url);

    if (!socket) {
      return;
    }

    onOpenListener = (): void => {
      reconnectAttempts = 0;

      if (typeof onOpen === 'function') {
        onOpen();
      }
    };

    socket.addEventListener('open', onOpenListener);

    onCloseListener = (): void => {
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
          ...omitBy(reconnectOnCloseOptions, (option) => typeof option === 'undefined'),
        };

        if (reconnectAttempts < maxRetries) {
          reconnectAttempts++;

          reconnectTimeout = setTimeout(() => {
            connect(url);
          }, interval);
        }
      }
    };

    socket.addEventListener('close', onCloseListener);

    onErrorListener = (): void => {
      console.error('Ошибка при подключении к WebSocket');

      if (typeof onError === 'function') {
        onError();
      }
    };

    socket.addEventListener('error', onErrorListener);

    onMessageListener = (event: MessageEvent): void => {
      onMessage(event);
    };
    socket.addEventListener('message', onMessageListener);

    if (enablePing) {
      pingInterval = setInterval(() => {
        socket?.send('ping');
      }, defaultPingIntervalTime);
    }
  };

  const close = (): void => {
    manuallyClosed = true;

    removeListeners();
    socket?.close();
    socket = null;

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
