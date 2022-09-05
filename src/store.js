import {configureStore,createSlice} from "@reduxjs/toolkit";


let articleCategory = createSlice({
    name : 'articleCategory',
    initialState : [],
    reducers:{
        addArticleCategory(state,action){
            if(state.length==0)
                state.push(...action.payload);
            // else
            //     console.log('already category exist')
        }
    }
})

let article = createSlice({
    name : 'article',
    initialState : [],
    reducers :{
        addArticle(state,action){
            state.push(...action.payload)
        },
        editArticle(state,action){
            let finded = state.find((e)=>e.id==action.payload.id);
            finded.title = action.payload.title;
            finded.content = action.payload.content;
        },
        deleteArticle(state,action){
            let findedIndex = state.findIndex((e)=>e.id==action.payload);
            state.splice(findedIndex,1);
        },
        clearArticle(state,action){
            state.length=0
        }

    }
})

// access_token 
let token = createSlice({
    name: 'token',
    initialState:{
        authenticated:false,
        accessToken:null,
        //expireTime:null
    },
    reducers:{
        setAuthToken(state,action){
            state.authenticated=true;
            state.accessToken=action.payload;
            //localStorage.setItem('accessToken',action.payload);
            //state.expireTime= new Date().getTime() + 600*1000; //10 minutes
        },
        deleteAuthToken(state,action){
            console.log('deleteAuth토큰')
            state.authenticated=false;
            state.accessToken=null;
            //localStorage.removeItem('accessToken');

            //state.expireTime=null;
        }
    }
})

export let {addArticleCategory} = articleCategory.actions
export let {addArticle,editArticle,deleteArticle,clearArticle} = article.actions
export let {setAuthToken, deleteAuthToken} = token.actions

export default configureStore({
    reducer: {
        articleCategory : articleCategory.reducer,
        article : article.reducer,
        token : token.reducer
    }
})