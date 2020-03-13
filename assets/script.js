$(document).ready(function() {
  let buttonsArray = [];

  function drawButtons() {
    for (let i = 0; i < buttonsArray.length; i++) {
      let buttonHolder = $("<button>");
      buttonHolder.text(buttonsArray[i]);
      buttonHolder.attr("class", "standard");
      $(".button-holder").append(buttonHolder);
    }
  }
  drawButtons();

  $(".button-holder").on("click", ".standard", function(event) {
    event.preventDefault();
    let searchTerm = $(this).text();
    console.log(searchTerm);
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=TH10pVebeg0ctkY0eMZcYZIjR4MxHF47&limit=10&q=" +
      searchTerm;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        for (let i = 0; i < response.data.length; i++) {
          let image = $("<img>").attr("class", "giphies");

          image.attr("src", response.data[i].images.fixed_width_small);
          $(".giphy-holder").prepend(image);
        }
      });
  });

  $(".submit").on("click", function(event) {
    event.preventDefault();
    let searchTerm = $(".search")
      .val()
      .trim();
    let queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=TH10pVebeg0ctkY0eMZcYZIjR4MxHF47&limit=10&q=" +
      searchTerm;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        addButton(searchTerm);
        for (let i = 0; i < response.data.length; i++) {
          let image = $("<img>");
          let still = image
            .attr("src", response.data[i].images.downsized_still.url)
            .attr("alt", "false")
            .attr("id", `${response.data[i].id}`);
          $(still).on("click", function(event) {
            event.preventDefault();
            if ($(`#${event.target.id}`).attr("alt") == "false") {
              $(`#${event.target.id}`)
                .attr("alt", "true")
                .attr("src", response.data[i].images.downsized_large.url);
            } else {
              $(`#${event.target.id}`)
                .attr("alt", "false")
                .attr("src", response.data[i].images.downsized_still.url);
            }
          }); // onClick Ends
          $(".giphy-holder").prepend(still);
        } // For Loops Ends
      });
  });
  function addButton(buttonName) {
    let buttonHolder = $("<button>");
    buttonHolder.text(buttonName);
    buttonHolder.attr("class", "standard");
    $(".button-holder").append(buttonHolder);
  }
});
