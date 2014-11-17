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
    } //populate states list

    var occupation = document.getElementById('occupation');
    occupation.addEventListener('change', function() {
        var value = occupation.value;
        if (value == 'other') {
            signup.elements['occupationOther'].style.display = 'block';
        } else {
            signup.elements['occupationOther'].style.display = 'none';
        }
    }); //show occupationOther field

    var noButton = document.getElementById('cancelButton');
    noButton.addEventListener('click', function() {
        if (window.confirm("Are you sure you would like to leave this page?")) {
            window.location = 'http://google.com';
        }
    }); //confirm leaving page

    signup.addEventListener('submit', onSubmit);
});

function onSubmit(evt) {
    try {
        var valid = validateForm(this);
    } catch(e) {
        valid = false;
    }

    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var idx;
    var formValid = true;

    if(document.getElementById('signup').elements['occupationOther'].style.display == 'block') {
        requiredFields.push('occupationOther');
    }

    for (idx = 0; idx < requiredFields.length; ++idx) {
        formValid &= validateRequiredFields(form.elements[requiredFields[idx]]);
    }

    return formValid;
}

function validateRequiredFields(field) {
    var valid = false;

    if (field.name == 'zip') {
        var zipRegExp = new RegExp('^\\d{5}$');
        valid = zipRegExp.test(field.value);
    }
    else if (field.name == 'birthdate') {
        var value = field.value.trim();
        if (value.length > 0) {
            var birthdateMessage = document.getElementById('birthdateMessage');

            var today = new Date();
            var dob = new Date(field.value);
            var yearsDiff = today.getFullYear() - dob.getUTCFullYear();
            var monthsDiff = today.getMonth() - dob.getUTCMonth();
            var daysDiff = today.getDate() - dob.getUTCDate();
            if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
                yearsDiff--;
            }
            valid = yearsDiff >= 13;

            if (!valid) {
                birthdateMessage.innerHTML = 'You must be 13 years or older to sign up.';
            } else {
                birthdateMessage.innerHTML = '';
            }
        }
    }
    else {
        var value = field.value.trim();
        valid = value.length > 0;
    }

    if(valid) {
        field.className = 'form-control';
    } else {
        field.className = 'form-control invalid';
    }

    return valid;
};