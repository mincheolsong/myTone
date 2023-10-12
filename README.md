# 퍼스널컬러 진단 웹사이트

## 제작동기

최근 퍼스널 컬러에 대한 높은 관심도와 퍼스널 컬러 진단 서비스 시장의 폭발적인 성장 여력을 바탕으로 주제를 선정하였고, 프로젝트를 진행하였습니다.

프론트엔드(React)로 프로젝트에 참여했으며 로그인, 로그아웃, 회원가입, 게시판 구현을 맡았습니다.

## 구현기능

-   로그인, 로그아웃, 회원가입 (jwt를 사용한 회원인증)
-   게시판 CRUD, 댓글과 대댓글 CRUD

## 1\. 로그인, 로그아웃, 회원가입 (jwt를 사용한 회원인증)

### 1-1. 회원가입

```
function SignUp() {
    ...
    return (
        ...
            <Form action="/" className="form-top"
                onSubmit={function (e) {
                    e.preventDefault();
                    axios.post('/user/register/', {
                        username: e.target.username.value,
                        password1: e.target.password1.value,
                        password2: e.target.password2.value,
                        nickname: e.target.nickname.value,
                        gender: e.target.gender.value == 'femail' ? 'W' : 'M'
                    }).then((res) => {
                        if (res.status == 200) { // 가입 성공
                            alert(res.data.message);
                            navigate('/signin')
                        } else { // 가입 실패
                            alert('가입 실패!!');
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                }}>
                ...
            </Form>
    );

}
export default SignUp
```

`<form>`태그를 사용하였고, axios를 사용해서 서버로 post하였다.  
이때 `e.preventDefault()`는 form 안에 submit역할을 하는 버튼을 눌렀어도 화면을 새로고침 하지않기 위해서 사용했다.(submit은 작동됨)

---

### 1-2. 로그인

```
<form onSubmit={(e) => {
    e.preventDefault();
    axios.post('/user/login/', {
        username: e.target.username.value,
        password: e.target.password.value,
    })
    .then((res) => {
          if (res.status == 200) {
              alert(res.data.message)
              localStorage.setItem('UserID', res.data.token.user);
              setRefreshToken(res.data.token.refresh_token); //쿠키에 refreshToken저장
              dispatch(setAuthToken(res.data.token.access_token));//redux에 accessToken저장
              navigate('/');
          }
        })
    .catch((err) => {
          if (err.response.status == 400) {
              alert('아이디 혹틀렸습니다')
          }
          setValue("password", "");
        })
  }>
```

서버로 post요청이 성공하면 response로 accessToken과 refreshToken을 받는다.

> accessToken : redux store에 저장  
> refreshToken : 쿠키에 저장

accessToken의 경우 탈취의 위험이 있기 때문에 브라우저 저장소(localStorage, cookie)가 아닌 store에 저장했다.

이때 store에 저장하면 브라우저를 새고로침 할 때 redux값이 초기값으로 돌아가면서 로그아웃이 되는데 이를 해결하기 위해 새로고침 될 때마다 refreshToken을 사용하여 로그인을 연장시켜 줬다.

이를 위해서 우선 App.js의 `<Route>`들 전체를 감싸는 컴포넌트를 만들었다.  
**(nested route를 사용해서 상위 route에서 token을 검사 혹은 연장을 한 후 `<Outlet>`을 통해 하위 route들을 보여주기 위해서)**

전체를 감싸는 컴포넌트는 두 가지로 나눴다.

-   `<PublicRoute>`(accessToken없이 접근이 가능한 route들을 감쌈)
-   `<PrivateRoute>`(accessToken이 있어야만 접근이 가능한 route들 감쌈)
-    <PublicRoute>, <PrivateRoute> 에서는 토큰 검사 함수 CheckToken을 수행하는데 이 함수를 통해서 새로고침 마다 refreshToken을 통해 로그인을 유지시켜 준다.

```
<Routes>
          <Route element={<PublicRoute></PublicRoute>}> 
              로그인 없이 접근할 수 있는 Route
          </Route>
          
          <Route element={<PrivateRoute></PrivateRoute>}> 
              로그인을 해야만 접근할 수 있는 Route
          </Route>

          <Route path='*' element={<div>잘못된 경로입니다:(</div>}></Route>
</Routes>
```

