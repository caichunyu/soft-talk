
// 修改token，并将token存入localStorage
export const CHANGE_LOGIN = (state, user)=>{
  console.log('mutations', user)
  state.Authorization = user.Authorization;
  localStorage.setItem('Authorization', user.Authorization);
};
