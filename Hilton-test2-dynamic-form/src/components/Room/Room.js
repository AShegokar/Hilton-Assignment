import React from 'react';

const HiltonRoom = (props) => (
    <div className="box">
    <div>
        {    props.id !== 0 ?
            <span  className="check">
            <input type ='checkbox'
                onChange={(e) => props.selectHandler(e)}
                checked={props.checked}
            />
            </span> 
            : 
            null 
        }
           <span className="boxheader"> {props.name}</span>
        </div>
        <div className={'box-container'}>
            <div className='adultsSection'>
                <div>Adults</div>
                <div className="age_section">(18+)</div>
                <div>
                    <select disabled={!props.checked}
                    value={props.adultsCount}
                    onChange={(e) => props.selectAdultsHandler(e)}>
                        <option> 1 </option>
                        <option> 2 </option>
                    </select>
                </div>
            </div>
            <div className='sSection'>
                <div>Children</div>
                <div className="age_section">(0-17)</div>
                <div>
                    <select disabled={!props.checked} 
                    value={props.childrensCount}
                    onChange={(e) => props.selectChildrenHandler(e)}>
                        <option> 0 </option>
                        <option> 1 </option>
                        <option> 2 </option>
                    </select>
                </div>
            </div>
        </div>
    </div>
);

export default HiltonRoom;