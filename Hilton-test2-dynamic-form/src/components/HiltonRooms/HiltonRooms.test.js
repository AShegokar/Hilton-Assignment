import { HiltonRooms, mapStateToProps, mapDispatchToProps } from './HiltonRooms';
import Room from './../Room/Room';
import React from 'react';
import {configure , shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import HiltonRoom from './../Room/Room';

describe("<searchBoxComponent />", () => {
    let wrapper, props;
    beforeEach(() => {
        props = {
            rooms: [
                {
                    roomName: 'Room1',
                    defaultSelected: true,
                    index:0,
                    adults: 1,
                    childrens: 0,
                    checkBox: true,
                    selected: true
                },
                {
                    roomName: 'Room2',
                    defaultSelected: false,
                    index:1,
                    adults: 1,
                    childrens: 0,
                    checkBox: true,
                    selected: false
                },
                {
                    roomName: 'Room3',
                    defaultSelected: false,
                    index:2,
                    adults: 1,
                    childrens: 0,
                    checkBox: true,
                    selected: false
                },
                {
                    roomName: 'Room4',
                    defaultSelected: true,
                    index:3,
                    adults: 1,
                    childrens: 0,
                    checkBox: true,
                    selected: false
                }
            ],
            onToggleRoom: jest.fn(),
            selectNumberOfAdults: jest.fn(),
            selectNumberOfChildren: jest.fn(),
            selectHandler: () => {}
        }
        wrapper = shallow( <HiltonRooms {...props}/>);   
    })
    
    it('renders without crashing', () => {  
        expect(wrapper).toBeTruthy();
    });
    it('should render Room component', () => {
        expect(wrapper.find(Room)).toBeTruthy();
        expect(wrapper.find(Room).length).toEqual(4);
    });
    it('submitHandler', () => {
        wrapper.instance().submitHandler();
    });    
    
    it('should selectChildrenHandler', () => {
        const mockEvent = {taget: {value: 1 }};
         wrapper.find(HiltonRoom).at(0).prop('selectChildrenHandler')(mockEvent);
        expect(props.selectNumberOfChildren).toHaveBeenCalledWith(mockEvent, 0);
    });     
    
    it('should selectNumberOfAdults', () => {
        const mockEvent = {taget: {value: 1 }};
         wrapper.find(HiltonRoom).at(0).prop('selectAdultsHandler')(mockEvent);
        expect(props.selectNumberOfAdults).toHaveBeenCalledWith(mockEvent, 0);
    });   
    
    it('should selectHandler', () => {
        const mockEvent = {taget: {value: 1 }};
         wrapper.find(HiltonRoom).at(0).prop('selectHandler')(mockEvent);
        expect(props.onToggleRoom).toHaveBeenCalledWith(mockEvent, 0);
    });  
    
    it('mapStateToProps', () => {
        const initialState = {
            rooms: props.rooms
        };
        expect(mapStateToProps(initialState).rooms).toEqual(props.rooms);
    });
    it('should toggle the room from selectable to unselectable ', () => {
        const dispatch = jest.fn();
        const id = 1;
        const mockEvent = {
            target: {
             checked: true
            }
        };
        mapDispatchToProps(dispatch).onToggleRoom(mockEvent, id);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'TOGGLE_ROOM' , roomIndex: 1, selected: true });
    });
    it('should toggle the room from unselectable room to selectable ', () => {
        const dispatch = jest.fn();
        const id = 1;
        const mockEvent = {
            target: {
             checked: false
            }
        };
        mapDispatchToProps(dispatch).onToggleRoom(mockEvent, id);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'TOGGLE_ROOM' , roomIndex: 1, selected: false });
    });
    it('should update number Of childrens for the room with the selected value', () => {
        const dispatch = jest.fn();
        const id = 1;
        const mockEvent = {
            target: {
             value: 1
            }
        };
        mapDispatchToProps(dispatch).selectNumberOfChildren(mockEvent, id);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'UPDATE_CHILDREN' , roomIndex: 1, childrens: 1 });
    });
    it('should update numOfPersons for the room with selected value', () => {
        const dispatch = jest.fn();
        const id = 1;
        const mockEvent = {
            target: {
             value: 2
            }
        };
        mapDispatchToProps(dispatch).selectNumberOfAdults(mockEvent, id);
        expect(dispatch.mock.calls[0][0]).toEqual({ type: 'UPDATE_ADULTS' , roomIndex: 1, numOfPersons: 2 });
    });
});