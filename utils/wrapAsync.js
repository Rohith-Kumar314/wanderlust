module.exports = (fnx)=>{
    return (req,res,next)=>{
        fnx(req,res,next).catch((err)=>next(err));
    }
}