console.log("hello");
async function ImageSubmit(event) {
  event.preventDefault();
  const len = event.target.image.files.length;
  console.log("images",event.target.image.files.length);
  var bodyFormData = new FormData();

  for(let l = 0; l < len; l++) {
    bodyFormData.append("image",event.target.image.files[l]);
  }
  
  var config = {
            onUploadProgress: (progressEvent)=> {
              var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            }
          };
  // document.getElementById("image").value = NULL;


  const response = await axios({
    method: "post",
    url: "/convert",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress:config.onUploadProgress,
    
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
  window.onload = function(){
    
        document.getElementById("image").value = "";
        // document.getElementById("b").innerHTML = "";
    
    }
const form = document.getElementById("form");

form.addEventListener("submit", ImageSubmit);

