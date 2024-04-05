const Menu = require('../models/menuModel');
const cloudinary = require('../service/cloudinaryService')

const createMenu = async (req, res) => {
    try {
        const { name, price, category } = req.body;

        // Check if all required fields are provided
        if (!name || !price || !category) {
            return res.status(400).json({
                status: "Failed",
                message: "All fields are required."
            });
        }

        // Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Create menu item in the database
        const menuData = await Menu.create({
            name,
            price,
            category,
            image: result.url
        });

        // Send success response
        res.status(201).json({
            status: "Success",
            data: menuData
        });
    } catch (error) {
        // Handle errors
        console.error("Error creating menu item:", error);
        res.status(500).json({
            status: "Failed",
            message: "Internal server error"
        });
    }
};

const getMenu = async (req, res) => {
    try {
        const data = await Menu.find();
        res.status(200).send({
            status: "Success",
            data: data
        });
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal Server error"
        });
    }
}

const getMenuByType = async (req, res) => {
    try {
        const { type } = req.params;
        if (!type) {
            res.status(400).send({
                status: "Failed",
                message: "Type is required"
            });
        } else {
            const data = await Menu.find({ category: type });
            res.status(200).send({
                status: "Success",
                data: data
            })
        }
    } catch (error) {
        res.status(500).send({
            status: "Failed",
            message: "Internal server error"
        })
    }
}

module.exports = {
    createMenu,
    getMenu,
    getMenuByType,
};