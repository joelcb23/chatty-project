import prisma from "../db.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    if (!users) return res.status(404).json({ message: "No users found" });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
