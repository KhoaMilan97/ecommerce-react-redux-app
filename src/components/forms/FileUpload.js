import React from "react";
import Resizer from "react-image-file-resizer";
import Axios from "../../api";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";

function FileUpload({ values, setValues, setLoading, loading }) {
  const user = useSelector((state) => state.user);
  const fileUploadAndResize = (e) => {
    // resize
    const { files } = e.target;
    const allFileUploaded = values.images;
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      Resizer.imageFileResizer(
        files[i],
        720,
        720,
        "JPEG",
        100,
        0,
        (uri) => {
          Axios.post(
            `/uploadimages`,
            { image: uri },
            {
              headers: {
                authtoken: user ? user.token : "",
              },
            }
          )
            .then((res) => {
              setLoading(false);
              console.log(res);
              allFileUploaded.push(res.data);
              setValues({
                ...values,
                images: allFileUploaded,
              });
            })
            .catch((err) => {
              console.log("CLOUDINARY UPLOAD ERR", err);
              setLoading(false);
            });
        },
        "base64"
      );
    }
    // send back to server to upload to cloudinary
    // set url to image[] in the parent component state - ProductCreate
  };

  const removeUploadFile = (public_id) => {
    // console.log("Image is removed", public_id);
    setLoading(true);
    Axios.post(
      `/removeimages`,
      { public_id },
      {
        headers: {
          authtoken: user ? user.token : "",
        },
      }
    )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        const imageFiltered = images.filter(
          (item) => item.public_id !== public_id
        );
        setValues({
          ...values,
          images: imageFiltered,
        });
      })
      .catch((err) => {
        console.log("CLOUDINARY UPLOAD ERR", err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              key={image.public_id}
              count="X"
              style={{ cursor: "pointer" }}
              onClick={() => removeUploadFile(image.public_id)}
            >
              <Avatar
                src={image.url}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          {loading ? "Loading..." : "Choose File"}
          <input
            type="file"
            name="images"
            hidden
            multiple
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
}

export default FileUpload;
