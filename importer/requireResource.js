module.exports = (req,res,next)=>{
    if (req.headers['enigma-redirect-url'] === undefined || req.headers['enigma-redirect-url'] === '') {
        return res.status(400).send('you must provide required headers')
    } else {
        next()
    }
}