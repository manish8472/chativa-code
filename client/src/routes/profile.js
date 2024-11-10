import api from "../utils/axios"

export const getProfile = async(userId) => {

    try{
        const profile = await api.post("/profile/get",{userId});
        return profile.data;
    }catch(error){
        console.log(error);
    }
}