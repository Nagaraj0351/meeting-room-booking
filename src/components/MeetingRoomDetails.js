import React, { Component } from 'react';
import Moment from 'react-moment';
import '../css/MeetingRoomDetails.css'

class MeetingRoomDetails extends Component {
    constructor() {
        super();

        this.state = {
            data: JSON.parse(window.localStorage.getItem('scheduled_bookings'))
        }
    }

    deleteItem = (event)=> {
        let index = event.target.getAttribute('data-key')
        let listValue = JSON.parse(localStorage.getItem('scheduled_bookings'));
        listValue.splice(index,1)
        this.setState({data:listValue});
        localStorage.setItem('scheduled_bookings',JSON.stringify(listValue))
    }

    render() {
        const listItems = this.state.data ? this.state.data.map((booking, index) => {
            if(booking.roomNumber === this.props.roomno) {
                return <li key={booking.id}>
                    <div className="scheduled-date">
                        <Moment format="DD/MM/YYYY">
                            {Date.parse(booking.date)}
                        </Moment>
                    </div> 
                    <div className="scheduled-time">{booking.time}</div> 
                    <div className="scheduled-user">{booking.userName}</div> 
                    <div className="scheduled-agenda">{booking.agenda}</div> 
                    <div className="action-btns"><button data-key={index} onClick={this.deleteItem} className="delete-btn">Delete</button></div>
                </li>
            }
            
        }) : <li>
            All the time slots are free....
        </li>; 
        return (
            <div className="container">
                <h1>Room No. { this.props.roomno } <span className="close-icon" onClick={this.props.buttonClick}>x</span></h1>
    
                <div className="scheduled-slots-container">
                    <ul className="scheduled-slots">
                        { listItems }
                    </ul>
                </div>
            </div>
        )
    }
}

export default MeetingRoomDetails;