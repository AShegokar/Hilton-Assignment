import Room from './Room';
import React from 'react';
import {configure , shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe("<RoomComponent />", () => {
    let wrapper, props;
    beforeEach(() => {
        props = {
            selectHandler:  jest.fn(),
            onToggleRoom: () => {},
            selectNumberOfAdults: () => {},
            selectAdultsHandler: jest.fn(),
            selectChildrenHandler: jest.fn()
        }     
        wrapper = shallow( <Room {...props}/>);   
    });
    
    it('renders without crashing', () => {  
        expect(wrapper).toBeTruthy();
    });
    
    it('renders render Room component with checkbox', () => {  
        expect(wrapper.find('.box').length).toBeTruthy();
    });   
    
    it('renders trigger changeHandler ', () => {  
        wrapper.find('.box').find('input').simulate('change');
        expect(props.selectHandler).toHaveBeenCalled();
    });
    
    it('should not render checkbox component', () => {
         wrapper.setProps({id: 0}); 
        wrapper = shallow( <Room {...props}/>);
        expect(wrapper.find('.box').length).toBeTruthy();
        expect(wrapper.find('.checkbox').length).toBe(0);
    });
    
    it('should trigger selectAdultsHandler and update store the selected adult value', () => {
        const mockEvent = {taget: {value: 2 }};
         wrapper.find('.adultsSection select').simulate('change', mockEvent);
         expect(props.selectAdultsHandler).toHaveBeenCalledWith(mockEvent);
    }); 
    
    it('should trigger selectChildrenHandler and update store the selected adult value', () => {
        const mockEvent = {taget: {value: 1 }};
         wrapper.find('.sSection select').simulate('change', mockEvent);
         expect(props.selectChildrenHandler).toHaveBeenCalledWith(mockEvent);
    }); 
    
});