import React, { Component } from 'react';
import uuid from "uuid";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../css/FormModal.css'

let time_slots = ['09:00','09:30','10:00','10:30','11:00', '11:30', '12:00', '12:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00'];

class FormDataComponent extends Component {

    formData;

    constructor(props) {
        super(props);

        this.userName = React.createRef();
        this.roomNumber = React.createRef();
        this.date = null;
        this.startTime = React.createRef();
        this.endTime = React.createRef();
        this.agenda = React.createRef();

        this.state = {
            scheduled_bookings: [],
            selectedDate: new Date(),
            data: JSON.parse(window.localStorage.getItem('scheduled_bookings'))
        }
    }

    handleChange = date => {
        this.setState({
            selectedDate: date,
        });
    }
    
    addBooking = (e) => {
        if(this.userName.current.value === "" || this.agenda.current.value === "") {
            alert("all fields are mandatory!");
            e.preventDefault();
            return false; 
        }

        let start_time_index = time_slots.indexOf(this.startTime.value);
        let end_time_index = time_slots.indexOf(this.endTime.value);
        let time_slots_selected = time_slots.slice(start_time_index, end_time_index + 1);

        if(start_time_index >= end_time_index) {
            alert("End time should be greater than start time");
            e.preventDefault();
            return false;
        }
        
        const Items = {
            id:uuid.v4(),
            userName:this.userName.current.value,
            roomNumber:this.roomNumber.current.value,
            date: this.state.selectedDate,
            timeSlots: time_slots_selected,
            agenda:this.agenda.current.value
        }
        if(localStorage.getItem('scheduled_bookings') == null) {
            const scheduled_bookings = [];
            scheduled_bookings.push(Items);
            localStorage.setItem("scheduled_bookings", JSON.stringify(scheduled_bookings));
        } else {
            const scheduled_bookings=JSON.parse(localStorage.getItem('scheduled_bookings'))
            scheduled_bookings.push(Items)
            localStorage.setItem("scheduled_bookings",JSON.stringify(scheduled_bookings))
        }

        this.setState({
            scheduled_bookings:JSON.parse(localStorage.getItem('scheduled_bookings'))
        });
    }

    componentDidMount() {
        const scheduled_bookings = window.localStorage.getItem('scheduled_bookings');
        const parsedScheduledBookings = JSON.parse(scheduled_bookings);
        if(scheduled_bookings == null) {
            return false;
        }
        else{
            this.setState({
                scheduled_bookings: parsedScheduledBookings,
            })
        }
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <span className="close-icon" onClick={this.props.buttonClick}>x</span>
                    <h1>Book a Room</h1>
                    <div className='form-group'>
                        <label>User Name</label>
                        <input type="text" ref={ this.userName }/>
                    </div>
                    <div className='form-group'>
                        <label>Date</label>
                        <DatePicker
                            selected={this.state.selectedDate}
                            onChange={this.handleChange}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Time</label>
                        {/* <input type="text" ref={this.time}></input> */}
                        <div className='time-range'>
                            <div className='start-time-container'>
                                <span>Start Time:</span>
                                <select id="start-time" name="startTime" ref={(start_time) => this.startTime = start_time }>
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
                                <span>End Time:</span>
                                <select id="end-time" name="endTime" ref={(end_time) => this.endTime = end_time }>
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
                        </div>
                    </div>
                    
                    <div className='form-group'>
                        <label>Agenda</label>
                        <input type="text" ref={this.agenda}/>
                    </div>
                    <input type="hidden" value={this.props.roomno} ref={ this.roomNumber }/>
                    <button onClick={this.addBooking} className="submit-btn">Submit</button>
                </form>
            </div>
        )
    }
}

export default FormDataComponent;
