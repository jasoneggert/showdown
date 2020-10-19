export const authMiddleWare = (history) => {
    const authToken = localStorage.getItem('AuthToken');
    console.log('authToken: ', authToken);
    if(authToken === null){
        history.push('../login')
    }
}