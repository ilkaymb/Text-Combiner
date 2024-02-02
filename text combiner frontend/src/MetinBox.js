import React from 'react';
import { useState ,useEffect} from 'react';

import Slide from 'react-reveal/Slide';


function MetinBox({handleChange,name}) {



return (    
    <div class="col-sm-12 col-md-12  col-lg-12">   
     <Slide top>

    <form>
<div class="form-group text-box-animation" >
<label for={`exampleFormControlTextarea${(name+1)}`} style={{fontSize:'18px',height:'30px'}}>{name+1}. Metin</label>
<textarea class="form-control" name={name}  onChange={(e) => handleChange(e)} style={{width:'100%',height:'140px',backgroundColor:'transparent',color:'white',borderRadius:0}} id={`exampleFormControlTextarea${(name+1)}`} rows="3"></textarea>
</div>
</form>
    </Slide>
    </div>

);
}
export default MetinBox;
