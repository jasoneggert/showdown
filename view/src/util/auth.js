export const authMiddleWare = (history) => {
  const authToken = localStorage.getItem('AuthToken');
  if (authToken === null) {
   if(history){ history.push('../login') } else {
     window.location = 'localhost:3000/login'
   }
  }
};
