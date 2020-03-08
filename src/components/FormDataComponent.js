import React, { Component } from 'react';
import uuid from "uuid";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import '../css/FormModal.css'

class FormDataComponent extends Component {

    formData;

    constructor(props) {
        super(props);

        this.userName = React.createRef();
        this.roomNumber = React.createRef();
        this.date = null;
        this.time = React.createRef();
        this.agenda = React.createRef();

        this.state = {
            scheduled_bookings: [],
            startDate: new Date(),
        }
    }

    handleChange = date => {
        this.setState({
            startDate: date,
        });
    }
    
    addBooking = (e) => {
        if(this.userName.current.value === "" || this.time.current.value === "" || this.agenda.current.value === "") {
            alert("all fields are mandatory!");
            e.preventDefault();
            return false; 
        }
        
        const Items = {
            id:uuid.v4(),
            userName:this.userName.current.value,
            roomNumber:this.roomNumber.current.value,
            date: this.state.startDate,
            time: this.time.current.value,
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
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat="dd-MM-yyyy"
                            minDate={new Date()}
                        />
                    </div>

                    <div className='form-group'>
                        <label>Time</label>
                        <input type="text" ref={this.time}></input>
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
