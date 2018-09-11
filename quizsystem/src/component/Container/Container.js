import React from 'react'
import withStyle from '../../withStyle'
import style from './Container.style'
// import Header from './Header'
import {connect} from 'react-redux'

const Container = (props) => {
    const {className, user} = props;
    return (

        <div className={`${className} container`} >
        {/* <Header user={user}/> */}
        Hello
        </div>
    )
}


const mapStateToProps = (state)=> ({
    user: state.UserReducer.user
  })
  
  const ContainerComponent =  withStyle(Container, style)
  export default connect(mapStateToProps, null)(ContainerComponent);
  
