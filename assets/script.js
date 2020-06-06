$(document).ready(function () {
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

  $(".button-holder").on("click", ".standard", function (event) {
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
      .then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          let gridItem = $("<div>").attr("class", "grid-item");
          let image = $("<img>").attr("class", "giphies");
          image.attr("src", response.data[i].images.fixed_width_small);
          gridItem.append(image);
          $(".giphy-holder").prepend(gridItem);
        }
      });
  });

  $(".submit").on("click", function (event) {
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
      .then(function (response) {
        addButton(searchTerm);
        for (let i = 0; i < response.data.length; i++) {
          let gridItem = $("<div>").attr("class", "grid-item");
          let image = $("<img>");
          let still = image
            .attr("src", response.data[i].images.downsized_still.url)
            .attr("alt", "false")
            .attr("id", `${response.data[i].id}`);
          gridItem.append(still);
          $(still).on("click", function (event) {
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
          $(".giphy-holder").prepend(gridItem);
        } // For Loops Ends

        $('.grid').masonry({
          // options
          itemSelector: '.grid-item',
          columnWidth: 200,
          gutter: 10
        });
      });
  });
  function addButton(buttonName) {
    let buttonHolder = $("<button>");
    buttonHolder.text(buttonName);
    buttonHolder.attr("class", "standard");
    $(".button-holder").append(buttonHolder);
  }
});
