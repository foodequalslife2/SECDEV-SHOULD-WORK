$(document).ready(function () {
    var count = 0;

    $('#password').keyup(function () {
        var username = $('#username').val();
        var password = $('#password').val();

        var query = {
            username: username,
            password: password
        }

        $.get('/getPassword', query, function (result) {
            if(result) {
                $('#submit').removeClass('disabled');   
            }
            else if (password == '') {
                $('#submit').addClass('disabled');   
            }
            else {
                $('#submit').addClass('disabled');
            }
        });
    });

    $('#submit').click(function(event){
        if ($('#submit').hasClass('disabled')) {
            var length = 1000 + (count * 1000);
            if (count >= 3) {
                $('#submit').css('color', 'grey');
                $('#submit').prop('disabled', true);
                setTimeout(function () {
                    $('#submit').prop('disabled', false);
                    $('#submit').css('color', 'white');
                }, length)
            }

            event.preventDefault();
            count++;
            $('#error').text('Account does not exist / Password not found, Attempts: ' + count);
        }
    });
});
