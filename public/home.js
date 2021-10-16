
uploadImage = async (data) => {
  const url = "/convert";

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress(progressEvent) {
        console.log({ progressEvent });
        document.getElementById("load").innerHTML = "Uploading";
      },
    });

    console.log("res", response);

    return response;
  } catch (err) {
    alert(" AXIOS Image Limit or size exceeded"+ err);
  }
};

ImageSubmit = async (event) => {
  event.preventDefault();
  console.log("image submit");
var bodyFormData = new FormData();

  const len = event.target.image.files.length;
  for (var i = 0; i < len; i++) {
    await handleImageUpload(event.target.image.files[i],bodyFormData);
   
  }

  console.log("bodyFormData" + bodyFormData);

  if (!bodyFormData) {
    alert("Please Upload jpg or png File");
    return;
  }
  const response = await uploadImage(bodyFormData);

  if (response) {
    window.open(`/pdf?fileName=${response.data.data}`, "_blank");
  }
};

const form = document.getElementById("form");
form.addEventListener("submit", ImageSubmit);
window.onload = function () {
  document.getElementById("image").value = "";
};

handleImageUpload = async(imageFile, bodyFormData) => {
  
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    var options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    await imageCompression(imageFile, options)
      .then(function (compressedFile) {
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true
        console.log(
          `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        ); // smaller than maxSizeMB

        console.log("compressed file", compressedFile);

        // write your own logic
        bodyFormData.append("image", compressedFile);
        console.log("bodyFormData", bodyFormData.entries())
        return;
        
      })
      .catch(function (error) {
        console.log(error.message);
      });

  
}
