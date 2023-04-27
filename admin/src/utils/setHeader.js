
export const setHeader = (token)=>{
    console.log(token)
    return { 'authorization' :`Bearer ${token}`}
}