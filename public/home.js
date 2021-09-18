console.log("hello");

uploadImage = async(data) => {
  const url = "/convert";
  var config = {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      // appends(percentCompleted);
      console.log("process",percentCompleted);
      document.getElementById("load").innerHTML = percentCompleted;
    },
  };

  const response = await axios.post(
    url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    config,
  });

  

  return response;
}
validateImage = async(event) => {
  const len = event.target.image.files.length;
  console.log("images", event.target.image.files.length);
  var bodyFormData = new FormData();

  for (let l = 0; l < len; l++) {
    var fileName = event.target.image.files[l].name;
    if (!fileName.match(/\.(png|jpg)$/)) {
      return false;
    }

    bodyFormData.append("image", event.target.image.files[l]);
  }
  return bodyFormData;
}
ImageSubmit = async(event) => {
  event.preventDefault();
console.log("image submit");
  const bodyFormData = await validateImage(event);
console.log(bodyFormData);

  if (!bodyFormData) {
    alert("Please Upload jpg or png File");
    return;
  }
  const response = await uploadImage(bodyFormData);
console.log(response);

  if (response.data.message !== undefined) {
    alert(response.data.message);
    return;
  } else {
    window.open(`/pdf?fileName=${response.data.data}`, "_blank");
  }
}

const form = document.getElementById("form");
form.addEventListener("submit", ImageSubmit);
window.onload = function () {
  document.getElementById("image").value = "";
};
