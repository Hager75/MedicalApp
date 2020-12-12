$(function() {


    $('#inputDate').datepicker();
    $("input[type='radio']").prop('indeterminate', true);
    // =====================hidden elements======================
    $("#head").hide();
    $("#shoulder").hide();
    $("#neck").hide();
    // ======================= disable buttons======================
    $("#btn").attr("disabled", true);
    $("#btn-confirm").attr("disabled", true);
    $("#btn-continue").attr("disabled", true);

    // ======================form validation for both resgister and login==================
    $.validator.addMethod('strongPassword', function(value, element) {
        return this.optional(element) ||
            value.length >= 6 &&
            /\d/.test(value) &&
            /[a-z]/i.test(value);
    }, 'Your password must be at least 6 characters long and contain at least one number and one character\'.')
    $("#basic-form").validate({
        rules: {
            username: {
                required: true,
                minlength: 5,

            },
            password: {
                required: true,
                strongPassword: true
            },
            conirmpassword: {
                required: true,
                equalTo: "#inputPassword1"


            },
            date: {
                required: true,
                date: true
            }
        },
        messages: {
            username: {
                required: 'please enter your name'
            },
            password: {
                required: 'please enter a password'

            }
        }

    });
    // ============================================================================================
    // =============================== form submition register=============================================
    $("#basic-form").submit(function(event) {
        let username = $('#userName').val();
        let password = $('#inputPassword1').val();
        let passwordTwo = $('#inputPassword2').val();
        let date = $('#inputDate').val();
        if (username !== '' && password !== '' && date !== '' && passwordTwo === password) {
            // confirm(username + "you resigstered successfully");
            localStorage.username = username;

        }

    });
    // =============================================================================================
    // ==========================remeber me saving data in the localStorage=========================
    $('#btn-login').click(function() {
        let username = $('#userName').val();
        let password = $('#inputPassword1').val();
        if ($('#checkBox').is(':checked') && username != '' && password != '') {
            localStorage.username = username;
            localStorage.password = password;
        } else if (username != '') {
            localStorage.username = username;
        } else {
            localStorage.username = '';
            localStorage.password = '';
        }
    });
    // =============================================================================================

    $("#pain-img").click(function() {
        $('#pain-img').hide().show("slide", { direction: "left" }, 1000);
    });
    // ===============================side bar Animation===========================================
    $('#sidebar').hide().show("slide", { direction: "left" }, 1000);
    $('.circle,#first-circle').hide().show("slide", { direction: "left" }, 1500);




    // ==============================function Animation for the graph======================
    $('.bars li .bar').each(function(key, bar) {
        var percentage = $(this).data('percentage');
        $(this).animate({
            'height': percentage + '%'
        }, 3000);
    });
    $('.numbers').hide().slideDown(2000);
    $('.bars span').hide().show("slide", { direction: "left" }, 2000);
    $('.bars').hide().show("slide", { direction: "left" }, 1000);

    // ===================== function to show elements according to user's click in page step3 =======================
    $('.img-fluid.human-img').click(function(e) { //Default mouse Position 

        let posX = $(this).offset().left,
            posY = $(this).offset().top;

        let positionX = e.pageX - posX;
        let positionY = e.pageY - posY;
        // alert((e.pageX - posX) + ' , ' + (e.pageY - posY));
        $("#neck").attr("hidden", true);
        $("#head").attr("hidden", true);
        $("#shoulder").attr("hidden", true);
        if (positionY >= 1 && positionY <= 57) {
            $("#head").attr("hidden", false).show("drop", 1000);
        } else if (positionY >= 56 && positionY <= 85) {
            $("#neck").attr("hidden", false).show("drop", 1000);

        } else if (positionY >= 80 && positionY <= 120 && positionX >= 70 && positionX <= 130) {
            $("#shoulder").attr("hidden", false).show("drop", 1000);

        } else if (positionY >= 80 && positionY <= 120 && positionX >= 172 && positionX <= 233) {
            $("#shoulder").attr("hidden", false).show("drop", 1000);

        } else {
            alert('you have to click on the Head, Neck or Shoulders')
        }

    });


});

