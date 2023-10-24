import {Request, Response} from "express";
import {PriceModel, ProductModel} from "../../models";
import {IProduct, ISpecialPrice} from "../../interfaces/index";

/**
 * @swagger
 * /price/{user_id}/{nombre_producto}:
 *   get:
 *     summary: Get special price for a customer and a product
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: Customer ID
 *         type: string
 *       - in: path
 *         name: nombre_producto
 *         required: true
 *         description: Product name
 *         type: string
 *     responses:
 *       200:
 *         description: Special price or base price
 *       404:
 *         description: Product not found
 */
export const getSpecialPrice = async (req: Request, res: Response) => {
  const {user_id, nombre_producto} = req.params;

  try {
    // Use the findById method to search for a user by _id
    const user = await PriceModel.findById(user_id);

    if (!user) {
      return res.status(404).json({error: "User not found"});
    }

    const product = await ProductModel.find({nombre: nombre_producto});

    if (!product) {
      return res.status(404).json({error: "Product not found"});
    }

    const data = {product: product, user: user.metadata};

    const response = applySpecialPrices(data);

    if (response.product[0].existencia <= 0) {
      return res.status(200).json({result: "Out of stock"});
    }
    delete response.product[0]._id
    return res.status(200).json(response.product[0]);
  } catch (error) {
    console.error("Error getting special price:", error);
    res.status(500).json({ error: "Server error" });
  }
};

interface Data {
  product: IProduct[];
  user: {
    precios_especiales: ISpecialPrice[];
  };
}

const applySpecialPrices = (data: Data) => {
  const products = data.product;
  const specialPrices = data.user.precios_especiales;

  // Create a copy of the original products
  const productsWithSpecialPrices = JSON.parse(JSON.stringify(products));

  productsWithSpecialPrices.forEach((product: IProduct) => {
    const specialPrice = specialPrices.find(
      (p: ISpecialPrice) => p.nombre_producto === product.nombre
    );
    if (specialPrice) {
      product.precio_base = specialPrice.precio_especial_personal;
    }
  });

  return {
    product: productsWithSpecialPrices,
  };
};
