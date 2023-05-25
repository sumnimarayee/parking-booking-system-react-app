import React, { useMemo, useEffect } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../utils/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/PhotoUpdate.css";
import useAxiosprivate from "../../hooks/useAxiosPrivate";
import Loader from "../Common/Loader";
import Modal from "../Modals/Modal";
import { computeStaffProfileUpdatePercentage } from "../../utils/utility";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 20,
  borderColor: "royalblue",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#6a4d4d",
  outline: "none",
  transition: "border .24s ease-in-out",
  height: "150px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function PhotoUpdate({ setProfileCompletedPercentage }) {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [modal, setModal] = useState({});

  const axios = useAxiosprivate();

  useEffect(() => {
    setLoader(true);
    const fetchParkingLot = async () => {
      const response = await axios.get(
        `parking-lot/${localStorage.getItem("parkingLotId")}`
      );
      setLoader(false);
      const parkingLot = response.data.data;
      const setData = parkingLot.imageURLs;
      setImages(setData);
    };
    fetchParkingLot();
  }, []);

  const uploadToFirebase = (image) => {
    setLoader(true);
    const imageRef = ref(storage, v4());
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        setLoader(false);
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImages((previousImages) => {
            return [...previousImages, downloadURL];
          });
        });
      })
      .catch((error) => {
        setLoader(false);
      });
  };

  const deletePhoto = (imageIndexToDelete) => {
    const allImageUrls = [...images];
    allImageUrls.splice(imageIndexToDelete, 1);
    setImages(allImageUrls);
  };

  const onSubmitForm = (e) => {
    setLoader(true);
    const payload = {};
    payload.imageURLs = images;
    // API call to update the parking lot
    axios
      .patch(`/parking-lot/${localStorage.getItem("parkingLotId")}`, payload)
      .then((res) => {
        setLoader(false);
        const percent = computeStaffProfileUpdatePercentage(
          res.data.data.updatedItems
        );
        localStorage.setItem("profileCompletedPercentage", percent);
        setProfileCompletedPercentage(percent);
        setModal({
          show: true,
          title: "Photo Updated",
          message: "Your photos has been updated successfully",
          type: "success",
          hideAfterSeconds: 3,
        });
      })
      .catch((error) => {
        setLoader(false);
        //modal
      });
  };

  const resetPhotoUpdate = async () => {
    const response = await axios.get(
      `parking-lot/${localStorage.getItem("parkingLotId")}`
    );

    const parkingLot = response.data.data;
    const setData = parkingLot.imageURLs;
    setImages(setData);
    setLoader(false);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      // images must store the firebase url, check if the length exceeds 5, if exceeds stop here
      // if okay upload the file to the firebase and add the preview url to the images list
      const currentStoredImageNumber = images?.length || 0;
      const toStoreImageNumber = acceptedFiles?.length || 0;
      if (currentStoredImageNumber + toStoreImageNumber > 5) {
      } else {
        acceptedFiles.forEach(async (file) => {
          await uploadToFirebase(file);
        });
      }
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="upload-parking-lot-images-container">
      {loader ? <Loader /> : ""}
      {modal.show ? (
        <Modal
          modal={setModal}
          title={modal.title}
          message={modal.message}
          type={modal.type}
          hideAfterSeconds={modal.hideAfterSeconds}
        />
      ) : (
        ""
      )}
      <div className="file-dropzone-container">
        <div className="dropzone-holder">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <CloudUploadIcon style={{ width: "3em", height: "3em" }} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </div>
      </div>
      {images.length > 0 ? (
        <div className="photo-container">
          {images?.map((downloadURL, index) => (
            <div
              className="photo-holder"
              key={index}
              style={{
                backgroundImage: `url(${downloadURL})`,
                backgroundSize: "cover",
              }}
            >
              <div className="delete-photo-icon hide">
                <div
                  style={{ float: "right", cursor: "pointer" }}
                  onClick={() => {
                    deletePhoto(index);
                  }}
                >
                  <DeleteIcon
                    style={{ color: "red", width: "2em", height: "2em" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}

      <div className="photo-update-button-holder">
        <button
          type="button"
          className="btn btn-primary btn-lg"
          onClick={() => {
            onSubmitForm();
          }}
        >
          Update
        </button>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          onClick={() => resetPhotoUpdate()}
        >
          Discard
        </button>
      </div>
    </div>
  );
}

export default PhotoUpdate;
