import User from "../models/User.mjs";

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Server Error");
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("Please fill in all required fields");
    }

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(400).json("No updatedUserrrr!");
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

export { getUser, updateUser };
