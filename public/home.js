console.log("hello");
async function ImageSubmit(event) {
  event.preventDefault();
  const len = event.target.image.files.length;
  console.log("event",event.target.image.files.length);
  var bodyFormData = new FormData();

  for(let l = 0; l < len; l++) {
    bodyFormData.append("image",event.target.image.files[l]);
  }
 

  const response = await axios({
    method: "post",
    url: "/convert",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
    setTimeout:{timeout:2000}
  });
// const response = await axios.post("/convert",{data:bodyFormData},{})

  if (response.data.message !== undefined) {
    alert(response.data.message);
    return;
  } else {
    window.open(
      `/pdf?fileName=${response.data.data}`,
      "_blank"
    );
  }
}
const form = document.getElementById("form");

form.addEventListener("submit", ImageSubmit);
