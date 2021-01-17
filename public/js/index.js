$(document).ready(function () {
  let files = [];

  $.ajaxSetup({
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    },
  });

  $("input").on("change", function () {
    var input = document.querySelector("input");
    // input.files.map((inp) => {
    //   console.log(inp);
    // });

    for (let i = 0; i < input.files.length; i++) {
      const fileSource = URL.createObjectURL(input.files[i]);
      const fileAttr = input.files[i];
      files.push({ fileSource, fileAttr });
      // arrayOfFileSrc.push(imageSource);
    }

    console.log(files);

    $(".image").empty();

    files.forEach((element, index) => {
      $(".image").prepend(`
      <div class="div-image-${index}">
        <img src="${element.fileSource}" />
        <p>${element.fileAttr.name}</p>
        <button class="button-remove" id="${index}">Remove</button>
        <button class="upload" id="${index}">Upload</button>
      </div>
    `);
    });
  });

  $(document).on("click", ".button-remove", function () {
    const mediaId = $(this).attr("id");
    files.splice(mediaId, 1);
    $(`.div-image-${mediaId}`).remove();
    console.log(files);
  });

  $(document).on("click", ".upload", function () {
    const mediaId = $(this).attr("id");
    const fileData = files[mediaId].fileAttr;

    console.log(fileData);

    console.log("NIGGA");

    // $.ajax({
    //   headers: { "content-type": "multipart/form-data" },
    //   url: "data",
    //   type: "POST",
    //   data: formData,
    //   processData: false,
    //   contentType: false,
    // }).done(function (data) {
    //   console.log(data);
    // });

    let formData = new FormData();
    formData.append("file", fileData);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios
      .post("http://127.0.0.1:8000/data", formData, config)
      .then((response) => {
        console.log(response.data);
      });
  });

  $("#send-all").on("click", function () {
    files.forEach((f) => {
      let formData = new FormData();
      formData.append("file", f.fileAttr);
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      axios
        .post("http://127.0.0.1:8000/data", formData, config)
        .then((response) => {
          console.log(response.data);
        });
    });
  });

  function uploadSingle(mediaID) {
    console.log(mediaID);
  }

  $("#get-ajax").on("click", function () {
    console.log("nigga");
    var APP_CSRF = document.querySelector("meta[name='csrf-token']").content;
    console.log(APP_CSRF);
    $.ajax({
      url: "data",
    }).done(function (data) {
      console.log(data);
    });
  });
});
