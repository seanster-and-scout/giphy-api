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

  //Grabbing the grid class
  const $grid = $('.grid');
  //Initializing masonry, we need to initialize masonry
  //before the images are added.
  $grid.masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200,
    gutter: 10
  });

  //Each time we are clicking calling the fetch gifs
  const fetchGifs = (event, searchTerm) => {
    event.preventDefault();
    //if searchTerm is called in parameter shouldAddButton is false
    //Which means that it was called by button, only buttons do calls with
    //search terms
    const shouldAddButton = searchTerm ? false : true;
    //No search term is available (from the searchTerm parameter) so we are checking
    //what is in the input box. This is called a fallback
    searchTerm = searchTerm || $(".search")
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
        let gridItems = [];


        shouldAddButton && addButton(searchTerm);
        for (let i = 0; i < response.data.length; i++) {
          let gridItem = $("<div>").attr("class", "grid-item");
          let image = $("<img>");
          let still = image
            .attr("src", response.data[i].images.downsized_still.url)
            .attr("alt", "false")
            .attr("id", `${response.data[i].id}`);
          //each time one image loads then we can call the layout method
          //in the masonry library which compilates the sizes of the images
          image.on('load', () => {
            $grid.masonry('layout');
          })
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
          //First index in jquery object which is the DOM element
          gridItems.push(gridItem.get(0));

        } // For Loops Ends
        //Masonry append to the current grid
        $grid.append($(gridItems)).masonry('appended', $(gridItems));
      });
  };

  function addButton(buttonName) {
    let buttonHolder = $("<button>");
    buttonHolder.text(buttonName);
    buttonHolder.attr("class", "standard");
    $(".button-holder").append(buttonHolder);
    buttonHolder.click(event => fetchGifs(event, buttonName));
  }

  $(".submit").on("click", fetchGifs);
});

/*
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
*/