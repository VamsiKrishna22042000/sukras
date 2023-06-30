import {useState , useEffect} from 'react'


import './index.css'

const SelectedService = (props) =>{

    const [arr, setArr] = useState("")

    const{match}=props
    const {params}=match
   
    
    useEffect(()=>{
        setArr(params)
    },[])
   
    return(
     <div className='selected-category-con'>
        <div className='selected-body'>
            <div className='selected-body-content'>
                <h1>Hair Trim</h1>
                <div>
                    <p>4.5</p>
                    <p>(3.7k reviews)</p>
                </div>
                <div>
                    <p>₹ 599</p>
                    <p>. 30 mins</p>
                </div>
                <p>Get smooth & silky hairs</p>
                <p>Follow this up with styling look of your choice</p>
                <p>A quick trim to remove split ends while minimally reducing hair length</p>
                <button type="button">View Details</button>
            </div>
            <div className='selected-body-book'>
            <img src={`./${arr.category}.png`} alt={arr.category}/>
            <button type="button">Book</button>
            </div>
        </div>
     </div>)
}

export default SelectedService