// ======================= function to move check radio buttons from position to another ===========================
$('#decrease').click(function() {
    let arrayRadio = $("input[name='customRadio']");
    if (arrayRadio.checked = true) {
        for (let i = 0; i < arrayRadio.length; i++) {
            if (arrayRadio[i].checked && arrayRadio[i].value != 0) {
                arrayRadio[i].checked = false;
                arrayRadio[i - 1].checked = true;
            }

        }

    }
});

$('#increase').click(function() {
    let arrayRadio = $("input[name='customRadio']");
    let flag = 0;
    if (arrayRadio.checked = true) {
        for (let i = 0; i < arrayRadio.length; i++) {
            if (arrayRadio[i].checked && arrayRadio[i].value != 10 && flag == 0) {
                arrayRadio[i].checked = false;
                arrayRadio[i + 1].checked = true;
                flag = 1;
            }

        }

    }
});

// ======================= function to enable continue button step2 page ====================
$('input[name="customRadio"]').change(function() {
    let arrayRadio = $("input[name='customRadio']");
    let days = $('#input-day');
    if (arrayRadio.is(':checked') && days.val() !== '') {
        $("#btn").attr("disabled", false);

    }
});

// ======================= function to enable continue button step1 page ====================

$('input[name="customRadio"]').change(function() {
    let arrayRadio = $("input[name='customRadio']");
    if (arrayRadio.is(':checked')) {
        $("#btn-continue").attr("disabled", false);
    }
});


// ======================= function to enable continue button step3 page ====================

$('input[name="Radio"]').change(function() {
    let arrayRadio = $("input[name='Radio']");
    if (arrayRadio.is(':checked')) {
        $("#btn-confirm").attr("disabled", false);

    }
});

// ======================= redirect to final-step page ====================

$('#ok').click(function() {
    window.location.href = 'final-step.html'

});



// ==============form submition in page step1 & store data in localstorge=============================================
$("#pain-form").submit(function(event) {
    // event.preventDefault();
    let painRate = $('input[name="customRadio"]:checked').val();
    let option = $('option').val();
    let description = $('textarea').val();
    localStorage.painRate = painRate;
    localStorage.option = option;
    console.log(`${painRate}`);
    if (description !== '') {
        localStorage.description = description;
    }

});
// =============================================================================================


// =============================== form submition in page step2 =============================================
$("#form-step2").submit(function(event) {
    // event.preventDefault();
    let choice = $('input[name="customRadio"]:checked').val();
    let numOfDays = $('#input-day').val();
    localStorage.choice = choice;
    localStorage.numOfDays = numOfDays;
    console.log(`${choice}`);


});


// =============================== form submition in page step3 =============================================
$("#form-step3").submit(function(event) {
    // event.preventDefault();
    let painDescription = $('input[name="Radio"]:checked').val();
    localStorage.painDescription = painDescription;
    console.log(`${painDescription}`);


});

//=============== date retrive from localstorge and show by animation in the last page================ 
if (localStorage !== '') {
    let username = localStorage.username;
    let painRate = localStorage.painRate;
    let option = localStorage.option;
    let choice = localStorage.choice;
    let numOfDays = localStorage.numOfDays;
    let painDescription = localStorage.painDescription;
    let description = localStorage.description;
    if (description == undefined) {
        description = "you didn't put a description."
    }

    $('#table').append(
        'your name is : ' + username, '<br>',
        'your pain burden is  = ' + numOfDays, '<br>',
        'your pain rate is = ' + painRate, '<br>',
        'your pain frequency is : ' + option, '<br>',
        'your answer about taking any medicien is : ' + choice, '<br>',
        'your have a ' + painDescription, '<br>',
        'your description : ' + description,

    ).hide();

    $('#table').show('clip', 1000);
}
// ===================== back button in the last page =====================
$('#back').click(function(e) {
    e.preventDefault();
    console.log('helooo0o')
    window.history.back();
});