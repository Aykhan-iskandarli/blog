const {check} = require('express-validator')

exports.CategoriesValidator =[
    check('name').not().isEmpty().withMessage('Name is required')
]