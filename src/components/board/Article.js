import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button, InputGroup, Form, Spinner,Alert } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { addArticle, deleteArticle, clearArticle } from '../../store.js'
import axios from 'axios'
import './Article.css'

function Article(props) {
    let state = useSelector((state) => { return state }) //redux에서 state 가져오기
    let navigate = useNavigate()
    let dispatch = useDispatch();
    let [findedState,setFindedState]=useState([]); //선택한 카테고리에 따라 게시판이 저장될 변수
    const location = useLocation();
    let [articleCount, setArticleCount] = useState(0);
    let [searchTitle, setSearchTitle] = useState('');
    let [searchedState,setSearchedState] = useState([]);
    let [loading,setLoading] = useState(false);
    let [fade,setFade] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('/article')
            .then((res) => {
                //console.log('article가져오는 코드')
                dispatch(addArticle(res.data.results))
                setArticleCount(res.data.count)
                setLoading(false);
                setFindedState(res.data.results);
            })
            .catch((err)=>{
                
                console.log(err)
            })
        return () => {
            //console.log('article클리어 하는 코드')
            dispatch(clearArticle())
        }
    }, [])

    useEffect(()=>{
        
        if (props.category == 0 ) { // category가 every(0)인 경우 
            setFindedState(state.article);
            
            
        }
        else {
            setFindedState(state.article.filter((e) => e.board == props.category))
            
        }   
    },[props.category,props.searchToggle,state.article]) // 게시판 검색에 따른 재랜더링을 위해 검색state를 추가
    
    
    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end')},10)

        return()=>{
            clearTimeout(a)
            setFade('')
        }
    },[props.category,searchedState])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    // function checkAuth() {
    //     const accessToken = localStorage.getItem('accessToken');
    //     if (accessToken != null) {
    //         navigate(`/post`)
    //     } else {
    //         alert('로그인 후 작성 할 수 있습니다')
    //         navigate('/signin')
    //     }
    // }



    return (

        <div className='article-top'>
            <h2 style={{ marginBottom: '20px' }}>
                {
                    props.category == 0 && props.searchToggle==false
                        ? '전체'
                        : props.category == 1 && props.searchToggle==false
                            ? '여름 쿨톤'
                            : props.category == 2 && props.searchToggle==false
                                ? '겨울 쿨톤'
                                : props.category == 3 && props.searchToggle==false
                                    ? '가을 웜톤'
                                    : props.category == 4 && props.searchToggle==false
                                        ? '봄 웜톤'
                                        : props.searchToggle==true
                                            ?'검색'
                                            :''
                }
            </h2>

            <div style={{ height: '130px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ marginBottom: '1rem', minWidth: '180px' }}>📁 전체 게시글 수 : {articleCount}</div>

                <InputGroup className="mb-3" style={{ height: '44px', width: '423px', minWidth: '350px' }}>
                    <Form.Control
                        placeholder="제목 검색"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onClick={(e)=>{e.target.value=''}}
                        onChange={(e) => { setSearchTitle(e.target.value) }}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => {
                        
                        setSearchedState(state.article.filter((e) => e.title == searchTitle))
                        props.setSearchToggle(true) // 검색버튼을 누르면 검색state가 true가 된다
                        
                    }}>
                        검색
                    </Button>

                </InputGroup>

            </div>
            {
                loading==true?
                <div style={{minHeight:'46vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                </div>
                :
                findedState.length == 0 && props.searchToggle==false // 게시판 검색을 하지 않았을 경우
                    ?
                    <div className={`start ${fade}`} style={{ minHeight: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        게시글이 없습니다😥
                    </div>
                    :
                    props.searchToggle==false // 게시판 검색을 하지 않았을 경우
                    ?
                    <div className={`start ${fade}`} style={{ minWidth: '535px' }} >
                        {
                            findedState.map((a, i) => {
                                return (
                                    <div className='article-contents' key={i}>
                                        <div className='article-header' onClick={() => {
                                            navigate('/board/detail/' + a.id)
                                        }
                                        }>
                                            <p style={{ fontWeight: 'bold',fontSize:'larger' }}>제목 : {a.title}</p>
                                            <div>
                                                <div>작성일자 : {formatDate(a.created_at)}</div>
                                                <div>작성자 : {a.user}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                    :''
                
            }
            
            {
                searchedState.length == 0 && props.searchToggle //게시판 검색을 했을 경우
                ?
                <div className={`start ${fade}`} style={{ minHeight: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    게시글이 없습니다😥
                </div>
                :
                props.searchToggle //게시판 검색을 했을 경우
                ?
                <div className={`start ${fade}`} style={{ minWidth: '535px' }}>
                        {
                            searchedState.map((a, i) => {
                                return (
                                    <div className='article-contents' key={i}>
                                        <div className='article-header' onClick={() => {
                                            navigate('/board/detail/' + a.id)
                                        }
                                        }>
                                            <p style={{ fontWeight: 'bold',fontSize:'larger' }}>제목 : {a.title}</p>
                                            <div>
                                                <div>작성일자 : {formatDate(a.created_at)}</div>
                                                <div>작성자 : {a.user}</div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                            
                        }

                    </div>
                :''
            }
            <Button style={{ display: 'inherit', margin: '0 auto' }} onClick={()=>{navigate('/post')}} variant="light">
                글쓰기
            </Button>
        </div>
    )
}

export default Article