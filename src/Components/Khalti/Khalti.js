import { useState, useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import myKey from "./KhaltiKey";

export default function Khalti({ amount, disabled }) {
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosprivate();
  const navigate = useNavigate();

  const startTime = localStorage.getItem("userSelectedStartTime");
  const endTime = localStorage.getItem("userSelectedEndTime");
  const parkingLotId = localStorage.getItem("userSelectedParkingLotId");
  const vehiclePlateNo = localStorage.getItem("userSelectedVehiclePlateNumber");
  const vehicleType = localStorage.getItem("userSelectedVehicleType");
  let buttonStyles = {
    backgroundColor: "purple",
    padding: "10px",
    color: "white",
    cursor: disabled ? "not-allowed" : "pointer",
    fontWeight: "bold",
    border: "1px solid white",
  };

  const handleBookingSubmit = () => {
    setLoader(true);
    const bookingPayload = {
      bookedParkingLot: parkingLotId,
      vehicleType,
      vehiclePlateNo,
      bookedTime: `${startTime}-${endTime}`,
    };
    axios
      .post(`/booking`, bookingPayload)
      .then((response) => {
        setLoader(false);
        localStorage.removeItem("userSelectedParkingLotId");
        localStorage.removeItem("userSelectedStartTime");
        localStorage.removeItem("userSelectedEndTime");
        localStorage.removeItem("userSelectedVehiclePlateNumber");
        localStorage.removeItem("userSelectedVehicleType");

        navigate("/payment-success");
      })
      .catch((err) => {
        navigate("/payment-error");
        setLoader(false);
      });
  };
  let config = {
    // replace this key with yours
    publicKey: myKey.publicTestKey,
    productIdentity: "123456",
    productName: "Online Slot Booking",
    productUrl: "http://localhost:3002",
    eventHandler: {
      onSuccess(payload) {
        // hit merchant api for initiating verfication
        axios
          .get(
            `/payments/khalti/${payload.token}/${payload.amount}/${myKey.secretkey}`
          )
          .then((res) => {
            handleBookingSubmit();
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // onError handler is optional
      onError(error) {
        // handle errors
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  let checkout = new KhaltiCheckout(config);

  return (
    <div>
      <button
        onClick={() => checkout.show({ amount: amount })}
        style={buttonStyles}
        disabled={disabled}
      >
        Pay Via Khalti
      </button>
    </div>
  );
}
