
import React, { useEffect,useState,useMemo } from "react" 
import { useDispatch,useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import {getAlldata} from "./action"
import Footer from "./Footer"
import "./App.css"

function Home() {
        const dispatch =useDispatch()
        const {data} =useSelector(state=> state.allPrudoct)
        const [indexCheck,setIndex]=useState(0)
        const navigate =useNavigate()
        useEffect(()=>{
          dispatch(getAlldata())
        },[])
        const sliderContent = useMemo(() => data.map((item,index)=>{
          return {image:`http://localhost:3000/${data[index]?.image}`,name:data[index]?.name}
        }), [data])
        
        useEffect(()=>{
          if(indexCheck===sliderContent.length)setIndex(0);
          const myinterval=setInterval(()=>{
             setIndex(l=>l+1)
          },5000)
          return ()=>{
            clearInterval(myinterval)
          }
        },[indexCheck])
     
        
        return <>
        {data.length &&
        <div className="sliderContent">
            <section className="slider-content">
        <div className="mainSlider">
          {sliderContent.map((item,index)=>{
            return <div className={`slide${index===indexCheck?"active":""}`} key={index}>
            <img src={`${sliderContent[index].image}`} style={{width:"100%"}}></img>
            <div className="showp">
            <p>{sliderContent[index].name}</p>
            </div>
          </div>
          })}
         <span className="prev" onClick={()=>{
           if(indexCheck==0){
             setIndex(sliderContent.length - 1)
             console.log(sliderContent.length -1)
           }else{
            setIndex(l=>l-1)
           }
           }}>&#10094;</span>
         <span className="next" onClick={()=>{
           if(indexCheck==sliderContent.length - 1){
             setIndex(0)
           }else{
            setIndex(l=>l+1)
           }
           }}>&#10095;</span>
        </div>
        <div className="points">
          {sliderContent.map((item,index)=>{
            return <span onClick={()=>{
              setIndex(index)
            }} className={`${index===indexCheck?"active":""}`} key={index}></span>
          })}
          </div>
      </section>

        </div>
      
        }
        <div className="home">
        {data.length ? data.map((item,index)=>{
          return <div key={index} className="product">
            <img src={`http://localhost:3000/${item.image}`}  ></img>
            <p className="homeName">{item.name}</p>
            <p className="description">{item.description}</p>
            <p className="homePrice">{item.price}</p>
            <button className="btnShowItem"
            onClick={()=>
              {
                navigate(`prudoct/${item._id}`)
                }} 
            >Show ditails</button>
            
          </div>
        }):<div className="loodercontent">
          <div className="looder">
          <span></span>
          <span></span>
          <span></span>          
          </div>
          
          </div>}
        </div>
          <Footer />

                </>
}

export default Home
