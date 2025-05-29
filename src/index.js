import express from "express";
import logger from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import { createServer } from "node:http";
import authRoutes from "./routes/auth.routes.js";
import chatsRoutes from "./routes/chats.routes.js";
import prisma from "./db.js";

const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
  connectionStateRecovery: {},
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api/auth", authRoutes);
app.use("/api", chatsRoutes);

io.on("connection", async (socket) => {
  const userSender = socket.handshake.auth.user;
  const userReceiver = socket.handshake.auth.receiverId;
  console.log(`User connected: ${userSender.name}`);

  socket.join(userSender.id);

  socket.on("disconnect", () =>
    console.log(`User disconnected: ${userSender.name}`)
  );

  socket.on("message", async (message) => {
    console.log(socket.handshake.auth);
    console.log(`Message received: ${message} by ${userSender.name}`);
    let newMessage;
    try {
      let conversation = await prisma.conversation.findFirst({
        where: {
          isGroup: false,
          Participants: {
            every: {
              userId: {
                in: [userSender.id, userReceiver],
              },
            },
            some: {
              userId: userSender.id,
            },
            some: {
              userId: userReceiver,
            },
          },
        },
      });

      console.log({ conversation });
      // Verifica que la conversación tenga exactamente 2 participantes
      if (!conversation) {
        // return console.error("Conversation not found");
        conversation = await prisma.conversation.create({
          data: {
            isGroup: false,
            Participants: {
              create: [
                {
                  userId: userSender.id,
                },
                {
                  userId: userReceiver,
                },
              ],
            },
          },
        });
      }
      if (conversation) {
        newMessage = await prisma.message.create({
          data: {
            message,
            senderId: userSender.id,
            receiverId: userReceiver,
            conversationId: conversation.id,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
    console.log(newMessage);
    socket
      .to(userReceiver)
      .emit(
        "message",
        newMessage.message,
        newMessage.id,
        newMessage.senderId,
        newMessage.conversationId
      );
  });
});

app.use(express.static(path.join(__dirname, "../client/dist")));
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
