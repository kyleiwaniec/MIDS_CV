(function() {
  /**
   * Video element
   * @type {HTMLElement}
   */
  var video = document.getElementById("my-video");

  /**
   * Check if video can play, and play it
   */
   if(video){
      video.addEventListener( "canplay", function() {
        video.play();
      });
   }
  

})();


$(function(){

    $(".nav li a, .navbar-brand, .icu-btn").on("click", function (){
        var id = $(this).attr("href");
        if(id !== "#"){
          $('html, body').animate({
            scrollTop: $(id).offset().top - 55
          }, 500, "swing", function() {
              console.log("completed")
          });
        }
        
    });

    setTimeout(function () {
          MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }, 1);

});