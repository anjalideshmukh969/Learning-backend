const ProductModel = require('../models/product.model');
const sendFiles = require("../services/storage.services");

const createProductController = async (req,res)=>{
    try {
        let seller_id = req.seller;
     //check if files are present
        if(!req.files)
            return res.status(422).json({
                message: "Images are required"
            });
    //destructure the fields from req.body    
    let {productName,description,amount,currency,color,size,Category} = req.body;
  
        if(!productName || !description || !amount || !currency || !color || !size)
            return res.status(422).json({
                message: "All fields are required"
            });

    //upload images to imagekit
    const uploadedImgs = await Promise.all(
        req.files.map(async (val)=>
            await sendFiles(val.buffer, val.originalname)
    ));
     console.log("uploaded img ->", uploadedImgs);


    // Create new product in db    
        let newProduct = await ProductModel.create({ 
            productName,
            description,
            price: { amount, currency,},
            colors:color,
            category: Category,
            sizes:size,
            images: uploadedImgs.map((val)=> val.url)
        });

        return res.status(201).json({
            message: "Product created successfully",
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
};

const getAllProductsDataController = async (req,res)=>{
    try {
        let products = await ProductModel.find({});
        // return res.status(200).json({
        //     message: "Products fetched successfully",
        //     products: products,
        // });
        if(!products)
            return res.status(404).json({
                message: "No products found",
            });
        return res.status(200).json({
            message: "Products fetched successfully",
            products: products,
        });
    } catch (error) {
        console.log("error in get product api",error);
        return res.status(500).json({   
            message: "Internal server error",
            error: error,
        });
        
    }
};

const updateProductDataController = async (req,res)=>{
    try {
        let product_id = req.params.id;

        if(!product_id)
            return res.status(422).json({
                message: "Product id is required",
            });
        let {productName,description,amount,currency,color,size} = req.body;
//upload images to imagekit from req.files
        const uploadedImgs = await Promise.all(
            req.files.map(async (val)=>
                await sendFiles(val.buffer, val.originalname
                )
        )
        );
//update product in db
        let updatedProduct = await ProductModel.findByIdAndUpdate(
            {_id: product_id},
            {
                productName,
                description,
                price: { amount, currency,},
                colors:color,
                category: Category,
                sizes:size,
                images: uploadedImgs.map((val)=> val.url)
            },
        );
//save the updated product
        await updatedProduct.save();

        if(!updatedProduct)
            return res.status(404).json({
                message: "Product not found",
            });

        return res.status(200).json({
            message: "Product updated successfully",
        });



    } catch (error) {
        console.log("error in update product api api->", error);
        return res.status(500).json({
         message: "internal server error",
     });
    }

} 

const deleteProductController = async (req,res)=>{
    try {
        // check for seller token   
        if(!req.seller)
            return res.status(400).json({
                message: "Token not found",
            });
        let product_id = req.params.id;

        // validate product id
        if(!product_id)
            return res.status(422).json({
                message: "Product id is required",
            });
// delete product from db
        let deletedProduct = await ProductModel.findByIdAndDelete({_id: product_id});
        // if(!deletedProduct)
        //     return res.status(404).json({
        //         message: "Product not found",
        //     });

    } catch (error) {
        console.log("error in delete product api",error);
        return res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
}

module.exports = {
    createProductController,
    getAllProductsDataController,
    updateProductDataController ,
    deleteProductController,

}; 
