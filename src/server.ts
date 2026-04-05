import { createServer } from "node:http";
import { app } from "./app";
import { initSockets } from "./sockets";

const port = process.env.PORT || 3000;

const server = createServer(app);
const io = initSockets(server);
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export { server, io };
