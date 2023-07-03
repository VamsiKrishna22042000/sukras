
import './payment.css'


import {BsCheck2} from 'react-icons/bs'


const Paymentprogress = (props) =>{

    const{prog,updateProgress } = props

    return(<div className='payment-progress'>
          <div className='head-progress'>
             <button className="arrow-btn-progress" type="button"><img className="left-arrow-progress" src="/backarrow.png"/></button>
             <p className='progress-title'>Cart</p>
          </div>
          <div className='cart-progress'>
          <div className='progress'>
                <p className='progress-para1'>{prog==="Cart"? 1:<BsCheck2 className='check-mark'/>}</p>
                <p className='progress-para2'>Cart</p>
            </div>
            <p className='progress-bar1'>- - - - - - - - - -</p>
            <div className='progress'>
                <p className={prog==="Cart"?'progress-para15':"progress-para3"}>{prog==="Cart"? 2:<BsCheck2 className='check-mark'/>}</p>
                <p className='progress-para2'>Schedule</p>
            </div>
            <p className={prog === "Cart" ?'progress-bar15':"progress-bar1"}>- - - - - - - - - -</p>
            <div className="progress">
                <p className={prog === "Cart" || "Schedule" ?'progress-para15':"progress-para3"}>3</p>
                <p className='progress-para2'>Payment</p>
            </div>
          </div>
    </div>)
}

export default Paymentprogress