-   PrivateRoute.js

```
//
import { CheckToken } from '../auth/CheckToken';
import { Outlet} from 'react-router';


export default function PrivateRoute() {

    const { isAuth } = CheckToken(location.key); //CheckToken함수 수행

    if (isAuth === 'Failed') {
        로그인 화면으로 이동
    } else if (isAuth==='Loading') {
        로딩중 컴포넌트 보여줌
    }

    return <Outlet /> // 성공하면 하위 Route를 보여줌
}
```

👇 (PrivateRoute의 CheckToken함수)

-   CheckToken.js

```
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRefreshToken, removeRefreshToken } from '../cookie/Cookie';
import { requestToken } from '../api/url';
import { deleteAuthToken, setAuthToken } from '../store';

export function CheckToken(key){
    const [isAuth,setIsAuth] = useState('Loading');
    const {authenticated,expireTime} = useSelector(state=>state.token);
    const refreshToken = getRefreshToken();
    const dispatch = useDispatch();

    useEffect(()=>{
        const checkAuthToken = async ()=>{
            if(refreshToken==undefined){
                dispatch(deleteAuthToken());
                setIsAuth('Failed');
            }else{
                if (authenticated && new Date().getTime() < expireTime){
                    setIsAuth('Success');
                }else{
                    const response = await requestToken(refreshToken); // accessToken 재발급 수행 함수

                    if(response.status){
                        const token = response.access_token;
                        dispatch(setAuthToken(token));
                        setIsAuth('Success')
                    }else{
                        dispatch(deleteAuthToken());
                        removeRefreshToken();
                        setIsAuth('Failed');
                    }
                }
            }
        }

        checkAuthToken();

    },[refreshToken,dispatch,key])

    return{
        isAuth
    };
}
```

`useEffect`를 사용해서 deps안의 값이 변경될 때마다 쿠키에 저장된 refreshToken의 유무와 redux에 저장된 accessToken의 유효성을 검사한다.

refreshToken이 있고 accessToken이 만료되었다면 `requestToken`함수를 사용하여 accessToken을 재발급 받는다.

최종결과를 `isAuth` state에 저장하고 return한다.

-   useEffect의 deps
    -   `refreshToken` : cookie에 저장되어 있기 때문에 새로고침을 하더라도 여전히 같은 값을 유지한다. 따라서 해당 페이지에 접근하는 유저가 인증된(로그인 된) 유저인지를 판별하기 위한 값으로 `로그인/로그아웃`을 수행했을 때만 useEffect가 실행된다.
    -   `dispatch` : **accessToken**을 redux에 저장하기 위한 usdDispatch hook이다. 따라서 dispatch는 useDispatch hook을 사용하기 위해 선언한 변수로 계속 같은 값을 유지하게 되고, 따라서 `앱이 최초로 랜더링(새로고침 제외)` 되었을 때에만 useEffect가 실행된다. 초기에 checkToken함수를 수행하기 위해 선언하였다고 생각하면 된다.
    -   `key` : useLocation hook으로 부터 return 받은 location 객체의 일부이다. location 객체의 고유 식별자로 클릭으로 인한 링크 이동 또는 `새로고침`시 값이 변하게 된다. 따라서 링크이동 (router이동) 뿐 아니라 **웹 브라우저의 새고로침 시에도 checkToken함수를 수행하기 위해 선언하였다.**

⭐'key' deps가 웹 브라우저 새로고침 시에도 로그인이 유지될 수 있게하는 역할을 한다.⭐

-   requestToken함수

```
export const requestToken = async (refreshToken)=>{

    const data = await axios.post('/refeshToken으로 accessToken발급해주는 api',{ refreshToken : refreshToken }).catch(()=>{
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
```

---

## 2\. 게시판

카테고리 별로 게시판 목록을 보여주고 클릭시 상세페이지로 이동할 수 있도록 구현했다.  
이때 좌측에 카테고리 바는 그대로 두고 목록페이지와 상세페이지만 바뀌도록 nested route를 사용하여 구현했다.

