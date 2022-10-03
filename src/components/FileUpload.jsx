import React, { useState } from "react";

export default function FileUpload(props) {
  /*const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const handleSubmission = () => {
    const formData = new FormData();

    formData.append("File", selectedFile);
  };*/

  return (
    <div>
      <input type="file" name="file" onChange={props.changeHandler} />
      {props.isSelected ? (
        <div>
          <p>Filename: {props.selectedFile.name}</p>
          <p>Filetype: {props.selectedFile.type}</p>
          <p>Size in bytes: {props.selectedFile.size}</p>
          <p>
            lastModifiedDate:{" "}
            {props.selectedFile.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      {/*<div>
        <button onClick={props.handleSubmission}>Submit</button>
      </div>*/}
    </div>
  );
}
