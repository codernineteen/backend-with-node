const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
    const products = await Product.find({})
    .select('name price')
    res.status(200).json({ products, nbHits : products.length })
}

const getAllProduct = async (req, res) => {
    const  {featured, company, name, sort, field, numericFilters} = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if(company) {
        queryObject.company = company
    }
    if(name) {
        queryObject.name = {$regex:name, $options: 'i'}
    }
    if(numericFilters) {
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$e',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|=|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    let result = Product.find(queryObject)

    if(sort) {
        const sortString = sort.split(',').join(' ')
        result = result.sort(sortString)
    }
    else {
        result = result.sort('createdAt')
    }

    if(field) {
        const fieldString = field.split(',').join(' ')
        result = result.select(fieldString)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit
    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({ products, nbHits : products.length })
}
 
module.exports = {
    getAllProductStatic,
    getAllProduct,
}