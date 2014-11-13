/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict";

document.addEventListener('DOMContentLoaded', function() {
    var signup = document.getElementById('signup');
    var state = signup.elements['state'];
    var idx;
    var option;

    for (idx = 0; idx < usStates.length; ++idx) {
        option = document.createElement('option');
        option.innerHTML = usStates[idx].name;
        option.value = usStates[idx].code;
        state.appendChild(option);
    }

    var occupation = document.getElementById('occupation');
    occupation.addEventListener('change', function() {
        var value = occupation.value;
        if (value == 'other') {
            signup.elements['occupationOther'].style.display = 'block';
        } else {
            signup.elements['occupationOther'].style.display = 'none';
        }
    });

    var noButton = document.getElementById('cancelButton');
    noButton.addEventListener('click', function() {
        if (window.confirm("Are you sure you would like to leave this page?")) {
            window.location = 'http://google.com';
        }
    });

    signup.addEventListener('submit', function() {

    });
});