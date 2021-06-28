import React from "react";
import * as fileService from "./services/fileService";

class FileUpload extends React.Component {
  state = {
    selectedFile: null,
  };

  onFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    console.log(this.state.selectedFile);

    fileService
      .add(formData)
      .then(this.onUploadSuccess)
      .catch(this.onUploadError);
  };

  onUploadSuccess = (response) => console.log(response);
  onUploadError = (err) => console.warn(err);

  render() {
    return (
      <div>
        <h1>File Upload</h1>
        <div>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload} className="btn btn-primary">
            Upload!
          </button>
        </div>
      </div>
    );
  }
}

export default FileUpload;
