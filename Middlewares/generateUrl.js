function generateUrl(req,res,next) {
    let str = 'ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let slug = str.split('').sort(()=>{
        return Math.random()-0.5;
    }).slice(0,7).join("");
    req.slug = slug;
    next()
}

module.exports = generateUrl;