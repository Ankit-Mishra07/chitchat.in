import { getCookie } from "./cookie";

export const getTime = (time:string) => {

    const date = new Date(time);


    return date.getHours() + ": " + date.getMinutes()
}

export const getName = (chat:any) => {
    return chat.users[0]._id===getCookie("chatuser")?chat.users[1].username:chat.users[0].username;
}

export const getProfile = (chat:any) => {
    return chat.users[0]._id!==getCookie("chatuser")?chat.users[0].profile_avatar_url:chat.users[1].profile_avatar_url;
}