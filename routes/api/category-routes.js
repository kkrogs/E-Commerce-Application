const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// this gets all of the categories and sends them back to the user as json
router.get('/', async (req, res) => {

  try {
    const categoryData = await Category.findAll(
      {
        include: [{ model: Product }]
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'There was no information' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this gets a specific category by id
router.get('/:id', async (req, res) => {

  try {
    const categoryData = await Category.findByPk(req.params.id
      ,
      {
        include: [{ model: Product }]
      }
    );

    if (!categoryData) {
      res.status(404).json({ message: 'There was no information' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// this allows the user to post a new category to the database
router.post('/', async (req, res) => {

  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});


// this allows the user to update a specific category by id
router.put('/:id', async (req, res) => {

  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        },
      });
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this allows the user to delete a category by id
router.delete('/:id', async (req, res) => {

  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
