import React, { Component } from 'react';
import { connect } from 'react-redux';

import HiltonRoom from './../Room/Room';
import * as actionTypes from './../../store/actions';

export class HiltonRooms extends Component {
    constructor(props) {
        super(props);
        this.submitHandler = this.submitHandler.bind(this);
        this.state = {
            submitted: false,
            roomsInfo: []
        }
    }
    submitHandler() {
        this.setState({ submitted: true, roomsInfo: this.props.rooms });
    }
    render() {
        return (
            <div className="container">
                {this.props.rooms.map((room, ind) => {
                    return (
                        <HiltonRoom
                            key={room.index}
                            id={room.index}
                            name={room.roomName}
                            adultsCount={room.adults}
                            childrensCount={room.childrens}
                            checked={room.selected}
                            selectChildrenHandler={(e) => this.props.selectNumberOfChildren(e, ind)}
                            selectAdultsHandler={(e) => this.props.selectNumberOfAdults(e, ind)}
                            selectHandler={(e) => this.props.onToggleRoom(e, ind)} />
                    )
                })
                }
                {this.state.submitted ? <div>

                    <div>
                        <table cellPadding="5" cellSpacing="0" border="1">
                            <tbody>
                                <tr><th>Room</th><th>Number of Adults</th><th>Number Of Children</th></tr>
                                {this.state.roomsInfo.map((room, index) => (
                                    <tr key={index}><td>{room.roomName}</td><td>{room.adults}</td><td>{room.childrens}</td></tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div> :
                    null
                }
                <div className="footer">
                    <button className="submitbutton" onClick={this.submitHandler}> Submit </button>
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => {
    const { rooms } = state
    return {
        rooms: rooms
    };
};

export const mapDispatchToProps = dispatch => {
    return {
        onToggleRoom: (e, id) => dispatch({
            type: actionTypes.TOGGLE_ROOM,
            roomIndex: id,
            selected: e.target.checked
        }),

        selectNumberOfChildren: (e, id) => dispatch({
            type: actionTypes.UPDATE_CHILDREN,
            roomIndex: id,
            childrens: e.target.value
        }),
        selectNumberOfAdults: (e, id) => dispatch({
            type: actionTypes.UPDATE_ADULTS,
            roomIndex: id,
            numOfPersons: e.target.value
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HiltonRooms);