import React from 'react';
import {Alert} from 'react-bootstrap'

const Message = ({variant, children}) => {
    return ( 
        <Alert variant={variant} className='mt-20 px-20 d-flex align-items-center justify-content-center' style={{height:"300px"}}>{children}</Alert>
     );
}

Message.defaultProps ={
    variant: 'info'
}
 
export default Message;