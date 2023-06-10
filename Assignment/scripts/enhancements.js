function currentTime() {
    //Get current time
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";
    //The date.getHours method returns values between 0-23, and given we are programming a 12 hours clock we use the following if statement to reset 12 to 0
    if(hh === 0){
        hh = 12;
    }
    //We use another if to subtract hours greater than 12 and to assign the value of the session variable to “PM”.
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
    }
    //If digit less than 10 add a 0 in front
    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;
    //We create a variable time to store the time in the desired format (hh:mm:ss)
    let time = hh + ":" + mm + ":" + ss + " " + session;
    //Display the time
    document.getElementById("clock").innerText = time; 
    //Update the code every second, to keep our clock running.
    let t = setTimeout(function(){ currentTime() }, 1000);
}

//Required html element for countdown clock
function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;
    function twoDigits( n )
    
    {return (n <= 9 ? "0" + n : n);}
//A constant of the id function of the countdown element
    element = document.getElementById( elementName );
//The countdown time has been calculated.

//Total time of countdown, added at the end of all   
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();


    function updateTimer()
    {
        msLeft = endTime - (+new Date);
//What happens when the countdown time ends
//1000 ms = 1s
        if ( msLeft < 1000 ) {
            element.innerHTML = "Time is up!";
        } 
//What will happen before the countdown ends
        else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
//Determines how time can be viewed in a webpage
//innerHTML helps to display an element in a webpage
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }
}

//function to auto refresh page
function AutoRefresh( t ) {
    setTimeout("location.reload(true);", t);
}

function load()
{
    countdown( "ten-countdown", 30, 0 );
    currentTime();
    AutoRefresh(5000);
}

window.addEventListener('load', load);