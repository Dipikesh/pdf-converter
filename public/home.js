console.log("hello");
async function ImageSubmit(event) {
  event.preventDefault();

  var bodyFormData = new FormData();
  let img = event.target.image.files[0];
  bodyFormData.append("image", img);

  const response = await axios({
    method: "post",
    url: "/convert",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
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
