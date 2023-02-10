import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../CSS/Details.css'
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import personImage from './person-icon-8.png'

const Details = () => {
  const [detailsData, setDetailsData] = useState([])
  const{id} = useParams();

  useEffect(() => {
    (async _ =>{
      const res = await fetch(`https://forbes400.onrender.com/api/forbes400/getAllBillionaires`);
      const data = await res.json();
      setDetailsData(data[id-1]);
    })();
  },[id])

  const convertToAge = (m) => {
    const d = new Date(m);
    const n = new Date()
    return (Math.floor((n-d)/31536000000))
  }
  return (
    <div>
      <div className='header'><p>{'#'+id}</p><p>Real-Time Billionaires</p></div>
      <div style={{textAlign:'center'}}>{detailsData?.bios?(''):('Loading...')}</div>
      <div className='profileSection'>
        <div className='backgroundProfile'></div>
        <div className='profiles'>
          <div>
            <p><RiMoneyDollarCircleFill/><p>PROFILE</p></p>
            <p>{detailsData.personName}</p>
            <p>{detailsData.source}</p>
            <p>${((detailsData.finalWorth)/1000).toFixed(1)}B</p>
          </div>
          <img src={detailsData.squareImage?(detailsData?.squareImage):(personImage)} alt='profileImage'/>
        </div>
      </div>
      <div className='moreAbout'>
        <div className='about'>
            <p>About {detailsData.personName}</p>
            <ul>
              {
                detailsData?.bios?.map((item,idx) => {
                  return(
                    <><li key={idx}>{item}</li>&nbsp;</>
                  )
                })
              }
            </ul>
        </div>
        <div className='about'>
            <p>Did you know</p>
            <ul>
              {
                detailsData?.abouts?.map((item,idx) => {
                  return(
                    <><li key={idx}>{item}</li><br/></>
                  )
                })
              }
            </ul>
        </div>
        <div className='personalStatus'>
          <p>Personal Stats</p>
          <p>Age <span>{convertToAge(detailsData.birthDate)}</span></p>
          <p>Source of Wealth <span>{detailsData.source}</span></p>
          <p>Residence <span>{detailsData.city},{detailsData.state}</span></p>
          <p>Citizenship <span>{detailsData.countryOfCitizenship}</span></p>
          <p>
          Industries
          {
            detailsData?.industries?.map((ele,idx) => {
              return(
                <span key={idx}>{ele}</span>
              )
            })
          }
          </p>
        </div>
      </div>
    </div>
  )
}

export default Details
