// dependencies: jquery
// usage: $(".slider").snapslider()

(function($) {
  jQuery.fn.snapslider = function(o) {
        var that = this;
        // Define default settings.
        var options = {};
        o = o || {};
        o = $.extend(options, o);

        // .each so we can have multiple sliders:
        return that.each(function(){
        var sliderInterval;  
        var slider = $(this);
        var winHeight = $(window).height();
        var sliderInterval;
        var offset = 0;
        var next = slider.next();
        var prev = slider.prev();
        var cell;
        var numberOfCells;
        var cellWidth;
        var sliderTotalWidth;
        var sliderContainerWidth;
        var maxOffset;
        var currLeft = 0;
        var ratio = 256; // so the speed is always the same regardless of number of items
        var duration = (sliderTotalWidth-currLeft)/ratio;
        slider.addClass("snap-slider");


        // this.awesome = (Modernizr.csstransforms3d || !! window.chrome) ? true : false;
        

        that.init = function () {
          cell = slider.children(".cell");
          numberOfCells = cell.length;
          cellWidth = cell.outerWidth(true);
          sliderTotalWidth = numberOfCells * (cellWidth + 30);
          sliderContainerWidth = slider.parent().width();
          maxOffset = sliderTotalWidth - sliderContainerWidth;
          slider.width(sliderTotalWidth);
          slider.css({"left": 0, "transition": "none", "transform":"translate3d(0,0,0)"});

          if(sliderTotalWidth > sliderContainerWidth){
             slider.next(".slider-arr-next").show();
             slider.prev(".slider-arr-prev").show();
           }else{
             slider.next(".slider-arr-next").hide();
             slider.prev(".slider-arr-prev").hide();
           }

        };


        $(window).resize( function(){          
          that.init();
        });

        that.init();
        var awesome = true;

        next.off('mouseenter mouseleave').on({
          mouseenter : function(e){
                      if(awesome){ 
                        currLeft = slider.position().left;
                        duration = (maxOffset+currLeft)/ratio;
                        slider.css({"transition": "all "+duration+"s linear", "transform":"translate3d("+(-maxOffset)+"px,0,0)"});
                        currLeft = slider.position().left;

                      }else{
                        console.log("not awesome")
                        sliderInterval = setInterval(function(){
                        offset -= 8;
                        if(Math.abs(offset) <= maxOffset){
                           slider.css({"left": +offset+"px"});
                        }else{
                           clearInterval(sliderInterval);
                        }
                      },50);
                    }
           },
          mouseleave : function(e){
                    if(awesome){
                      currLeft = slider.position().left;
                      slider.css({"transform":"translate3d("+currLeft+"px,0,0)"});
                      currLeft = slider.position().left;
                    }else{
                      clearInterval(sliderInterval);
                    }
                      
          }
       });
       prev.off('mouseenter mouseleave').on({
          mouseenter : function(){
                    if(awesome){
                      currLeft = slider.position().left;
                      duration = (-currLeft)/ratio;
                      slider.css({"transition": "all "+duration+"s linear", "transform":"translate3d(0px,0,0)"});
                      currLeft = slider.position().left;
                     
                    }else{
                      sliderInterval = setInterval(function(){
                        offset += 8;
                        if(offset <= 0){
                          slider.css({"left": +offset+"px"});
                        }else{
                          clearInterval(sliderInterval);
                        }
                      },50);
                    }
          },
          mouseleave : function(){
                    if(awesome){
                      currLeft = slider.position().left;
                      slider.css({"transform":"translate3d("+currLeft+"px,0,0)"});
                      currLeft = slider.position().left;
                    }else{
                      clearInterval(sliderInterval);
                    }
          }
       });

      that.off('mouseenter mouseleave').on({})


    });

};

})(jQuery);
