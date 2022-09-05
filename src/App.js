import { react, useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ArticlePost from './components/board/ArticlePost.js'
import ArticleEdit from './components/board/ArticleEdit.js'
import ArticleDetail from './components/board/ArticleDetail'
import ArticleCategory from './components/board/ArticleCategory.js'
import Article from './components/board/Article.js'
import Main from './Main/Main'
import Header from './Layout/Header'
import Footer from './Layout/Footer'
import SignUp from './components/user/SignUp'
import SignIn from './components/user/SignIn'
import ImgUpload from './Test/ImgUpload'
import Result from './Test/Result'
import axios from "axios"
import Cosmetic from './cosmetics/cosmetic'
import UserInfo from './components/user/UserInfo'
import UserInfoUpdate from './components/user/UserInfoUpdate.js'
import PrivateRoute from './routes/PrivateRoute.js'
import PublicRoute from './routes/PublicRoute.js'
//import './App.css'


function App() {
  let [category, setCategory] = useState(0); // 0:all, 1:여름 쿨톤, 2:겨울 쿨톤, 3:가을 웜톤, 4:봄 웜톤
  let [searchToggle,setSearchToggle] = useState(false); //게시판 검색을 위한 state(true : 검색했음, false : 검색하지 않음)
  let [recommentList,setRecommentList] = useState([])
  
  useEffect(() => {
    axios.get(`/comment/recomment/`)
        .then((res) => {
            if (res.status == 200) {
                setRecommentList(res.data.results)
            }
        })
        .catch((err) => { 
          console.log(err)
         })
  }, [])
 
  return (
    <div className="App">
      <Header></Header>
        <Routes>
          <Route element={<PublicRoute></PublicRoute>}> 
            <Route path="/" element={<Main />}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/signin" element={<SignIn></SignIn>}></Route>
            
            <Route path="/board" element={<ArticleCategory category={category} setCategory={setCategory} setSearchToggle={setSearchToggle} />}> {/*nested route 사용*/}
                  <Route path="list" element={<Article category={category} setCategory={setCategory} searchToggle={searchToggle} setSearchToggle={setSearchToggle}  />}></Route>  {/*/board/list로 접속하면 카테고리와 게시판 목록을 보여줌*/}
                  <Route path="detail/:id" element={<ArticleDetail setCategory={setCategory} recommentList={recommentList} setSearchToggle={setSearchToggle}/>}></Route> {/*/board/detail/:id로 접속하면 카테고리와 상세 게시판을 보여줌*/}
            </Route>
          </Route>
          
          <Route element={<PrivateRoute></PrivateRoute>}> 
            <Route path="/post" element={<ArticlePost></ArticlePost>}></Route>
            <Route path="/edit/:id" element={<ArticleEdit></ArticleEdit>}></Route>
            <Route path="/image" element={<ImgUpload></ImgUpload>}></Route>
            <Route path="/Result/:PersonalColor" element={<Result></Result>}></Route>
            <Route path="/userInfo/:id" element={<UserInfo></UserInfo>}></Route>
            <Route path="/cosmetic/:colorid" element={<Cosmetic></Cosmetic>}></Route>
            <Route path="/userInfo/:id/update" element={<UserInfoUpdate></UserInfoUpdate>}></Route>
            </Route>
          <Route path='*' element={<div>잘못된 경로입니다:(</div>}></Route>
        </Routes>
      
      <Footer></Footer>
    </div>
  );
}

export default App;
