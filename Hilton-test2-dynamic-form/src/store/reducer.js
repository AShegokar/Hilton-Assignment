import * as actionTypes from './actions';

const initialState = {
    rooms: [
        {
            roomName: 'Room1',
            defaultSelected: true,
            index: 0,
            adults: 1,
            childrens: 0,
            checkBox: true,
            selected: true
        },
        {
            roomName: 'Room2',
            defaultSelected: false,
            index: 1,
            adults: 1,
            childrens: 0,
            checkBox: true,
            selected: false
        },
        {
            roomName: 'Room3',
            defaultSelected: false,
            index: 2,
            adults: 1,
            childrens: 0,
            checkBox: true,
            selected: false
        },
        {
            roomName: 'Room4',
            defaultSelected: true,
            index: 3,
            adults: 1,
            childrens: 0,
            checkBox: true,
            selected: false
        }
    ]
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_ROOM:
            const rooms = state.rooms;
            let roomsArray = [];
            if (!rooms[action.roomIndex].selected) {
                roomsArray = rooms.map((room, ind) => {
                    if (ind <= action.roomIndex) {
                        room.selected = action.selected;
                    }
                    return room;
                });
            } else {
                roomsArray = rooms.map((room, ind) => {
                    if (ind >= action.roomIndex) {
                        room.selected = false;
                        room.childrens = 0;
                        room.adults = 1;
                    }
                    return room;
                });
            }
            return {
                ...state,
                rooms: [...roomsArray]
            }
        case actionTypes.UPDATE_CHILDREN:
            const roomsChildren = state.rooms;
            const roomObj = roomsChildren[action.roomIndex];
            roomObj.childrens = action.childrens;
            roomsChildren[action.roomIndex] = roomObj;
            return {
                ...state,
                rooms: [...roomsChildren]
            }

        case actionTypes.UPDATE_ADULTS:
            const roomAdults = state.rooms;
            const roomUpdateObj = roomAdults[action.roomIndex];
            roomUpdateObj.adults = action.numOfPersons;
            roomAdults[action.roomIndex] = roomUpdateObj;
            return {
                ...state,
                rooms: [...roomAdults]
            }
        default:
            return state;
    }
};

export default reducer;