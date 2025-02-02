const express = require('express');
const { Product, Category, ProductAttribute, ProductImage } = require('../models');

const router = express.Router();


//trending
router.get('/trending', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isTrending: true, isDeleted: false },
      include: [
        { model: ProductImage, as: 'images' }, 
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching trending products:', err);
    res.status(500).json({ error: 'Failed to fetch trending products' });
  }
});

// Get all products (only non-deleted)
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { isDeleted: false },
      include: [
        { model: Category, as: 'category' },
        { model: ProductAttribute, as: 'attributes' },
        { model: ProductImage, as: 'images' }, 
      ],
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching products', details: err.message });
  }
});


// Get a single product by ID (only if not deleted)
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({
      where: { id, isDeleted: false },
      include: [
        { model: Category, as: 'category' },
        { model: ProductAttribute, as: 'attributes' },
        { model: ProductImage, as: 'images' }, // Include product images
      ],
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or deleted' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching product', details: err });
  }
});

// Soft delete a product
router.patch('/:id/delete', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ isDeleted: true });

    res.status(200).json({ message: 'Product soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error soft deleting product', details: err });
  }
});

// Toggle favorite status
router.patch('/:id/favourite', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await product.update({ isFavourite: !product.isFavourite });

    res.status(200).json({
      message: `Product ${updatedProduct.isFavourite ? 'marked as favorite' : 'removed from favorites'}`,
      product: updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ error: 'Error updating favorite status', details: err });
  }
});




module.exports = router;
