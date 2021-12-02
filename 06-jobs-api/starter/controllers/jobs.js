const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const {NotFoundError} = require('../errors')

const getAllJobs = async(req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId})
    res.status(StatusCodes.OK).json({jobs})
}

const getJob = async(req, res) => {
    const {user:{userId}, params:{id}} = req
    const job = await Job.findOne({_id: id, createdBy: userId})
    if(!job) {
        throw new NotFoundError('No job with that id: ' + id)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async(req, res) => {
    req.body.createdBy = req.user.userId
    const newJob = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({newJob})
}

const updateJob = async(req, res) => {
    const {
        body: {company, position},
        user:{userId}, 
        params:{id}
    } = req

    if(company === '' || position === '') {
        throw new BadRequestError('Company or Position cannot be empty')
    }

    const job = await Job.updateMany(
        {_id: id,createdBy: userId},
        req.body,
        {new: true, runValidators: true}
    )

    if(!job) {
        throw new NotFoundError('No job with that id: ' + id)
    }

    res.status(StatusCodes.OK).send('The job updated')
}

const deleteJob = async(req, res) => {
    const {user:{userId}, params:{id}} = req

    const job = await Job.findByIdAndRemove(
        {
            _id: id,
            createdBy: userId
        }
    )

    if(!job) {
        throw new NotFoundError('No job with that id: ' + id)
    }

    res.status(StatusCodes.OK).send('The job deleted')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}