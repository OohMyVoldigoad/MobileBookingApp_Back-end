import React, { useState } from 'react';

const MadaniArena = () => {
 const [selectedSport, setSelectedSport] = useState('');
 const [selectedDate, setSelectedDate] = useState('');

 const sports = ['Futsal', 'Badminton'];
 const dates = ['Senin, 15 Januari 2024'];

 const handleSportChange = (e) => {
    setSelectedSport(e.target.value);
 };

 const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
 };

 const renderSportsOptions = () => {
    return sports.map((sport) => (
      <option key={sport} value={sport}>
        {sport}
      </option>
    ));
 };

 const renderDatesOptions = () => {
    return dates.map((date) => (
      <option key={date} value={date}>
        {date}
      </option>
    ));
 };

 const renderTimeSlots = () => {
    const timeSlots = [
      { start: '10:00', end: '11:00', price: 'Rp. 100.000' },
      { start: '13:00', end: '14:00', price: 'Rp. 100.000' },
      { start: '15:00', end: '16:00', price: 'Rp. 150.000', isBooked: true },
      { start: '16:00', end: '15:00', price: 'Rp. 150.000' },
    ];

    return timeSlots.map((slot) => (
      <div key={slot.start}>
        <p>{slot.start} - {slot.end}</p>
        <p>{slot.price}</p>
        {slot.isBooked && <p>Booked</p>}
      </div>
    ));
 };

 return (
    <div>
      <h1>Madani Arena</h1>
      <div>
        <label htmlFor="sport">Sport:</label>
        <select id="sport" value={selectedSport} onChange={handleSportChange}>
          <option value="">Select a sport</option>
          {renderSportsOptions()}
        </select>
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <select id="date" value={selectedDate} onChange={handleDateChange}>
          <option value="">Select a date</option>
          {renderDatesOptions()}
        </select>
      </div>
      {selectedSport && selectedDate && (
        <div>
          <h2>Time Slots</h2>
          {renderTimeSlots()}
        </div>
      )}
    </div>
 );
};

export default MadaniArena;
