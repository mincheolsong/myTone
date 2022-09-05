import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { removeRefreshToken } from '../../cookie/Cookie'
import { deleteAuthToken } from '../../store'
import './ArticleDetail.css'

import axios from 'axios'


function Recomment(props) {
	let [recomment, setRecomment] = useState('');
  let state = useSelector((state)=>state)
	const dispatch = useDispatch();
	return (
		<InputGroup className="mb-3" style={{ width: '60%',marginLeft:'40px' }}>
			<p>↳</p>
			<Form.Control
				placeholder="대댓글남기기"
				aria-label="Recipient's username"
				aria-describedby="basic-addon2"
				onClick={(e) => { e.target.value = '' }}
				onChange={(e) => { setRecomment(e.target.value) }}
			/>
			<Button variant="outline-secondary" id="button-addon2" onClick={() => {
				axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
				axios.post('/comment/recomment/', {
					body: recomment,
					comment: props.id
				})
					.then((res) => {
						if (res.status == 201) {
							console.log(res)
							window.location.reload()
						}

					})
					.catch((err) => {
						console.log(err)
						if (err.response.status == 401) {
							alert('로그인을 해주세요')
							removeRefreshToken();
							dispatch(deleteAuthToken());
							window.location.reload()
						}

					})
			}}>
				등록
			</Button>
		</InputGroup>
	)
}
function Comment(props) {
	let [comment, setComment] = useState('');
	let [commentList, setCommentList] = useState([]);

	let [editClicked, setEditClicked] = useState(false);
	let [editCommentId, setEditCommentId] = useState();
	let [edittingComment, setEdittingComment] = useState('')

	let [editReClicked,setEditReClicked] = useState(false);
	let [editReCommentId,setEditReCommentId] = useState();
	let [edittingReComment,setEdittingReComment] = useState('');

	let [recommentClicked, setRecommentClicked] = useState(false);
	let [recommentId, setRecommentId] = useState();

  let state=useSelector((state)=>state)
	const dispatch = useDispatch();

	useEffect(() => {
		axios.get(`/comment/`)
			.then((res) => {
				if (res.status == 200) {
					setCommentList(res.data.results.filter((e) => e.article == props.id))

					// console.log(res.data.results.filter((e) => e.article == props.id))
					//console.log(res.data.results)
				}
			})
			.catch((err) => { console.log(err) })
	}, [])

	function editComment() {
		if (state.token.accessToken != null) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`

			axios.patch(`/comment/${editCommentId}/`, {
				body: edittingComment,

			})
				.then((res) => {
					console.log(res)
					if (res.status == 200) {
						alert('수정완료')
						setEditClicked(false)
						window.location.reload()
					}
				})
				.catch((err) => {
					//alert(err.response.data.detail)

					//console.log(err.response.status)
					if (err.response.status == 403) {
						alert('본인의 댓글만 수정 가능합니다')
						window.location.reload()
					}

				})
		} else {
			alert('로그인 후 수정할 수 있습니다')
			window.location.reload()
		}
	}
	function editReComment() {
		if (state.token.accessToken != null) {
			axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`

			axios.patch(`/comment/recomment/${editReCommentId}/`, {
				body: edittingReComment,

			})
				.then((res) => {
					
					if (res.status == 200) {
						alert('수정완료')
						setEditReClicked(false)
						window.location.reload()
					}
				})
				.catch((err) => {
					//alert(err.response.data.detail)

					//console.log(err.response.status)
					if (err.response.status == 403) {
						alert('본인의 댓글만 수정 가능합니다')
						window.location.reload()
					}

				})
		} else {
			alert('로그인 후 수정할 수 있습니다')
			window.location.reload()
		}
	}
	return (
		<div className='comment-top'>
			<h4>댓글</h4>

			{

				commentList.map((a, i) => {
					return (
						<div key={i}>
							<div className='comment'>
								{
									editClicked == true && editCommentId == a.id
										?
										<div className='comment-content'>

											<textarea style={{ width: '100%', wordBreak: 'break-all' }} value={edittingComment} onChange={(e) => { setEdittingComment(e.target.value) }}></textarea>
										</div>
										:
										<div className='comment-content'>
											{/* {console.log(a)} */}
											<div style={{ fontSize: 'large', width: '100%', wordBreak: 'break-all' }}>{a.body}</div>
										</div>

								}

								<div className='comment-control'>
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										<p style={{margin:'0px'}}>작성자 : {a.user}</p>
										<Button style={{ padding: '0', height: '26px', width: '26px' }} variant="danger" onClick={() => {
											axios.defaults.headers.common['Authorization'] = `Bearer ${props.accessToken}`
											axios.delete(`/comment/${a.id}/`)
												.then((res) => {
													if (res.status == 204) {
														alert('댓글이 삭제되었습니다.')
														window.location.reload();
													}

												})
												.catch((err) => {
													if (err.response.status == 403) {
														alert('본인의 댓글만 삭제 할 수 있습니다!')
													}
													else if (err.response.status == 401) {
														alert('권한이 없습니다!')
														window.location.reload();
													}
												})
										}}>X</Button>

									</div>
									<div style={{ display: 'flex', justifyContent: 'space-between' }}>
										{
											editClicked == true && editCommentId == a.id
												?
												<div className="comment-edit" onClick={editComment}>수정완료</div>
												:
												<div className="comment-edit" onClick={() => { setEditClicked(true); setEditCommentId(a.id); setEdittingComment(a.body) }}>수정</div>

										}
										<div style={{ cursor: 'pointer' }} onClick={() => { setRecommentClicked(!recommentClicked); setRecommentId(a.id) }}>대댓글</div>
									</div>
								</div>

							</div>
							{

								props.recommentList.filter((e) => e.comment == a.id).map((a, i) => {
									return (
										<div key={i} className='recomment'>
											{
												editReClicked == true && editReCommentId == a.id
													?
													<textarea style={{ width: '100%', wordBreak: 'break-all' }} value={edittingReComment} onChange={(e) => { setEdittingReComment(e.target.value) }}></textarea>
													:
													<p>↳ {a.body}</p>

											}
											
											<div>
												<div className='recomment-control'>
													<p>작성자 : {a.user}</p>
													<Button style={{ padding: '0', height: '26px', width: '26px' }} variant="light" onClick={() => {
														axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
														axios.delete(`/comment/recomment/${a.id}/`)
															.then((res) => {
																if (res.status == 204) {
																	alert('댓글이 삭제되었습니다.')
																	window.location.reload();
																}

															})
															.catch((err) => {
																if (err.response.status == 403) {
																	alert('본인의 댓글만 삭제 할 수 있습니다!')
																}
																else if (err.response.status == 401) {
																	alert('권한이 없습니다!')
																	window.location.reload();
																}
															})
												}}>X</Button>
												</div>
												{
													editReClicked == true && editReCommentId == a.id
													?
													<div style={{cursor:'pointer'}}onClick={editReComment}>수정완료</div>
													:
													<div  style={{cursor:'pointer'}}onClick={() => { setEditReClicked(true); setEditReCommentId(a.id); setEdittingReComment(a.body) }}>수정</div>
												}
												
											</div>
										</div>
									)
								})

							}
							
							
							{
								recommentClicked == true && recommentId == a.id
									?
									<Recomment id={a.id} accessToken={props.accessToken}></Recomment>
									: ''
							}
						</div>
					)
				})
			}



			<InputGroup className="mb-3" style={{ height: '44px', width: '100%', minWidth: '350px' }}>
				<Form.Control
					placeholder="댓글을 작성해주세요"
					aria-label="Recipient's username"
					aria-describedby="basic-addon2"
					onClick={(e) => { e.target.value = '' }}
					onChange={(e) => { setComment(e.target.value) }}
				/>

				<Button variant="outline-secondary" id="button-addon2" onClick={() => {
					axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
					axios.post('/comment/', {
						body: comment,
						article: props.id
					})
						.then((res) => {
							if (res.status == 201) {
								console.log(res)
								window.location.reload()
							}

						})
						.catch((err) => {
							console.log(err)
							if (err.response.status == 401) {
								alert('로그인 후 댓글 작성이 가능합니다')
								removeRefreshToken();
								dispatch(deleteAuthToken());
								window.location.reload()
							}

						})
				}}>
					등록
				</Button>

			</InputGroup>
		</div>
	)

}
function ArticleDetail(props) { //게시판 상세 페이지
	let navigate = useNavigate();
	let dispatch = useDispatch();
	let { id } = useParams();
	let [title, setTitle] = useState('');
	let [content, setContent] = useState('');
	let [createAt, setCreateAt] = useState('');
	let [articleId, setArticle] = useState(0);
	let [user, setUser] = useState('');
	let [image, setImage] = useState([]);
	let [likeCount,setLikeCount] = useState(0);
	let [hits,setHits] = useState(0);
	//const accessToken = localStorage.getItem('accessToken');
	let state = useSelector((state)=>state);
	let [fade,setFade] = useState('');
	// useEffect(()=>{
	// 	let a = setTimeout(()=>{setFade('end')},100)

	// 	return()=>{
	// 		clearTimeout(a)
	// 		setFade('')
	// 	}
	// },[id])

	useEffect(() => {
		axios.get(`/article/${id}`)
			.then((res) => {
				if (res.status === 200) {

					if (res.data.images.length != 0) {
						setImage(res.data.images)
					}
					setHits(res.data.hits);
					setLikeCount(res.data.article_like_user);
					setArticle(res.data.id);
					setTitle(res.data.title);
					setContent(res.data.content);
					setCreateAt(formatDate(res.data.created_at));
					setUser(res.data.user.username);
				}

			})
			.catch((err) => {
				console.log(err)
			})
	}, [])

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

	function deleteArticle() {
		axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
		axios.delete(`/article/${id}`)
			.then((res) => {
				if (res.status == 204) {
					alert('삭제되었습니다.')
					navigate('/board/list')
				}

			})
			.catch((err) => {
				if (err.response.status == 403) {
					alert('본인의 게시물만 삭제 할 수 있습니다!')
				}
				else if (err.response.status == 401) {
					alert('권한이 없습니다!')
					window.location.reload();
				}
			})
	}

	function checkAuth() {
		if (state.token.accessToken != null) {
			navigate(`/edit/${id}`)
		} else {
			alert('로그인 후 수정 할 수 있습니다')
		}
	}

	


	return (
		<>

			<div className={`detail-top`}>
				<div className='detail-header'>
					<div style={{ fontWeight: 'bold', fontSize: 'larger' }}>{title}</div>
					<div className="header-detail">
						<div className="like-button" onClick={()=>{
							axios.defaults.headers.common['Authorization'] = `Bearer ${state.token.accessToken}`
							axios.post(`/article/${articleId}/like`)
							.then((res)=>{
								
								if(res.status==200){
									alert('❤')
									window.location.reload();
								}
							})
							.catch((err)=>{
								console.log(err)
								if(err.response.status==401){
									alert('로그인을 해주세요')
									removeRefreshToken();
									dispatch(deleteAuthToken());
									window.location.reload();
									
								}
							})
						}}>❤</div>
						<div>좋아요 : {likeCount}</div>
						<div>작성일자 : {createAt}</div>
						<div>{user}</div>
					</div>
				</div>
				<hr></hr>
				<div className='button-container'>
					<div>조회수 : {hits}</div>
					<div style={{display:'flex'}}>
						<Button variant="light" onClick={checkAuth}>수정</Button>
						<Button variant="danger" onClick={deleteArticle}>삭제</Button>
					</div>
				</div>
				<div>
					{
						image.length != 0
							?
							<div className='img-container'>
								{

									image.map(function (a, i) {
										return (
											<img style={{marginBottom:'10px'}} key={i} src={a.image}></img>
										)
									})
								}

							</div>
							:
							null
					}
					<div style={{ minHeight: "150px", fontSize: 'large' }}>{content}</div>
				</div>
				<hr></hr>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Button variant="light" onClick={() => { navigate('/board/list'); props.setCategory(0); props.setSearchToggle(false) }}>목록</Button>
				</div>
				<Comment id={id} recommentList={props.recommentList}></Comment>

			</div>
		</>
	)
}

export default ArticleDetail