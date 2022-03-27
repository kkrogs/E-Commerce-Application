const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// this allows the user to get all of the tags and returns them to the user as json
router.get('/', async (req, res) => {

  try {
    const tagData = await Tag.findAll(
      {
        include: [{ model: Product, through: ProductTag },]
      }
    );

    if (!tagData) {
      res.status(404).json({ message: 'There was no information' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this allows teh user to get information on a tag by id and returns it to the user as json
router.get('/:id', async (req, res) => {

  try {
    const tagData = await Tag.findByPk(req.params.id
      ,
      {
        include: [{ model: Product, through: ProductTag },]
      }
    );

    if (!tagData) {
      res.status(404).json({ message: 'There was no tags with that id' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this allows the user to create a new tag
router.post('/', async (req, res) => {

  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// this allows the user to update a gat by id
router.put('/:id', async (req, res) => {

  try {
    const tagData = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id,
        },
      });

    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// this allows the user to delete a tag by id
router.delete('/:id', async (req, res) => {

  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
