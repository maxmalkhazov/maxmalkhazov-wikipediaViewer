window.onload = function() {
 $(".userInput").focus();
};

var userInput;

$("#btn-main").on("click", function() {
	userInput = $(".userInput").val();
	if (userInput !== "") {
		$("#ui-id-1").hide();
		activate();
	    init();
	} else {
		alert("Please enter valid text");
	}
});

$(".userInput").on("keypress", function(e) {
	if (e.which === 13) {
		userInput = $(".userInput").val();
		if (userInput !== "") {
			$("#ui-id-1").hide();
			activate();
		    init();
		} else {
			alert("Please enter valid text");
		}
	}
});


function activate() {
	$.ajax({
		type: "GET",
		dataType: 'jsonp',
		url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + userInput + "",
		success: function(data) {
			console.log(data);
			
			$("body").addClass("body--active");
			$(".input").removeClass("input--active");
			$(".main__headline").css("display", "none");
			$(".results__output-field").removeClass("results__output-field--active");
			for (var i = 0; i < data[1].length; i++) {
			    $(".results__output-field").append(
			    	"<div>" + "<h4>" + data[1][i] + "</h4>" +
			    	"<p>" + data[2][i] + "</p>" +
			    	"<p>" + "<a href=" + data[3][i] + " class='dis-link' target='_blank'> More...</a>" + "</p>" + "</div>");
			}
		}
	});
}

$("#autocomplete").autocomplete({
  source: function(request, response) {
    $.ajax({
      url: "https://en.wikipedia.org/w/api.php",
      dataType: "jsonp",
      data: {
        action: "opensearch",
        format: "json",
        search: request.term
      },
      success: function(data) {
        response(data[1]);
      }
    });
  }
});

function init() {
	$(".userInput").val("");
	$(".results__output-field").empty();
	$(".results__output-field").addClass("results__output-field--active");
}
