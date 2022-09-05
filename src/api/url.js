import axios from "axios"
const statusError={
    status:false,
    json:{
        error: ["연결이 원활하지 않습니다."]
    }
}
const timeoutPromise=()=>{
    return new Promise((resolve,reject)=>setTimeout(()=>reject(new Error('timeout')),300*1000))
}
const requestPromise=(url,option)=>{
    return fetch(url,option);
}

const getPromise=async(url,option)=>{
    return await Promise.race([
        requestPromise(url,option),
        timeoutPromise()
    ])
}



export const loginUser = async(credentials)=>{
    const option={
        method:'POST',
        header:{
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body:JSON.stringify(credentials)
    }
    const data = await(getPromise('/user/login/',option)).catch(()=>{
        return statusError;
    })

    if(parseInt(Number(data.status))===200){
        const status=data.ok;
        const code = data.status;
        const text=await data.text();
        const json = text.loginUser?JSON.parse(text):"";

        return{
            status,
            code,
            json
        };
    }
    else{
        return statusError;
    }
}

export const logoutUser = async(credentials)=>{
    const option={
        method:'POST',
        headers:{
            'Content-Type':'application/json;charset=UTF-8'
        },
        body: JSON.stringify(credentials)
    };
    const data = await getPromise('/user/logout',option).catch(()=>{
        return statusError;
    });
    if(parseInt(Number(data.status))===200){
        const status=data.ok;
        const code=data.status;
        const text=await data.text();
        const json = text.length ? JSON.parse(text):"";

        return{
            status,
            code,
            json
        };
    }else{
        return statusError;
    }


}

export const requestToken = async (refreshToken)=>{
    // const option={
    //     method:'POST',
    //     header:{
    //         'Content-Type': 'application/json;charset=UTF-8'
    //     },
    //     body: JSON.stringify({username:'user2',password:'user2'})
    // }
    const data = await axios.post('/user/login/',{username:'user3',password:'user3'}).catch(()=>{
        return statusError;
    })

    if (parseInt(Number(data.status))===200){
        console.log(data)
        const status = true;
        const code = data.status;
        const access_token = data.data.token.access_token;

        return {
            status,
            code,
            access_token
            
        };
    }else{
        return statusError;
    }
};