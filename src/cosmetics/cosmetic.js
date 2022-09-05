import './cosmetic.css';
import items from './cosmetic_data/response'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react'

function Cosmetic() {
    let {colorid} = useParams();
    //const List = items.results.filter(result => result.color == colorid);
    let accessToken=localStorage.getItem('accessToken');
    let [List, setList] = useState();
    
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        axios.get('/color/' + colorid + '/cosmetic/')
            .then((res)=>{
                setList(res.data.results);
            })
    },[]);

    return(
        <>
        <h3 className="cosmetic_title">화장품 추천 리스트</h3>
        <div className="cosmetic_container">
            {List.map((item)=>(
                <a href={item.url} target="_blank" className="item_href">
                    <img referrerpolicy="no-referrer" src={`${item.image}`}></img>
                    <div key={item.id} className="cosmetic_item">{item.name}</div>
                </a>
            ))}
        </div>   
        </>
    );
}

export default Cosmetic