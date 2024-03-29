$(function(){

      var slider = $(".slider").snapslider();
      slider.init();


      $(".showhide, .description .tab-pane").on("click",function(){
        if($(".showhide").text() == "show more"){
          $(".tab-content").css({'height':'auto'})
          $(".showhide").text("show less")
        }else{
          $(".tab-content").css({'height':'90px','overflow':'hidden'})
          $(".showhide").text("show more")
        }
        
      })

      $(".discharge-list li").on("click",function(e){
        $(".discharge-list li").removeClass("active");
        $(this).addClass("active")
      });




     $("#patients").on("click","a", function(e){
        e.preventDefault();
        var p = $(this).attr("href")
        currPatient = p;
        getNotes(p);
        makePlotHeader(p);
        makeDonuts(patients[p]);
        
        makeplot(patients[p].features[0], p, patients[p].charts[0]);
        renderSidebar(patients[p])

        //$(".donut").html("<div class='readmit-prob'>"+(patients[p].probalities["HOME"][0] * 100).toFixed(1)+"%</div>");

      })

     $(".slider").on("click",".cell",function(e){
        $(".slider .cell").removeClass("active");
        $(this).addClass("active")
        var idx = $(this).index();

        makeplot(patients[currPatient].features[idx],currPatient,patients[currPatient].charts[idx]);

    })

    function getNotes(patient){
      $("#name").text(patients[patient].name);
      $.ajax({
        url: patients[patient].admission_notes,
        context: document.body,
        dataType: "html"
      }).done(function (response) {
        $("#admission_notes").html(response)
      });
      $.ajax({
        url: patients[patient].discharge_notes,
        context: document.body,
        dataType: "html"
      }).done(function (response) {
        $("#discharge_notes").html(response)
      });
    }
    
    function renderSidebar(patient){
      var fragment = "";
      for(key in patient.stats){
        fragment += "<li><strong>"+key+" </strong><span>"+patient.stats[key]+"</span></li>"
      }
      fragment += '<p class="footnote"><span class="warning">*</span> measure was not recorded - see patient notes to confirm</p>';
      $("#patient_stats").html(fragment); 
      $("body").find(".warning").parents("li").css({"background":"#f8ffde"})

    }

    

    function makePlotHeader(patient){
      var fragment = "";
      for(var i=0; i < patients[patient].features.length; i++){

        var feature = patients[patient].features[i];

        if(feature.files.length > 1){
          var label = featureDict.arrays[feature.files[0]];
        }else{
          var label = featureDict[feature.files[0]];
        }
        

        fragment += '<div class="cell"><span>'+label+'</span></div>';
      }

      $(".slider").html(fragment);
      $(".slider").children(".cell").first().addClass("active");

      slider.init();
    }
    // INIT CURRENT PATIENT
    makePlotHeader(currPatient)
    makeDonuts(patients[currPatient]);
    makeplot(patients[currPatient].features[0],currPatient,patients[currPatient].charts[0]);
    getNotes(currPatient);
    renderSidebar(patients[currPatient]);

    //$(".donut").html("<div class='readmit-prob'>"+(patients[currPatient].probalities["HOME"][0] * 100).toFixed(1)+"%</div>");


});
