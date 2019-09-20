$(document).ready(function () {
  var newlead_obj = { newlead_arr: [] };
  var convert_obj = { convert_arr: [] };
  var all_obj = { all_arr: [] };
  var newCardId = 1, convertCardId = 1;
  var prevConcardId = 0, prevNewcardId = 0;


  $.ajax({
    type: "GET",
    url: "http://smartz360.com/lead?start_date=&end_date=&lastupdate_ts=2019-06-25T06:20:38.000Z&user_id=1",
    success: function (jsonData) {
      var data_details, newLeadCount = 0, convertCount = 0, contactCount = 0, followCount = 0, respondCount = 0, favCount = 0, allCount = 0;
      var objData = JSON.parse(JSON.stringify(jsonData));
      data_details = objData.data;

      // console.log(data_details);
      $(data_details).each(function (index) {
        var newleadObj = {}, convertObj = {}, allObj = {};
        var stage = data_details[index].stage;
        if (stage == "New") {
          newleadObj = data_details[index];
          newlead_obj.newlead_arr.push(newleadObj);
          newLeadCount++;
          newCard(index);
          allCount++;
        }
        else if (stage == "Contact") {
          contactCount++;
          allCount++;
        }
        else if (stage == "FollowUp") {
          followCount++;
          allCount++;
        }
        else if (stage == "Responded") {
          respondCount++;
          allCount++;
        }
        else if (stage == "Favourite") {
          favCount++;
          allCount++;
        }
        else if (stage == "Converted") {
          covertObj = data_details[index];
          convert_obj.convert_arr.push(covertObj);
          convertCount++;
          convertCard(index);

          allCount++;
        }
        allObj = data_details[index];
        all_obj.all_arr.push(allObj);
      });
      function newCard(index) {
        prevNewcardId = newCardId - 1;
        var getDataNew = newlead_obj.newlead_arr[newCardId - 1];
        if (newCardId <= newLeadCount) {
          // console.log(getDataNew)
          $('.newCardRow #card' + newCardId).html($('.newCardRow #card' + prevNewcardId).html()).find(".name").html(getDataNew.name);
          $('.newCardRow #card' + newCardId).find(".name").attr("data-id", index);
          $('.newCardRow #card' + newCardId).find(".mobile").html(getDataNew.mobile);
          $('.newCardRow #card' + newCardId).find(".email").html(getDataNew.email);
          $('.newCardRow').append("<div class=" + '"col-lg-4 col-md-6 col-sm-6 py-3"' + " " + "id=card"+ (newCardId + 1) + "></div>");
          newCardId++;
        }
      }
      function convertCard(index) {
        prevConcardId = convertCardId - 1;
        var getDataConvert = convert_obj.convert_arr[prevConcardId];
        // $(getDataConvert).each(function (index) {
        // console.log(getDataConvert.length);
        if (convertCardId <= convertCount) {
          // console.log(getDataConvert)
          $('.convertCardRow #card' + convertCardId).html($(".convertCardRow #card" + prevConcardId).html()).find(".name").html(getDataConvert.name);
          $('.convertCardRow #card' + convertCardId).find(".name").attr("data-id", index);
          $('.convertCardRow #card' + convertCardId).find(".mobile").html(getDataConvert.mobile);
          $('.convertCardRow #card' + convertCardId).find(".email").html(getDataConvert.email);
          $('.convertCardRow').append("<div class=" + '"col-lg-4 col-md-6 col-sm-6 py-3"' + " " +"id=card" +  (convertCardId + 1) + "></div>");
          convertCardId++;
        }
      }
      var allCardId = 1;
      var prevAllcardId = allCardId - 1;
      var getDataAll = all_obj.all_arr;
      $(getDataAll).each(function (index) {
        var stage = data_details[index].stage;
        // console.log(getDataAll.length);
        if (allCardId <= allCount) {
          // console.log(getDataConvert)
          if (stage == "New") {
            $('.allCardRow #card' + allCardId).html($(".allCardRow #card" + prevAllcardId).html()).find(".section-name").html("New Lead");
          }
          else {
            $('.allCardRow #card' + allCardId).html($(".allCardRow #card" + prevAllcardId).html()).find(".section-name").html("Converted");
          }
          $('.allCardRow #card' + allCardId).find(".name").html(getDataAll[index].name);
          $('.allCardRow #card' + allCardId).find(".mobile").html(getDataAll[index].mobile);
          $('.allCardRow #card' + allCardId).find(".email").html(getDataAll[index].email);
          $('.allCardRow').append("<div class=" + '"col-lg-4 col-md-6 col-sm-6 col-12 py-3"' + " " + "id=card" + (allCardId + 1) + "></div>");
          allCardId++;
        }
      });
      $(".counts-newlead strong").append(newLeadCount);
      $(".counts-contact").append(contactCount);
      $(".counts-follow").append(followCount);
      $(".counts-respond").append(respondCount);
      $(".counts-favourite").append(favCount);
      $(".counts-convert").append(convertCount);
      $(".counts-all").append(allCount);


      $(".candidate-name .name").click(function () {
        data_id = $(this).data("id");
        // console.log(data_id);
        getCadidateDetail();
      });
      function getCadidateDetail() {
        var json_data = $(data_details)[data_id];
        // console.log(json_data);
        $(".in-company-name").val(json_data.company_name);
        $(".in-name").val(json_data.name);
        $(".in-mobile").val(json_data.mobile);
        $(".in-tax-no").val(json_data.tax_no);
        $(".in-gst-no").val(json_data.gst_no);
        $(".in-salutation").val(json_data.salutation);
        $(".in-designation").val(json_data.designation);
        $(".in-email").val(json_data.email);
        $(".in-pan-no").val(json_data.pan_no);
        $(".in-revenue").val(json_data.revenue);

        $(".save-btn").click(function () {
          var get_name = $(".in-name").val();
          var get_mobile = $(".in-mobile").val();
          var get_email = $(".in-email").val();
          json_data.name = get_name;
          json_data.mobile = get_mobile;
          json_data.email = get_email;
          // newCard(data-id);
          $(this).parent().hide();
        });
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("page is not found");
    }
  });
  $(".expand").click(function () {
    $(this).animate({
      height: "4rem"
    }, 500);
  });
  $(".form-row").on('click', 'input', 'textarea', function () {
    var formRow = $(this).closest(".form-row");
    $(formRow).append($(".editable-btn").show());
  });

});

