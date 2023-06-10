'use strict';

function checkForm()
{
    var errMsg = "";
    var result = true;
    //check if DOB is in the right format
    var DOB = document.getElementById("DOB").value;
    var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if(DOB != '' && !DOB.match(re)) {
        errMsg = errMsg + "Invalid date format. Please enter in 'dd/mm/yyyy' format.\n";
        result = false;
    }

    // change date format and convert user input value into date object
    var d = DOB.split("/");
	var birthDate = new Date(d[2] + '/' + d[1] + '/' + d[0]);
	
	// get the difference from current date;
	var difference=Date.now() - birthDate.getTime(); 
	var  ageDate = new Date(difference); 
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

    //check if age fit the requirements
    if (isNaN(age))
	{
		errMsg = errMsg + "Invalid date format. Please enter in 'dd/mm/yyyy' format.\n";
		result = false;
	}
	else if (age < 15)
	{
		errMsg = errMsg + "Your age must be 15 or older\n";
		result = false;
	}
	else if (age > 80)
	{
		errMsg = errMsg + "Your age must be 80 or younger\n";
		result = false;
	}

    //check if state and postcode match the requirements
    var state = document.getElementById("State").value;
    var postcode = document.getElementById("Postcode").value;
    var digit = postcode.toString()[0];
    if (state == "VIC") 
    {    
        if(!(digit == 3 || digit == 8))
        {
            errMsg = errMsg + "The first digit of the postcode should be 3 or 8 for this state.\n";
            result = false;
        }
    }
    else if (state == "NSW") 
    { 
        if (!(digit == 1 || digit == 2))
        {
            errMsg = errMsg + "The first digit of the postcode should be 1 or 2 for this state.\n";
            result = false;
        }
    }
    else if (state == "QLD") 
    {
        if (!(digit == 4 || digit == 9))
        {
            errMsg = errMsg + "The first digit of the postcode should be 4 or 9 for this state.\n";
            result = false;
        }
    }
    else if (state == "NT") 
    { 
        if (!(digit == 0))
        {
            errMsg = errMsg + "The first digit of the postcode should be 0 for this state.\n";
            result = false;
        }
    }
    else if (state == "WA")
    {   
        if (!(digit == 6))
        {
            errMsg = errMsg + "The first digit of the postcode should be 6 for this state.\n";
            result = false;
        }
    }
    else if (state == "SA") 
    {
        if (!(digit == 5))
        {
            errMsg = errMsg + "The first digit of the postcode should be 5 for this state.\n";
            result = false;
        }
    }
    else if (state == "TAS") 
    {
        if (!(digit == 7))
        {
            errMsg = errMsg + "The first digit of the postcode should be 7 for this state.\n";
            result = false;
        }
    }
    else if (state == "ACT") 
    {
        if (!(digit == 0))
        {
            errMsg = errMsg + "The first digit of the postcode should be 0 for this state.\n";
            result = false;
        }
    }

    //check if comment is empty when otherSkill is checked
    var otherSkill = document.getElementById("Skill5").checked;
    var comment = document.getElementById("Comment").value;

    if(otherSkill)
    {
        if(comment=="")
        {
            errMsg = errMsg + "Other skills text area cannot be blank\n";
            result = false;
        }
    }
    
    var error = document.getElementById("error");
    if (errMsg!="") 
    { 
        error.textContent = errMsg;
        error.style.color = "white";
        error.style.backgroundColor = "red";
	}
    
    //get values from form
    var firstname = document.getElementById("First_Name").value;
    var lastname = document.getElementById("Last_Name").value;
    var genderM = document.getElementById("gm");
    var genderF = document.getElementById("gf");
    var street = document.getElementById("Street_Address").value;
    var town = document.getElementById("Suburb/Town").value;
    var email = document.getElementById("Email").value;
    var phone = document.getElementById("phone").value;

    var skill1 = document.getElementById("Skill1");
    var skill2 = document.getElementById("Skill2");
    var skill3 = document.getElementById("Skill3");
    var skill4 = document.getElementById("Skill4");
    var skill5 = document.getElementById("Skill5");

    //pass value to store in session storage
    if(result)
    {
        storeApplication(firstname,lastname,DOB,genderM,genderF,street,town,state,postcode,email,phone,skill1,skill2,skill3,skill4,skill5,comment);
    }

    return result;
}

