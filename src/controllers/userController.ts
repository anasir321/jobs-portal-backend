import { Request, Response } from "express";
import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    //extracting user from body
    const { name, title, email, age } = req.body;

    // creating a new user
    const newUser = new User({
      name,
      title,
      email,
      age, 
    });

    console.log(newUser);

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
    throw new Error("Cannot create new user!");
  }
};

export const searchUser = async (req: Request, res: Response) => {
  try {
    const { name, title } = req.query;
    // Creating the query object
    const query: any = {};

    if (name) {
      // Case-insensitive search for the first name
      query.name = { $regex: new RegExp(name as string, "i") };
    }

    if (title) {
      // Case-insensitive search for the title
      query.title = { $regex: new RegExp(title as string, "i") };
    }

    // Finding users based on the query
    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "No user found with selected query" });
    throw new Error("Cannot find user!");
  }
};

export const viewUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "No user exists!" });
    throw new Error("No user found!");
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const { name } = req.params;

    const user = await User.findOne({ name: name });
    console.log(user);

    if (!user) {
      return res.status(500).json({ error: "User not found" });
    }

    if (email) {
      user.email = email;
      await user.save();
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "Email is required" });
    }
  } catch (err) {
    console.log(err as string);
    res.status(500).json({ error: "Failed to update user" });
    throw new Error("Update Failed");
  }
};


