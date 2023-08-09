$(document).ready(function () {
    var flag4 = 0;

    $('#phone').keyup(function () {
        var phone = $('#phone').val();
        var PhoneRegex = /((^(\+)(\d){12}$)|(^\d{11}$))/

        if(PhoneRegex.test(phone)) {
            $('#phone').css('background-color', '#E3E3E3');
            $('#wrong_Phonenumber').css("display", "none");
            flag4 = 1;
            enableSubmitButton();
        }
        else {
            $('#phone').css('background-color', 'red');
            $('#wrong_Phonenumber').css("display", "block");
            $("#submit").prop("disabled", true);
            flag4 = 0;
        }
    });

    function enableSubmitButton() {
        if (flag1 === 1 && flag2 === 1 && flag3 ===1 && flag4 ===1 ) {
            $("#submit").prop("disabled", false);
        } else {
            $("#submit").prop("disabled", true);
        }
    }
});


function validateForm(form){
    var username = $('.username').val();
    var firstName = $('.fname').val();
    var lastName = $('.lname').val();
    var phone = $('.phone').val();

    if (username != "" && firstName != "" && lastName != "" && phone != ""){
        $('.username').css('background-color', 'white');
        $('.firstName').css('background-color', 'white');
        $('.lastName').css('background-color', 'white');
        $('.phone').css('background-color', 'white');
        return true;
    }
    else {
        if (username == "") {
            $('.username').css('background-color', 'red');
        }

        if (firstName == "") {
            $('.firstName').css('background-color', 'red');
        }

        if (lname == "") {
            $('.lastName').css('background-color', 'red');
        }
        if(phone =""){
            $('.phone').css('background-color', 'red');
        }

        return false;
    }
}

$('#file').on("change", function () {
    fileValidation();
})

function fileValidation(){
    var fileInput = document.getElementById('file');
    var filePath = fileInput.value;
    var allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    if(!allowedExtensions.exec(filePath)){
        alert('Please upload file having extensions .jpeg/.jpg/.png only.');
        fileInput.value = '';
        return false;
    }else{
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('imagePreview').innerHTML = '<img src="'+e.target.result+'"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);
        }
    }
}

function changeImage() {
    var username = $('#hiddenUsername').val();
    $.get('/getProfileAvatar/'+username, {username: username}, function (result) {
        document.getElementById("dp").src = result.avatar;
    })
}