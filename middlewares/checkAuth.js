
export const checkAuth = (request,response, next)=>{
    const isAdmin = true;
    if(isAdmin){
        console.log("xin chao ban");
        next()
    }else{
        console.log("bạn ko có quyền truy cập");
    }
}