import { Request, Response } from 'express';
import { ProductModel } from '../../models';

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products in stock
 *     responses:
 *       200:
 *         description: List of products in stock
 */
export const getProductsInStock = async (req: Request, res: Response) => {
  try {
    const inStockProducts = await ProductModel.find({ existencia: { $gt: 0 } });
    res.status(200).json(inStockProducts);
  } catch (error) {
    console.error('Error al obtener productos en existencia:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

