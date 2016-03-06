var trex = {};
trex.speak = function(line) {
  alert("The trex says '" + line + "'");
};
var urlpic;
var profileid = "0";
var txtfbprof;
function CreateCard() {
           
var card = "";
//Retrieve Picture from facebook

var txtName = $("#name").val();
var txtBio = $("#bio").val();
txtfbprof = $("#fbprof").val();

var profile_picture = '//graph.facebook.com/' + txtfbprof + '/picture';
 profile_picture = 'http://graph.facebook.com/' + txtfbprof + '/picture';

GetProfilePicture(txtfbprof);

//card += '<div class="col-md-4"  style="background-color:white; margin:12px; padding:12px;"><img id="' + txtfbprof + '" class="img-circle" src="' + profile_picture + '">'; 
card += '<div class="col-md-4"  style="background-color:white; margin:12px; padding:12px;"><img id="' + txtfbprof + '" class="img-circle" src="https://lh6.googleusercontent.com/-86IbGEiuwG0/VUzJXnntd9I/AAAAAAAAEK4/T_ZDLbo0PYE/s553-no/avatar.jpg">'; 
card += '<span class="spanbold">' + txtName + '</span>';
card += '<p style="background-color:red; opacity:0.8;">' + txtBio + '</p>';
card += '</div>';

			
			$("#profilecards").append(card);
			
if (sessionStorage)
{ 
    sessionStorage.setItem("dudaprofilename", txtName);
	sessionStorage.setItem("dudaprofilebio", txtBio);
}



			
}



var url = "http://duda-api-test.herokuapp.com/profiles";
var urldata;

$('#selProfiles')
    .find('option')
    .remove()
    .end()
    .append('<option value="0">Select Profile</option>')
    .val('whatever')
;

function GetProfiles()
{
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
		
			PopulateProfiles(myArr);
    }
}

xmlhttp.open("GET", url, true);
xmlhttp.send();
}

function GetProfilesData()
{
var xmlhttp2 = new XMLHttpRequest();

xmlhttp2.onreadystatechange = function() {
    if (xmlhttp2.readyState == 4 && xmlhttp2.status == 200) {


        var myArr = JSON.parse(xmlhttp2.responseText);
		PopulateBio(myArr);
    }
}

xmlhttp2.open("GET", urldata, true);
xmlhttp2.send();


}


var STATUS = {
  REDIRECT: 280
};




function GetProfilePicture(txtfbprof)
{

//http://graph.facebook.com/bill.gates/picture?redirect=false
urlpic = 'http://graph.facebook.com/' + txtfbprof + '/picture';
//urlpic = 'http://graph.facebook.com/' + txtfbprof + '/picture?redirect=false';
var xmlhttp3 = new XMLHttpRequest();

xmlhttp3.onreadystatechange = function() {

    if (xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
			var encoded = btoa(unescape(encodeURIComponent(xmlhttp3.responseText)));
			//encoded = fixBinary(encoded);
            var dataURL="data:image/gif;base64,"+encoded;

			//document.getElementById(txtfbprof).src = dataURL;

		//UpdateImage(imageUrl);
		//UpdateImage(picArr.data.url, );
    }
}

xmlhttp3.open("GET", urlpic, true);
xmlhttp3.send();


}

function fixBinary (bin) {
    var length = bin.length;
    var buf = new ArrayBuffer(length);
    var arr = new Uint8Array(buf);
    for (var i = 0; i < length; i++) {
      arr[i] = bin.charCodeAt(i);
    }
    return buf;
  }
  
function UpdateImage(src)
{

$('#' + txtfbprof).setAttribute('src', src);

}

function PopulateProfiles(arr)
{
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {

        //out += '<option value="' + arr[i].id + '">' + 
        //arr[i].full + '</option><br>';
		//alert(out); //out not needed, using another technique below
		
		$('#selProfiles').append($('<option>', {
			value: arr[i].id,
			text: arr[i].full
		}));
    }
	
	//$("#selProfiles").append(out);

}


function PopulateBio(arr)
{


$("#name").val(arr.full);
$("#bio").val(arr.bio);


}


$('#selProfiles').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
});


function GetSessionStorage()
{

// retrieve in another page or on a refresh
var cardname = null;
var cardbio = null
if (sessionStorage)
{
    cardname = sessionStorage.getItem("dudaprofilename");
	cardbio = sessionStorage.getItem("dudaprofilebio");
}

if(cardname && cardbio)
{
var fullcard = "";
fullcard += '<div class="col-md-4"  style="background-color:white; margin:12px; padding:12px;"><img class="img-circle" src="https://lh6.googleusercontent.com/-86IbGEiuwG0/VUzJXnntd9I/AAAAAAAAEK4/T_ZDLbo0PYE/s553-no/avatar.jpg">'; 
fullcard += '<span class="spanbold">' + cardname + '</span>';
fullcard += '<p style="background-color:red; opacity:0.8;">' + cardbio + '</p>';
fullcard += '</div>';

			
			$("#profilecards").append(fullcard);
}
}





