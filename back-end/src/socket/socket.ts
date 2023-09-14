import { Server as HTTPServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  //   master list of all connected users
  public users: { [uid: string]: string };

  constructor(server: HTTPServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: { origin: "*" },
    });
    this.io.on("connect", this.StartListeners);
    console.info("Socket IO started");
  }
  //events from each socket
  StartListeners = (socket: Socket) => {
    console.info("Message received from " + socket.id); // log whenever a message comes thru

    //custom messages
    socket.on(
      "handshake",
      (callback: (uid: string, users: string[]) => void) => {
        console.info("handshake received");
        //   check if this is a reconnection attempt
        const reconnected = Object.values(this.users).includes(socket.id);
        if (reconnected) {
          console.info("This user has reconnected");
          const uid = this.GetUidFromSocketId(socket.id);
          const users = Object.values(this.users);
          if (uid) {
            console.info("Sending callback for reconnect...");
            callback(uid, users);
            return;
          }
        }
        // generate new user
        const uid = uuidv4();
        this.users[uid] = socket.id;
        const users = Object.values(this.users);
        console.info("Sending callback for handshake...");
        callback(uid, users);

        // send user to all connected users
        this.SendMessage(
          "User connected ",
          users.filter((id) => id !== socket.id),
          users
        );
      }
    );

    socket.on("disconnect", () => {
      console.info("Disconnect received from " + socket.id);
      const uid = this.GetUidFromSocketId(socket.id);
      if (uid) {
        delete this.users[uid];
        const users = Object.values(this.users);
        this.SendMessage(
          "User disconnected ",
          users.filter((id) => id !== socket.id),
          users
        );
      }
    });
  };

  GetUidFromSocketId = (id: string) =>
    Object.keys(this.users).find((uid) => this.users[uid] === id);

  SendMessage = (name: string, users: string[], payload?: Object) => {
    console.info("Emitting event: " + name + "to " + users);

    users.forEach((id) =>
      payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)
    );
  };
}
