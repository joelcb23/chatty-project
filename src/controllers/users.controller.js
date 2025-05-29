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

export const getUserByEmail = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });
    if (!user) return res.status(404).json({ message: "No user found" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
