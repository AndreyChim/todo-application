// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// Fix for Rails UJS - try both approaches
try {
    require("@rails/ujs").start();
  } catch (e) {
    console.log("Rails UJS not available or already loaded");
  }
  
  // Fix for Turbolinks
  try {
    const Turbolinks = require("turbolinks");
    Turbolinks.start();
  } catch (e) {
    console.log("Turbolinks not available or already loaded");
  }
  
  // Fix for ActiveStorage
  try {
    require("@rails/activestorage").start();
  } catch (e) {
    console.log("ActiveStorage not available or already loaded");
  }
  
  // Channels
  require("../channels");
  
  // Uncomment to copy all static images under ../images to the output folder and reference
  // them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
  // or the `imagePath` JavaScript helper below.
  //
  // const images = require.context('../images', true)
  // const imagePath = (name) => images(name, true)
  
  require("./components/TodoApp");
  require("bootstrap");
  import "bootstrap/dist/css/bootstrap.css";