import React from 'react'
const Radio = (props)=>{
    const {click, checked, name, value,onChange} =props
    return (
        
            <input type='radio' name={name} onChange={onChange} value={value} checked={checked}  onClick= {click}/>
       
    )
}

export default Radio