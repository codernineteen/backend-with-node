const getAllJobs = async(req, res) => {
    res.send('getAllJobs')
}

const getJob = async(req, res) => {
    res.send('getJob')
}

const createJob = async(req, res) => {
    res.json(req.user)
}

const updateJob = async(req, res) => {
    res.send('editJob')
}

const deleteJob = async(req, res) => {
    res.send('deleteJob')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}