function storeApplication(firstname,lastname,DOB,genderM,genderF,street,town,state,postcode,email,phone,skill1,skill2,skill3,skill4,skill5,comment)
{
    //add value to session storage
    sessionStorage.firstname = firstname;
    sessionStorage.lastname = lastname;
    sessionStorage.DOB = DOB;
    sessionStorage.genderM = genderM.checked;
    sessionStorage.genderF = genderF.checked;
    sessionStorage.street = street;
    sessionStorage.town = town;
    sessionStorage.state = state;
    sessionStorage.postcode = postcode;
    sessionStorage.email = email;
    sessionStorage.phone = phone;
    sessionStorage.skill1 = skill1.checked;
    sessionStorage.skill2 = skill2.checked;
    sessionStorage.skill3 = skill3.checked;
    sessionStorage.skill4 = skill4.checked;
    sessionStorage.skill5 = skill5.checked;
    sessionStorage.comment = comment;
}

function prefill()
{
    //fill form with previous information
    if(sessionStorage.firstname != undefined)
	{
		document.getElementById("First_Name").value = sessionStorage.firstname;
	
        
        document.getElementById("Last_Name").value=sessionStorage.lastname;
        
        
        document.getElementById("DOB").value=sessionStorage.DOB;
        
        if(sessionStorage.genderM == "true")
        {
                document.getElementById("gm").checked = true;
        }
        if(sessionStorage.genderF == "true")
        {
                document.getElementById("gf").checked = true;
        }

        document.getElementById("Street_Address").value=sessionStorage.street;

        document.getElementById("Suburb/Town").value=sessionStorage.town;
        
        document.getElementById("State").value=sessionStorage.state;
        
        document.getElementById("Postcode").value=sessionStorage.postcode;
        
        document.getElementById("Email").value=sessionStorage.email;

        document.getElementById("phone").value=sessionStorage.phone;

        if(sessionStorage.skill1 == "true"){
            document.getElementById("Skill1").checked = true;
        }
        if(sessionStorage.skill2 == "true"){
            document.getElementById("Skill2").checked = true;
        }
        if(sessionStorage.skill3 == "true"){
            document.getElementById("Skill3").checked = true;
        }
        if(sessionStorage.skill4 == "true"){
            document.getElementById("Skill4").checked = true;
        }
        if(sessionStorage.skill5 == "true"){
            document.getElementById("Skill5").checked = true;
            document.getElementById("Comment").value = sessionStorage.comment;
        }
    }
}

function init()
{
    
    var form = document.getElementById("regform");
    //check if form exist
    if(form!=null && form!=undefined)
    {
        form.onsubmit = checkForm;
        prefill();
    }

    var JobRef1 = document.getElementById("JR1");
    var JobRef2 = document.getElementById("JR2");

    //check if jobref1 exist
    if(JobRef1!=null && JobRef1!=undefined)
    {
        JobRef1.addEventListener('click',function(e)
        {
            e.preventDefault();
            var JR1 = document.getElementById("JR1").value;
            localStorage.setItem('JR',JR1);
            window.location.href = "apply.html";
        });
    }

    //check if jobref2 exist
    if(JobRef2!=null && JobRef2!=undefined)
    {
        JobRef2.addEventListener('click',function(e)
        {
            e.preventDefault();
            var JR2 = document.getElementById("JR2").value;
            localStorage.setItem('JR',JR2);
            window.location.href = "apply.html";
        });
    }

    var JobRef = document.getElementById("Job_Reference");
    var JRef = document.getElementById("JRef");

    //check if jobref exist and add value to local storage
    if(JobRef!=null && JobRef!=undefined)
    {
        JobRef.value = localStorage.getItem('JR');
        JobRef.readOnly = true;
        JRef.value = localStorage.getItem('JR');
    }
}
//load init function to html page
window.addEventListener('load', init);