import React, { useEffect, useState } from "react";
import "./UserProfileUpdate.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import defaultProfie from "../../assets/Default_Profile_Picture.png";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";
import { storage } from "../../utils/Firebase";

const UserProfileUpdate = () => {
  const [formData, setFormData] = useState({
    name: "",
    plateNumber: "",
    vehicleType: "",
    gender: "",
    password: "",
    confirmPassword: "",
    email: "",
    contactNumber: "",
    profilePicture: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosprivate();
  const { auth } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement update logic here
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      uploadToFirebase(e.target.files[0]);
    }
  };

  const fetchUserData = async () => {
    setLoader(true);
    const user = await axios.get(`/users/${auth.id}`);
    setLoader(false);
    if (!user) {
      //display error modal
    }
    // setUser(user.data.data);
    setFormData({
      name: user.data.data.name,
      plateNumber: user.data.data.plateNumber,
      vehicleType: user.data.data.vehicleType,
      gender: user.data.data.gender,
      email: user.data.data.email,
      contactNumber: user.data.data.contactNumber,
      profilePicture: user.data.data.profilePictureURL,
      createdAt: user.data.data.createdAt,
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const uploadToFirebase = (image) => {
    setLoader(true);
    const imageRef = ref(storage, v4());
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        setLoader(false);
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const validateUpdate = () => {
    const errors = {};
    if (formData.name) {
    }
    if (formData.email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!regex.test(formData.email)) {
        errors.email = "Invalid email address";
      }
    }
    if (formData.contactNumber) {
      const regex = /^98\d{8}$/;
      if (!regex.test(formData.contactNumber)) {
        errors.contactNumber = "Invalid contact number";
      }
    }
    if (formData.password || formData.confirmPassword) {
      if (!(formData.password && formData.confirmPassword)) {
        errors.password = "Password and confirm password must be same";
      } else if (formData.password !== formData.confirmPassword) {
        errors.password = "Password and confirm password must be same";
      } else if (formData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }
    }
    if (formData.plateNumber) {
      const regex = /^[0-9]{4}$/;
      if (!regex.test(formData.plateNumber)) {
        errors.plateNumber = "Plate number must contain only numbers";
      }
    }

    setFormErrors(errors);
    return errors;
  };

  const handleUpdate = async () => {
    const erros = validateUpdate();
    if (Object.keys(erros).length > 0) {
      return;
    }
    setLoader(true);
    const payload = {};
    if (formData.profilePicture) {
      payload.profilePictureURL = formData.profilePicture;
    }
    if (formData.name) {
      payload.name = formData.name;
    }

    if (formData.email) {
      payload.email = formData.email;
    }
    if (formData.contactNumber) {
      payload.contactNumber = formData.contactNumber;
    }
    if (formData.plateNumber) {
      payload.plateNumber = formData.plateNumber;
    }
    if (formData.vehicleType) {
      payload.vehicleType = formData.vehicleType;
    }
    if (formData.gender) {
      payload.gender = formData.gender;
    }
    if (formData.password) {
      payload.password = formData.password;
    }

    await axios.patch(`/users/${auth.id}`, payload);
    await fetchUserData();
    setLoader(false);
    setModal({
      show: true,
      title: "Success",
      message: "Profile updated successfully",
      type: "success",
      hideAfterSeconds: 3,
    });
  };

  return (
    <div className="user-profile-update-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
          handleConfirmation={modal.handleConfirmation}
          data={modal.data}
        />
      ) : (
        ""
      )}
      <div className="row profile-update-sections">
        <div className="col-md-3 image-update-section">
          <div className="image-update-section-header">Sunima Rai</div>
          <div className="form-group">
            <div
              className="image-wrapper"
              style={{
                // backgroundImage: profilePicture
                //   ? profilePicture
                //   : defaultProfie,
                backgroundImage: `url( ${
                  formData.profilePicture
                    ? formData.profilePicture
                    : defaultProfie
                } )`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                border: "1px solid pink",
              }}
            >
              <div className="image-overlay">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => document.getElementById("imageInput").click()}
                >
                  Edit
                </button>
                <input
                  id="imageInput"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="d-none"
                />
              </div>
            </div>
          </div>
          <div className="image-update-section-footer">Member since: {}</div>
        </div>
        <div className="col-md-8 text-update-section">
          <h1>Update User Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>
            <div className="update-form-dual-item-holder">
              <div className="form-group col-sm-6">
                <label htmlFor="contact_number">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact_number"
                  value={formData.contactNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, contactNumber: e.target.value });
                  }}
                />
              </div>

              <div className="form-group col-sm-6">
                <label htmlFor="gender">Gender</label>
                <select
                  className="form-control"
                  id="gender"
                  value={formData.gender}
                  onChange={(e) => {
                    setFormData({ ...formData, gender: e.target.value });
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
            </div>
            <div className="update-form-dual-item-holder">
              <div className="form-group col-sm-6">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirm-password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
              </div>
            </div>

            <div className="update-form-dual-item-holder">
              <div className="form-group col-sm-6">
                <label htmlFor="plate_number">Plate Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="plate_number"
                  value={formData.plateNumber}
                  onChange={(e) => {
                    setFormData({ ...formData, plateNumber: e.target.value });
                  }}
                />
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="vehicle_type">Vehicle Type</label>
                <select
                  className="form-control"
                  id="vehicle_type"
                  value={formData.vehicleType}
                  onChange={(e) => {
                    setFormData({ ...formData, vehicleType: e.target.value });
                  }}
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="TWO_WHEELER">Two Wheeler</option>
                  <option value="FOUR_WHEELER">Four Wheeler</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <button className="btn btn-primary" onClick={() => handleUpdate()}>
              Update Profile
            </button>
            <button className="btn btn-danger" onClick={() => fetchUserData()}>
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfileUpdate;
