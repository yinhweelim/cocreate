import React, {
  PropsWithChildren,
  useReducer,
  useState,
  useEffect,
} from "react";
import {
  SocketContextProvider,
  SocketReducer,
  defaultSocketContextState,
} from "./SocketContext";
import { useSocket } from "../hooks/useSocket";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState(true);

  const socket = useSocket("ws://localhost:1337", {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
  });

  useEffect(() => {
    // connect to the websocket
    socket.connect;
    // save the socket in context
    SocketDispatch({ type: "update_socket", payload: socket });

    // start event listeners
    StartListeners();

    // send handshake
    SendHandshake();
  }, []);

  const StartListeners = () => {
    // Reconnect event
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt);
    });

    // Reconnect attempt event
    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection attempt: " + attempt);
    });

    // Reconnection error
    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: " + error);
    });

    // Reconnection failed
    socket.io.on("reconnect_failed", () => {
      console.info("Reconnection failure");
      alert("We are unable to connect you to the web socket");
    });
  };
  const SendHandshake = () => {
    console.info(`Sending handshake`);
    socket.emit("handshake", (uid: string, users: string[]) => {
      console.log("User handshake callback message received");
      SocketDispatch({ type: "update_uid", payload: uid });
      SocketDispatch({ type: "update_users", payload: users });
      setLoading(false);
    });
  };

  if (loading) return <p>Loading socket IO...</p>;

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
