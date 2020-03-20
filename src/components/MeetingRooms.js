import React, { Component } from 'react';
import MeetingRoomDetails from "./MeetingRoomDetails";
import FormDataComponent from "./FormDataComponent";
import moment from 'moment';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../css/MeetingRooms.css'

let time_slots = ['00:00', '09:00','09:30','10:00','10:30','11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00'];

let room_1_time_slots = [], room_1_time_slots_final = [], room_1_time_slots_unique = [];
let room_2_time_slots = [], room_2_time_slots_final = [], room_2_time_slots_unique = [];
let room_3_time_slots = [], room_3_time_slots_final = [], room_3_time_slots_unique = [];
let room_4_time_slots = [], room_4_time_slots_final = [], room_4_time_slots_unique = [];
let room_5_time_slots = [], room_5_time_slots_final = [], room_5_time_slots_unique = [];
let room_6_time_slots = [], room_6_time_slots_final = [], room_6_time_slots_unique = [];
let room_7_time_slots = [], room_7_time_slots_final = [], room_7_time_slots_unique = [];
let room_8_time_slots = [], room_8_time_slots_final = [], room_8_time_slots_unique = [];
let room_9_time_slots = [], room_9_time_slots_final = [], room_9_time_slots_unique = [];

class MeetingRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            showForm: false,
            data: JSON.parse(window.localStorage.getItem('scheduled_bookings')),
            roomNo:0,
            selectedDate: new Date(),
            selectedStartTime: "00:00",
            selectedEndTime: "00:00",
            room_1_status: 'Available',
            room_2_status: 'Available',
            room_3_status: 'Available',
            room_4_status: 'Available',
            room_5_status: 'Available',
            room_6_status: 'Available',
            room_7_status: 'Available',
            room_8_status: 'Available',
            room_9_status: 'Available',
        };
    }

    handleChange = date => {
        this.setState({
            selectedDate: date,
        });
    }

    handleStartTime = (e) => {
        let now = new Date();
        let currentTime = moment(now).format('HH:MM');
       
        this.setState({
            selectedStartTime: e.target.value,
        });
    }

    handleEndTime = (e) => {
        this.setState({
            selectedEndTime: e.target.value,
        });
    }

    handleOnSubmit = () => {
        let start_time_index = time_slots.indexOf(this.state.selectedStartTime);
        let end_time_index = time_slots.indexOf(this.state.selectedEndTime);
        if(start_time_index == 0 || end_time_index == 0) {
            alert("Select both start and end time");
            return false;
        } else if(start_time_index >= end_time_index) {
            alert("End time should be greater than start time");
            return false;
        }

        room_1_time_slots = []; room_2_time_slots = []; room_3_time_slots = []; room_4_time_slots = []; room_5_time_slots = [];
        room_6_time_slots = []; room_7_time_slots = []; room_8_time_slots = []; room_9_time_slots = [];
        let select_date = new Date(this.state.selectedDate).toISOString().split('T')[0];
        this.state.data.map((booking, index) => {
            if(booking.date.split('T')[0] === select_date) {
                if(booking.roomNumber == 1) {
                    room_1_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 2) {
                    room_2_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 3) {
                    room_3_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 4) {
                    room_4_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 5) {
                    room_5_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 6) {
                    room_6_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 7) {
                    room_7_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 8) {
                    room_8_time_slots.push(booking.timeSlots)
                } else if(booking.roomNumber == 9) {
                    room_9_time_slots.push(booking.timeSlots)
                }
            } 
        });


        room_1_time_slots_final = room_1_time_slots.reduce((a, b) => [...a, ...b], []);
        room_1_time_slots_unique = [...new Set(room_1_time_slots_final)];
        room_2_time_slots_final = room_2_time_slots.reduce((a, b) => [...a, ...b], []);
        room_2_time_slots_unique = [...new Set(room_2_time_slots_final)];
        room_3_time_slots_final = room_3_time_slots.reduce((a, b) => [...a, ...b], []);
        room_3_time_slots_unique = [...new Set(room_3_time_slots_final)];
        room_4_time_slots_final = room_4_time_slots.reduce((a, b) => [...a, ...b], []);
        room_4_time_slots_unique = [...new Set(room_4_time_slots_final)];
        room_5_time_slots_final = room_5_time_slots.reduce((a, b) => [...a, ...b], []);
        room_5_time_slots_unique = [...new Set(room_5_time_slots_final)];
        room_6_time_slots_final = room_6_time_slots.reduce((a, b) => [...a, ...b], []);
        room_6_time_slots_unique = [...new Set(room_6_time_slots_final)];
        room_7_time_slots_final = room_7_time_slots.reduce((a, b) => [...a, ...b], []);
        room_7_time_slots_unique = [...new Set(room_7_time_slots_final)];
        room_8_time_slots_final = room_8_time_slots.reduce((a, b) => [...a, ...b], []);
        room_8_time_slots_unique = [...new Set(room_8_time_slots_final)];
        room_9_time_slots_final = room_9_time_slots.reduce((a, b) => [...a, ...b], []);
        room_9_time_slots_unique = [...new Set(room_9_time_slots_final)];

        if(room_1_time_slots_unique.includes(this.state.selectedStartTime) || room_1_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_1_status: "Booked"});
        } else {
            this.setState({room_1_status: "Available"});
        }

        if(room_2_time_slots_unique.includes(this.state.selectedStartTime) || room_2_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_2_status: "Booked"});
        } else {
            this.setState({room_2_status: "Available"});
        }

        if(room_3_time_slots_unique.includes(this.state.selectedStartTime) || room_3_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_3_status: "Booked"});
        } else {
            this.setState({room_3_status: "Available"});
        }

        if(room_4_time_slots_unique.includes(this.state.selectedStartTime) || room_4_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_4_status: "Booked"});
        } else {
            this.setState({room_4_status: "Available"});
        }

        if(room_5_time_slots_unique.includes(this.state.selectedStartTime) || room_5_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_5_status: "Booked"});
        } else {
            this.setState({room_5_status: "Available"});
        }

        if(room_6_time_slots_unique.includes(this.state.selectedStartTime) || room_6_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_6_status: "Booked"});
        } else {
            this.setState({room_6_status: "Available"});
        }

        if(room_7_time_slots_unique.includes(this.state.selectedStartTime) || room_7_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_7_status: "Booked"});
        } else {
            this.setState({room_7_status: "Available"});
        }

        if(room_8_time_slots_unique.includes(this.state.selectedStartTime) || room_8_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_8_status: "Booked"});
        } else {
            this.setState({room_8_status: "Available"});
        }

        if(room_9_time_slots_unique.includes(this.state.selectedStartTime) || room_9_time_slots_unique.includes(this.state.selectedEndTime)) {
            this.setState({room_9_status: "Booked"});
        } else {
            this.setState({room_9_status: "Available"});
        }
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
        const booked_length = [];
        let room_1_time_slots = []
        this.state.data.map((booking, index) => {
            booked_length.push(booking.roomNumber);
            if(booking.roomNumber == 1) {
                room_1_time_slots.push(booking.timeSlots)
            } 
        });
        const booked_length_unique = [...new Set(booked_length)];
        const showDetailsActive = this.state.showDetails ? 'is-active' : "";
        const showFormActive = this.state.showForm ? 'is-active' : "";

        return (
            <div className="container">
                <h1>Book a Meeting Room</h1>

                <div className="slot-search">
                    <div className="date-container">
                        <label>Date:</label>
                        <DatePicker
                            selected={this.state.selectedDate}
                            onChange={this.handleChange}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                        />
                    </div>
                    <div className='start-time-container'>
                        <label>Start Time:</label>
                        <select id="start-time" onChange={ this.handleStartTime }>
                            <option value="00:00">Select</option>
                            <option value="09:00">09:00 AM</option>
                            <option value="09:30">09:30 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="10:30">10:30 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="01:00">01:00 PM</option>
                            <option value="01:30">01:30 PM</option>
                            <option value="02:00">02:00 PM</option>
                            <option value="02:30">02:30 PM</option>
                            <option value="03:00">03:00 PM</option>
                            <option value="03:30">03:30 PM</option>
                            <option value="04:00">04:00 PM</option>
                            <option value="04:30">04:30 PM</option>
                            <option value="05:00">05:00 PM</option>
                            <option value="05:30">05:30 PM</option>
                        </select>
                    </div>
                    <div className='end-time-container'>
                        <label>End Time:</label>
                        <select id="end-time" onChange={ this.handleEndTime }>
                            <option value="00:00">Select</option>
                            <option value="09:30">09:30 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="10:30">10:30 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="11:30">11:30 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="12:30">12:30 PM</option>
                            <option value="01:00">01:00 PM</option>
                            <option value="01:30">01:30 PM</option>
                            <option value="02:00">02:00 PM</option>
                            <option value="02:30">02:30 PM</option>
                            <option value="03:00">03:00 PM</option>
                            <option value="03:30">03:30 PM</option>
                            <option value="04:00">04:00 PM</option>
                            <option value="04:30">04:30 PM</option>
                            <option value="05:00">05:00 PM</option>
                            <option value="05:30">05:30 PM</option>
                            <option value="06:00">05:30 PM</option>
                        </select>
                    </div>

                    <button onClick={this.handleOnSubmit} className="check-availability">Check Availability</button>
                </div>

                <div className="meeting-rooms">
                    <div className="item">
                        <h3>Room 1</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 0)}>Book Room</button> 
                        <button className="view-btn" data-room="1" 
                            disabled={booked_length_unique.includes((1).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 0)}>View Details</button>   

                        <div className={`status ${this.state.room_1_status.toLowerCase()}`}><span></span> { this.state.room_1_status }</div>                     
                    </div>
                    <div className="item">
                        <h3>Room 2</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 1)}>Book Room</button> 
                        <button className="view-btn" data-room="2" 
                            disabled={booked_length_unique.includes((2).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 1)}>View Details</button>   

                        <div className={`status ${this.state.room_2_status.toLowerCase()}`}><span></span> { this.state.room_2_status }</div>                    
                    </div>
                    <div className="item">
                        <h3>Room 3</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 2)}>Book Room</button> 
                        <button className="view-btn" data-room="3" 
                            disabled={booked_length_unique.includes((3).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 2)}>View Details</button>   

                        <div className={`status ${this.state.room_3_status.toLowerCase()}`}><span></span> { this.state.room_3_status }</div>                    
                    </div>
                    <div className="item">
                        <h3>Room 4</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 3)}>Book Room</button> 
                        <button className="view-btn" data-room="4" 
                            disabled={booked_length_unique.includes((4).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 3)}>View Details</button>   

                        <div className={`status ${this.state.room_4_status.toLowerCase()}`}><span></span> { this.state.room_4_status }</div>                    
                    </div>
                    <div className="item">
                        <h3>Room 5</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 4)}>Book Room</button> 
                        <button className="view-btn" data-room="5" 
                            disabled={booked_length_unique.includes((5).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 4)}>View Details</button>   

                        <div className={`status ${this.state.room_5_status.toLowerCase()}`}><span></span> { this.state.room_5_status }</div>                   
                    </div>
                    <div className="item">
                        <h3>Room 6</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 5)}>Book Room</button> 
                        <button className="view-btn" data-room="6" 
                            disabled={booked_length_unique.includes((6).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 5)}>View Details</button>   

                        <div className={`status ${this.state.room_6_status.toLowerCase()}`}><span></span> { this.state.room_6_status }</div>                                 
                    </div>
                    <div className="item">
                        <h3>Room 7</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 6)}>Book Room</button> 
                        <button className="view-btn" data-room="7" 
                            disabled={booked_length_unique.includes((7).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 6)}>View Details</button>   

                        <div className={`status ${this.state.room_7_status.toLowerCase()}`}><span></span> { this.state.room_7_status }</div>                                       
                    </div>
                    <div className="item">
                        <h3>Room 8</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 7)}>Book Room</button> 
                        <button className="view-btn" data-room="8" 
                            disabled={booked_length_unique.includes((8).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 7)}>View Details</button>   

                        <div className={`status ${this.state.room_8_status.toLowerCase()}`}><span></span> { this.state.room_8_status }</div>                                        
                    </div>
                    <div className="item">
                        <h3>Room 9</h3>
                        <button className="booking-btn" onClick={this.showFormAction.bind(this, 8)}>Book Room</button> 
                        <button className="view-btn" data-room="9" 
                            disabled={booked_length_unique.includes((9).toString()) ? "" : "disabled"}
                            onClick={this.showDetailsAction.bind(this, 8)}>View Details</button>   

                        <div className={`status ${this.state.room_9_status.toLowerCase()}`}><span></span> { this.state.room_9_status }</div>                                        
                    </div>
                    {/* {Array.from(Array(9), (e, i) => {
                        return <div key={i} className="item">
                            <h3>Room {i + 1}</h3>
                            <button className="booking-btn" onClick={this.showFormAction.bind(this, i)}>Book Room</button> 
                            <button className="view-btn" data-room={i + 1} 
                                disabled={booked_length_unique.includes((i+1).toString()) ? "" : "disabled"}
                                onClick={this.showDetailsAction.bind(this, i)}>View Details</button>   

                            <div>{`${this.state.room_status_+i}`}</div>                     
                        </div>
                    })} */}
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