> 목록페이지
> 
> ![image](https://user-images.githubusercontent.com/80660585/186662539-c0ef0937-9b5d-468f-b651-6f67456ae7e8.png)

> 상세페이지
> 
> ![image](https://user-images.githubusercontent.com/80660585/186662653-a689dc08-2210-4b31-ae72-49b732ee043a.png)

```
<Route path="/board" element={<ArticleCategory category={category} setCategory={setCategory} setSearchToggle={setSearchToggle} />}> {/*nested route 사용*/}
    <Route path="list" element={<Article category={category} setCategory={setCategory} searchToggle={searchToggle} setSearchToggle={setSearchToggle}  />}></Route>  {/*/board/list로 접속하면 카테고리와 게시판 목록을 보여줌*/}
    <Route path="detail/:id" element={<ArticleDetail setCategory={setCategory} recommentList={recommentList} setSearchToggle={setSearchToggle}/>}></Route> {/*/board/detail/:id로 접속하면 카테고리와 상세 게시판을 보여줌*/}
</Route>
```

이때 카테고리 바를 펼쳤다가 접었다가 할 수 있는 boot-strap을 사용했는데 목록에서 상세페이지로 이동하거나, 상세페이지에서 목록으로 이동 할 때마다 계속 재랜더링이 일어났다. (이동할 때 마다 접혔다 펴짐)

이를 해결하기 위해 localStorage에 카테고리 바의 상태를 저장했다.

> 닫았을때
> 
> ![image](https://user-images.githubusercontent.com/80660585/186664948-2093f053-0a95-4349-9493-244f178f1da8.png)

> 열었을때
> 
> ![image](https://user-images.githubusercontent.com/80660585/186665046-95d8922b-9e74-4afe-af53-18bdb59e19c6.png)

## 3\. 댓글 수정

댓글 옆 수정버튼을 누르면 댓글창이 입력창으로 바뀌고 댓글을 수정할 수 있다.

세개의 state를 사용하였다.

1.  수정버튼을 눌렀는지 나타내는 state
2.  수정버튼을 누른 댓글의 id를 기억하는 state
3.  댓글의 내용을 기억하는 state
    
    👇
    
    \`\`\`js let \[editClicked, setEditClicked\] = useState(false); let \[editCommentId, setEditCommentId\] = useState(); let \[edittingComment, setEdittingComment\] = useState(''); \`\`\`

수정 버튼을 누르면 `editClicked`가 true로 바뀌고, editCommentId는 수정버튼을 누른 댓글의 id로 바뀐다. edittingComment는 수정중인 내용으로 바뀐다.  
editClicked와 editCommentId을 사용하여 `수정`버튼을 누르면 `수정완료`버튼이 나오게 된다.

👇

```
{
    editClicked == true && editCommentId == a.id
    ?
    <div className="comment-edit" onClick={editComment}>수정완료</div>
    :
    <div className="comment-edit" onClick={() => { setEditClicked(true); setEditCommentId(a.id); setEdittingComment(a.body) }}>수정</div>
}
```

state에 따라서 수정할 수 있는 입력창이 나오거나, 그냥 댓글을 보여주거나 한다.

👇

```
{
    editClicked == true && editCommentId == a.id
    ?
    <div className='comment-content'>
        <textarea style={{ width: '100%', wordBreak: 'break-all' }} value={edittingComment} onChange={(e) => { setEdittingComment(e.target.value) }}></textarea>
    </div>
    :
    <div className='comment-content'>
        <div style={{ fontSize: 'large', width: '100%', wordBreak: 'break-all' }}>{a.body}</div>
    </div>
}
```

> 수정버튼 누르기 전
> 
> ![image](https://user-images.githubusercontent.com/80660585/186672479-8f6e785f-ceaa-4df0-b3c4-a452c87e8186.png)

> 수정버튼 누른 후
> 
> ![image](https://user-images.githubusercontent.com/80660585/186672645-a1d808ee-5f15-4733-af54-afd2aac1dec3.png)
