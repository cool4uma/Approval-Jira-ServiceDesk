/*! Custom mandatory comment when approve/decline request for Jira Service Desk | (c) Malik cool4uma 2023 */

	$(document).delegate("#cBtnA", "click", function(){
	modalWin.style.display = 'block';
        console.log('clicked');
	$('#cfApprove').prop("disabled", true);
        $('#cfDecline').prop("disabled", true);
        $('#cBtnA').prop("disabled", true);
        $('#cBtnD').prop("disabled", true);
	$('#cfDecline').css('margin-left', '10px');
	$('#cfApprove').show();
        $('#cfDecline').hide();
    });

$(document).delegate("#cBtnD", "click", function(){
	modalWin.style.display = 'block';
	console.log('clicked');
	$('#cfApprove').prop("disabled", true);
        $('#cfDecline').prop("disabled", true);
        $('#cBtnA').prop("disabled", true);
        $('#cBtnD').prop("disabled", true);
	$('#cfApprove').hide();
	$('#cfDecline').show();
	$('#cfDecline').css('margin-left', '0px');
});

document.addEventListener("DOMContentLoaded", () => {
    //$(document).find("#portal-approval-action-web-panel-root").hide();
    //$(document).find('.js-approve-approval').hide();
    //$(document).find('.js-decline-approval').hide();
});



var delayWinLoad = 1400; //1000=1 second
var delayContentLoad = 1600;
var delayContentLoadFirst = 200;

setTimeout(function() {
	$(document).find('.js-approve-approval').hide();
	$(document).find('.js-decline-approval').hide();
	$(document).find("#portal-approval-action-web-panel-root").show();
	$(document).find(".cv-web-panel").append("<button id='cBtnA' class='aui-button aui-button-primary'>Approve</button><button id='cBtnD' class='aui-button'>Decline</button>");
}, delayWinLoad);


window.onload = function() {
	$(document).find("#portal-approval-action-web-panel-root").hide();
};

content.onclick = function() {
  if (!$(event.target).closest(".modalWin,.aui-button").length && $('#cBtnA').text() == "") {
	setTimeout(function() {
        $(document).find("#portal-approval-action-web-panel-root").hide();
    }, delayContentLoadFirst);
  }
	setTimeout(function() {
	$(document).find('.js-approve-approval').hide();
	$(document).find('.js-decline-approval').hide();
	if ($('#cBtnA').text() == "" || $('#cBtnD').text() == "") {
		$(document).find("#portal-approval-action-web-panel-root").show();
		$(document).find(".cv-web-panel").append("<button id='cBtnA' class='aui-button aui-button-primary'>Approve</button><button id='cBtnD' class='aui-button'>Decline</button>");
	}
    }, delayContentLoad);
}

function send_comment(commentbody) {
	var issuekey = $(".js-breadcrumb-no-history").text();
	let xhrcmt = new XMLHttpRequest();
	xhrcmt.open("POST", `https://jira.tekton.online/rest/api/2/issue/${issuekey}/comment`);
	xhrcmt.setRequestHeader("Content-type", "application/json");
	xhrcmt.send(commentbody);
}

function CheckSpaces_check(str) {
  return str.trim() !== '';
}

let div = document.createElement('div');
  div.className = "modalWin";
  div.id = "modalWin";
  div.style.display = "none";
  div.style.position = "fixed";
  div.style.top = "0px";
  div.style.left = "0px";
  div.style.bottom = "0px";
  div.style.right = "0px";
  div.style.margin = "auto";
  div.style.width = "350px";
  div.style.height = "190px";
  div.style.fontFamily = "verdana";
  div.style.fontSize = "13px";
  div.style.padding = "10px";
  div.style.backgroundColor = "rgb(240, 240, 240)";
  div.style.border = "2px solid Silver";
  div.style.borderRadius = "5px";
  div.style.zIndex = "999999999999999999";
  div.innerHTML = "<div class='modal-content'><p><big><b>Comment</b></big><Br><textarea placeholder = 'Leave a required comment' class='textarea full-width-field' name='comment' id='commentinput' cols='40' rows='7' required></textarea></p><br><button id='cfApprove' class='aui-button aui-button-primary'>Approve</button><button id='cfDecline' class='aui-button'>Decline</button></div>";

  document.body.append(div);


cfApprove.onclick = function () {
	modalWin.style.display = 'none';
	if (document.getElementById("commentinput").value != "") {
		let commentbody = `{
			"body": "${document.getElementById('commentinput').value}",
			"properties": [ 
			  { 
			    "key": "sd.public.comment", 
			    "value": { 
			      "public": true 
		      } 
		    } 
		  ] 
		}`;
		console.log(commentbody);
		send_comment(commentbody);
		$('.js-approve-approval').trigger('click');
        } 
	document.getElementById("commentinput").value = "";
	console.log(document.getElementById("commentinput").value);
	
};

cfDecline.onclick = function () {
        modalWin.style.display = 'none';
        if (document.getElementById("commentinput").value != "") {
		let commentbody = `{
                        "body": "${document.getElementById('commentinput').value}",
                        "properties": [
                          {
                            "key": "sd.public.comment",
                            "value": {
                              "public": true
                      }
                    }
                  ]
                }`;
		console.log(commentbody);
                send_comment(commentbody);
		$('.js-decline-approval').trigger('click');
        }
	document.getElementById("commentinput").value = "";
        console.log(document.getElementById("commentinput").value);
  	
};

document.querySelector('textarea').addEventListener('input', function (event) {
	if (document.getElementById("commentinput").value != "" && CheckSpaces_check(document.getElementById("commentinput").value) != false) {
		$('#cfApprove').prop("disabled", false);
		$('#cfDecline').prop("disabled", false);
		//$('#cBtnA').prop("disabled", false);
                //$('#cBtnD').prop("disabled", false);
	} else {
		$('#cfApprove').prop("disabled", true);
                $('#cfDecline').prop("disabled", true);
		$('#cBtnA').prop("disabled", true);
                $('#cBtnD').prop("disabled", true);
	}
});

$(document).on('keyup', function(e) {
	if ( e.key == "Escape" ) {
		document.getElementById('cBtnA').disabled = false; 
                document.getElementById('cBtnD').disabled = false;
		document.getElementById("commentinput").value = "";
		modalWin.style.display = 'none';
	}
});

$(document).click(function(event) {
	if (!$(event.target).closest(".modalWin,.aui-button").length) {
		document.getElementById('cBtnA').disabled = false;
		document.getElementById('cBtnD').disabled = false;
		document.getElementById("commentinput").value = "";
		modalWin.style.display = 'none';
	}
});
