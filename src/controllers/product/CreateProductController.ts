import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";
import { UploadedFile, FileArray  } from "express-fileupload";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})


class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error("error upload file image");
    } else {
      
      const image = req.files['file'];
      if (Array.isArray(image))  return;
      const file = image as UploadedFile;

      const resultFile:UploadApiResponse = await new Promise((resolve, reject ) =>{
        cloudinary.uploader.upload_stream({}, function (error, result){
          if(error){
            reject(error);
            return;
          }
          resolve(result);
          
        }).end(file.data);

      });

      const createProduct = new CreateProductService();
      const product = await createProduct.execute({
        name,
        price,
        description,
        banner: resultFile.url,
        category_id,
      });

      return res.json(product);

    }
  }
}

export { CreateProductController };
