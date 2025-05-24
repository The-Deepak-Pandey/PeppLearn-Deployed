import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }
        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                msg: "User already exists with this email"
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        await User.create({
            name,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            success: true,
            msg: "Account created successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Failed to register user"
        });
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                msg: "All fields are required"
            });
        }
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect email or password"
            });
        }
        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                msg: "Incorrect email or password"
            });
        }
        generateToken(res, user, `Welcome back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Failed to login user"
        });
    }
}

export const logout = async (_, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "Logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Failed to logout user"
        });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({
                msg: "User not found",
                success: false,
            });
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            msg: "Failed to load user profile"
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
      const userId = req.id;
      const { name } = req.body;
      const profilePhoto = req.file;
  
      // Check if a file was uploaded
      if (!profilePhoto) {
        return res.status(400).json({
          success: false,
          msg: "No file uploaded",
        });
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          msg: "User not found",
          success: false,
        });
      }
  
      // Delete old image if it exists
      if (user.photoUrl) {
        const publicId = user.photoUrl.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
  
      // Upload new image to Cloudinary
      let cloudResponse;
      try {
        cloudResponse = await uploadMedia(profilePhoto.path);
        if (!cloudResponse?.secure_url) {
          throw new Error("Cloudinary upload failed");
        }
      } catch (uploadError) {
        console.error("Cloudinary Error:", uploadError);
        return res.status(500).json({
          success: false,
          msg: "Failed to upload image to Cloudinary",
        });
      }
  
      const photoUrl = cloudResponse.secure_url;
      const updatedData = { name, photoUrl };
  
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
        new: true,
      }).select("-password");
  
      return res.status(200).json({
        success: true,
        user: updatedUser,
        message: "Profile updated successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        msg: "Failed to update user profile",
      });
    }
  };