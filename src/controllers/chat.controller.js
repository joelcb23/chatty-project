import prisma from "../db.js";

export const getChats = async (req, res) => {
  try {
    const chats = await prisma.conversation.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        messages: true,
        participants: true,
      },
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createChat = async (req, res) => {
  try {
    const chat = await prisma.conversation.create({
      data: req.body,
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
