export const validatePassword = (password, repeatedPassword) =>{
    return password === repeatedPassword && password !== ""
}