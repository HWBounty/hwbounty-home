
export const userCached =()=>{
	return !!localStorage.getItem("userInfo")
};
export const getUserInfo = ()=>{
	if(!userCached()){
		
	}
}