import React, { useMemo } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { storage } from "../../utils/Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../styles/PhotoUpdate.css";

//TODO: when components loads call the fetch parkinglot by id api and
// save the image urls in the images state then continue
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

  // position: "absolute",
  // top: "20%",
  // marginTop: " 20%",
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

function PhotoUpdate(props) {
  const [images, setImages] = useState([]);
  const uploadToFirebase = (image) => {
    console.log("upload to firebase called");
    const imageRef = ref(storage, v4());
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          setImages((previousImages) => {
            return [...previousImages, downloadURL];
          });
        });
      })
      .catch((error) => {
        //display a modal stating error uploading a image
      });
  };

  const deletePhoto = (imageIndexToDelete) => {
    console.log("here " + imageIndexToDelete);
    const allImageUrls = [...images];
    allImageUrls.splice(imageIndexToDelete, 1);
    setImages(allImageUrls);
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
      // at first start spinner
      // images must store the firebase url, check if the length exceeds 5, if exceeds stop here
      // if okay upload the file to the firebase and add the preview url to the images list
      const currentStoredImageNumber = images?.length || 0;
      const toStoreImageNumber = acceptedFiles?.length || 0;
      if (currentStoredImageNumber + toStoreImageNumber > 5) {
        // show error modal
        console.log("MORE THAN 5 NOT ALLOWED  ");
      } else {
        //call function for firebase upload

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

      <div className="staff-update-button-holder col-sm-3">
        <button
          type="button"
          class="btn btn-primary btn-lg"
          style={{ float: "right" }}
        >
          Update
        </button>
        <button
          type="button"
          class="btn btn-danger btn-lg"
          style={{ float: "left" }}
        >
          Discard
        </button>
      </div>
    </div>
  );
}

export default PhotoUpdate;
