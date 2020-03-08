import React, { Component } from 'react';
import MeetingRoomDetails from "./MeetingRoomDetails";
import FormDataComponent from "./FormDataComponent";
import '../css/MeetingRooms.css'

class MeetingRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showForm: false,
            data: null,
            roomNo:0
        };
    }

    changeDetailsState(event) {
        this.setState({showDetails: !this.state.showDetails})
    }
    changeFormState(event) {
        this.setState({showForm: !this.state.showForm})
    }

    showDetailsAction(i) {
        this.setState({roomNo: i + 1});
        this.setState({showDetails: !this.state.showDetails})
    }
    showFormAction(i) {
        this.setState({roomNo: i + 1});
        this.setState({showForm: !this.state.showForm})
    }

    render() {
        const showDetailsActive = this.state.showDetails ? 'is-active' : "";
        const showFormActive = this.state.showForm ? 'is-active' : "";
        return (
            <div className="container">
                <h1>Book a Meeting Room</h1>

                <div className="meeting-rooms">
                    {Array.from(Array(9), (e, i) => {
                        return <div key={i} className="item">
                            <h3>Room {i + 1}</h3>

                            <button className="booking-btn" onClick={this.showFormAction.bind(this, i)}>Book Room</button> 
                            <button className="view-btn" data-room={i + 1}
                                onClick={this.showDetailsAction.bind(this, i)}>View Details</button>                        
                        </div>
                    })}
                </div>

                <div className={`room-details-container ${showDetailsActive}`}>
                    <MeetingRoomDetails roomno={this.state.roomNo} buttonClick={this.changeDetailsState.bind(this)}></MeetingRoomDetails>
                </div>

                <div className={`form-modal-container ${showFormActive}`}>
                    <FormDataComponent roomno={this.state.roomNo} buttonClick={this.changeFormState.bind(this)}></FormDataComponent>
                </div>
            </div>
        )
    }
}

export default MeetingRooms;