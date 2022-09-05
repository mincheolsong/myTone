import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { Button, Offcanvas } from 'react-bootstrap'
import { Outlet } from 'react-router';
import './ArticleCategory.css'
import axios from 'axios';
import { addArticleCategory } from '../../store';

function ArticleCategory(props) {
	let state = useSelector((state) => { return state }) //카테고리 목록데이터를 redux에서 받아오기 위해 useSelector사용
	let [show, setShow] = useState(true) //카테고리 껐다 켰다 
	let navigate = useNavigate()
	let dispatch = useDispatch()
	const handleClose = () => setShow(false); // 상단 x버튼으로 카테고리 닫기
	const toggleShow = () => setShow((s) => !s); // 화살표 버튼으로 togle
	
	

	useEffect(() => {
		axios.get('/board')
			.then((res) => {
				if (res.status == 200) {
					//console.log(res.data.results)
					dispatch(addArticleCategory(res.data.results))
				}
			})
			.catch((e) => { console.log(e) })

	}, [])
	
	useEffect(() => { // 'state변수 show'를 페이지가 새로고침 되어도 기억하기 위해 localStorage사용
		let current_toggleState = localStorage.getItem('toggle');
		setShow(current_toggleState == '1' ? true : false)
	}, [])

	useEffect(() => {

		localStorage.setItem('toggle', show == true ? '1' : '0')

	}, [show])


	return (
		<div>
			<Offcanvas style={{ width: '15vw', minWidth: 'fit-content' }} show={show} onHide={handleClose} scroll={true} backdrop={false}>
				<Offcanvas.Header closeButton style={{backgroundColor:'rgb(205, 92, 92)',color:'white',height:'70px'}}>
					<Offcanvas.Title>Category</Offcanvas.Title>
				</Offcanvas.Header>

				<Offcanvas.Body className='category-top'>
					<div className="category-list" onClick={() => { props.setCategory(0); props.setSearchToggle(false); navigate('/board/list') }} >
						전체
					</div> 
					{
						state.articleCategory.map((a, i) => {
							return (
								<div className='category-list'  onClick={() => {  navigate('/board/list'); props.setCategory(a.id);props.setSearchToggle(false);}} key={i}>{a.name}</div>
							)
						})
					}

				</Offcanvas.Body>
				<div className="closeButton-container"> {/*열고 닫는 화살표버튼*/}
					<button className="closeButton" onClick={toggleShow}>
						x
					</button>
				</div>
			</Offcanvas>
			<div className="openButton-container"> {/*열고 닫는 화살표버튼*/}
				<button className="openButton" onClick={toggleShow}>
				</button>
			</div>

			<Outlet  ></Outlet>

		</div>
	)
}

export default ArticleCategory