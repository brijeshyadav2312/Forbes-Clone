import React, { useEffect, useState } from 'react'
import '../CSS/Home.css'
import { FiSearch } from "react-icons/fi";
import { FaChevronCircleLeft,FaChevronCircleRight } from "react-icons/fa";
import personImage from './person-icon-8.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate, Link, NavLink} from 'react-router-dom';

const Home = () => {
  const [data,setData] = useState([])
  const [filterData,setFilter] = useState([])
  const [keyword, setKeyword] = useState()
  const [rank, setrank] = useState()

  const [select,setSelect] = useState("")
  const [category, setcategory] = useState("")

  const [total, setTotal] = useState([])

  const [param,setParam] = useState("")
  const[page,setPages] = useState(1);
  const [pageArr,setPageArr] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    (async _ =>{
      const res = await fetch(`https://forbes400.onrender.com/api/forbes400${param}`);
      const data = await res.json();
      setData(data);
    })();
  },[param])

  useEffect(() => {
    (async _ =>{
      const res = await fetch(`https://forbes400.onrender.com/api/forbes400/getAllBillionaires`);
      const data = await res.json();
      setTotal(data);
    })();
  },[keyword])

  useEffect(() => {
    setParam(select)
    setPages(1)
  },[select])

  useEffect(() => {
    setParam(category)
    setPages(1)
  },[category])

  useEffect(() => {
    const filterlist = total.filter((item) => {
      if((item.personName).startsWith(keyword)){
        return true;
      }
      else if((item.uri).startsWith(keyword)){
        return true;
      }
      else if(((item.countryOfCitizenship).toLowerCase()).startsWith(keyword)){
        return true;
      }
      else{
        return false;
      }
      
    })
    setFilter(filterlist)
  },[keyword])

  useEffect(() => {
    let totalPage = Math.round(keyword?(filterData.length/10):(data.length/10));
    const arr = Array(totalPage).fill().map((_,num) => num+1)
    let t = page+10

    if(page===1){
      let sarr = arr.slice(page,t-2)
      let bu = [1,...sarr,'...',totalPage];
      setPageArr(bu)
    }
    else if(page>=8){
      let sarr = arr.slice(page-3,t-5)
      let bu = [1,'...',...sarr,'...',totalPage];
      setPageArr(bu)
    }
    else if(page === totalPage-10){
      let sarr = arr.slice(page-3,t)
      let bu = [1,'...',...sarr,totalPage];
      setPageArr(bu)
    }

  },[page,data,filterData,keyword])

  useEffect(() =>{
    if(rank){
      navigate(`/Details/${rank}`)
    }
  },[rank])

  const handleLeftClick = () => {
    if(page<=1)setPages(1)
    else setPages(page-1)
  }
  const handleRightClick = () => {
    if(page >= data.length/10)setPages(data.length/10)
    else setPages(page+1)
  }

  return (
    <div className='homeSection'>
      <div className='homeHeader'>
        <div className='filter'>
          <p>Filter list by:</p>
          <NavLink to={"/All"} className={({ isActive }) => isActive?'activeClass':''}><span onClick={() => setcategory("/")}>ALL</span></NavLink>
          <NavLink to={"/OLDEST"}   className={({ isActive }) => isActive?'activeClass':''}><span onClick={() => setcategory("/oldest")}>OLDEST</span></NavLink>
          <NavLink to={"/YOUNGEST"} className={({ isActive }) => isActive?'activeClass':''}><span onClick={() => setcategory("/youngest")}>YOUNGEST</span></NavLink>
          <NavLink to={"/WOMEN"}    className={({ isActive }) => isActive?'activeClass':''}><span onClick={() => setcategory("/women")}>WOMEN</span></NavLink>
          <select onChange={(e) => setSelect(e.target.value)}>
            <option  selected disabled>Select category</option>
            <option value="/industries/automotive" >AUTOMOTIVE</option>
            <option value="/industries/constructionandengineering" >CONSTRUCTION & ENGINEERING</option>
            <option value="/industries/diversified" >DIVERSIFIED</option>
            <option value="/industries/energy" >ENERGY</option>
            <option value="/industries/fashionandretail" >FASHION & RETAIL</option>
            <option value="/industries/financeandinvestment" >FINANCE & INVESTMENTS</option>
            <option value="/industries/foodandbeverage" >FOOD & BEVERAGE</option>
            <option value="/industries/gamblingandcasinos" >GAMBLING & CASINOS</option>
            <option value="/industries/healthcare" >HEALTHCARE</option>
            <option value="/industries/logistics" >LOGISTICS</option>
            <option value="/industries/sports" >SPORTS</option>
            <option value="/industries/technology" >TECHNOLOGY</option>
            <option value="/industries/telecom" >TELECOM</option>
          </select>
        </div>
        <div className='search'>
          <input type={'text'} placeholder="Search by name" onKeyUp={(e) => setKeyword(e.target.value)}/><FiSearch/>
        </div>
      </div>
      <div>{data.length>0?(''):('Loading...')}</div>
      <div className='tableData'>
        <table>
          <thead>
            <tr>
              <td></td>
              <td>RANK</td>
              <td>NAME</td>
              <td>NET WORTH</td>
              <td>AGE</td>
              <td>SOURCE</td>
              <td>COUNTRY/TERRITORY</td>
            </tr>
          </thead>
          <tbody>
            {data.length>0?
              ((keyword?(filterData.slice(page*10-10,page*10)):(data.slice(page*10-10,page*10))).map((item,idx) => {
                return(
                  <tr key={idx}>
                    <td><img width='50px'src={item.squareImage?(item?.squareImage):(personImage)} alt='postr'/></td>
                    <td>{item?.rank}</td>
                    <td onClick={() => setrank(item?.rank)}><Link to={'/Details'}>{item.personName}</Link></td>
                    <td>${((item.finalWorth)/1000).toFixed(1)}B</td>
                    <td>73</td>
                    <td>{item.source}</td>
                    <td>{item.countryOfCitizenship}</td>
                  </tr>
                )
              })):
              (
                Array(10).fill().map((_,num) => num+1).map((_ ,idx) => {
                return (
                  <tr key={idx+1}>
                    <td><Skeleton className='imageSkleton'/></td>
                    <td><Skeleton className='heightSkletan'/></td>
                    <td><Skeleton className='nameSkleton'/></td>
                    <td><Skeleton className='heightSkletan'/></td>
                    <td><Skeleton className='heightSkletan'/></td>
                    <td><Skeleton className='heightSkletan'/></td>
                    <td><Skeleton className='heightSkletan'/></td>
                  </tr>
                )
              })
              )
            }
          </tbody>
        </table>
      </div>
      {
        data.length>0 &&
      <div className='pageSection'>
        <div className='pagination'>
            {page>1 && <FaChevronCircleLeft className='navigation' onClick={handleLeftClick}/>}
            {
              pageArr.map((num,idx) => {
                return(
                  <p key={idx} className={num === (page)?('active'):('')} onClick={() => Number.isInteger(num)?setPages(num):("")}>{num}</p>
                )
              })
            }
            {page<data.length/10 && <FaChevronCircleRight className='navigation' onClick={handleRightClick}/>}
          </div>
      </div>
      }
    </div>
  )
}

export default Home
