import React, { useEffect, useState } from "react";
import useAxiosprivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import "../styles/BookingHistory.css";
import { getFormattedDate } from "../utils/utility";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const axios = useAxiosprivate();
  const { auth } = useAuth();
  const fetchUserBookings = async (timePeriod) => {
    const response = await axios.get(
      `/booking/user/${auth.id}?timePeriod=${timePeriod}`
    );
    console.log(response);

    setBookings(response.data.data.bookings);
  };
  useEffect(() => {
    fetchUserBookings("total");
  }, []);

  const computeTimeDifference = (bookingTime) => {
    const startTime = bookingTime.split("-")[0];
    const endTime = bookingTime.split("-")[1];
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");

    const diffInMinutes =
      endHour * 60 + Number(endMinute) - (startHour * 60 + Number(startMinute));

    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    const hourString =
      hours > 0 ? hours + " hour" + (hours > 1 ? "s" : "") + ", " : "";
    const minuteString =
      minutes > 0 ? minutes + " min" + (minutes > 1 ? "s" : "") : "";

    return hourString + minuteString;
  };

  return (
    <div className="booking-history-container">
      <div className="booking-card-container">
        {bookings?.map((booking, index) => {
          {
            console.log("im here");
          }
          return (
            <div className="booking-card" key={index}>
              <div className="booking-card-header">
                {getFormattedDate(booking?.createdAt.split("T")[0])}
              </div>
              <div className="booking-card-body">
                <div className="parking-name">
                  <div>{booking?.parkingLot?.name}</div>
                </div>
                <div className="row">
                  <div className="col-sm-4">Assigned Slot: </div>
                  <div className="col-sm-8">{`${booking?.assignedSlot}`}</div>
                </div>
                <div className="row">
                  <div className="col-sm-4">Booked Time: </div>
                  <div className="col-sm-8">
                    {`${booking?.bookedTime.split("-")[0]} - ${
                      booking?.bookedTime.split("-")[1]
                    }  (${computeTimeDifference(booking?.bookedTime)})`}
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">Amount Paid: </div>
                  <div className="col-sm-8">{`Rs ${Number(
                    booking?.payment?.paymentAmount
                  ).toFixed(2)}`}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingHistory;
