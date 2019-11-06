function deleteRemainingTime(){
    deleteCookie('seconds');
    deleteCookie('minutes');
    deleteCookie('exm-auth');
}
function stop_preloader(returnMessage = "Successful"){
    //load the preloader 
    const progress_btn = document.querySelector('#progress_btn');
    
  
    progress_btn.removeAttribute('class');
    progress_btn.setAttribute('class','center-align d-none');
    
    }



function start_preloader(){
    //load the preloader 
const progress_btn = document.querySelector('#progress_btn');
   
    progress_btn.removeAttribute('class');
    progress_btn.setAttribute('class','center-align d-block');
}
function changeBgColor(DOM_id){
    // function to change background color of a container

    DOM_id.removeAttribute('class'); //Remove the current class attribute attached to the buttoon.

    

    DOM_id.setAttribute('class', 'btn black'); //Add a new attribute class with the black color.

}
function changeBgColor_back(DOM_id){
    // function to change background color of a container

    DOM_id.removeAttribute('class'); //Remove the current class attribute attached to the buttoon.

    

    DOM_id.setAttribute('class', 'btn white'); //Add a new attribute class with the black color.
}

function deleteCookie(cname){
    var d = new Date(); //Create an date object
    d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
    var expires = "expires=" + d.toGMTString(); //Compose the expirartion date
    window.document.cookie = cname+"="+"; "+expires;//Set the cookie with name and the expiration date
}

function registerAsCookie(arg){
    
        document.cookie="inputVal="+arg.value;
     }
function create_def_cookie(cookie_name, cookie_value){
    //Store values of all type : The default cookie handler
    document.cookie= cookie_name+"="+cookie_value;
}

function getCookie(cname){
    //A function to get cookies stored on the browser. 
   
        var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return '';
     }

function storeInBrowser(cookieName,cookieValue){
	//A function to store/ create new cookie locally on the browser. used for DOM elements only
        document.cookie = cookieName + "=" + cookieValue.value;
     }

function AsyncData(url,dataToProcess,typeOfReq,method='POST'){

	//Function to handle asynchronous data between the front end and the back end.

	let data = dataToProcess;

	//Create a new AJAX request object

	let request = new XMLHttpRequest();

	//open a connection to the server

	request.open(method,url);

	//Handle the response that the server returns

	request.addEventListener('readystatechange', handleAjaxResponse)



	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');

	//Now, send the request with the post data
	request.send(data);
}

function showAjaxResponse(ajaxResponse){

    let parsedResponse = JSON.parse(ajaxResponse);

    if(parsedResponse.typeOfResponse == 'containResult'){
        
        const score = document.querySelector('#score');
        const total = document.querySelector('#total');
        const exam = document.querySelector('#exam');
        score.innerHTML = parsedResponse.count;
        total.innerHTML = 30
        exam.innerHTML = parsedResponse.curr_exam_type

        create_def_cookie('minutes', 0); create_def_cookie('seconds', 0);
        deleteCookie(minutes); deleteCookie(seconds);


        MicroModal.show('result');
    }
    else if(parsedResponse.typeOfResponse == 'updatedUser'){
        console.log('done');
        create_def_cookie('infoUpdated',true);
        MicroModal.close('pop_update');
    }
    else if(parsedResponse.typeOfResponse == 'getDocuments'){
        const the_Question = document.querySelector('#the_Question');
        const examType = document.querySelector('#examtype');
        const optionA = document.querySelector('#option_a');
        const optionB = document.querySelector('#option_b');
        const optionC = document.querySelector('#option_c');
        const optionD = document.querySelector('#option_d');
        const correctOption = document.querySelector('#correctOption');
        const response_holder_question_id = document.querySelector('#response_holder_question_id');
        
        the_Question.innerHTML =  parsedResponse.question.question;
        response_holder_question_id.setAttribute('value',parsedResponse.question._id);
        examType.setAttribute('value',parsedResponse.question.Exam_category);
        optionA.setAttribute('value',parsedResponse.question.option_A);
        optionB.setAttribute('value',parsedResponse.question.option_B);
        optionC.setAttribute('value',parsedResponse.question.option_C);
        optionD.setAttribute('value',parsedResponse.question.option_D);
        correctOption.setAttribute('value',parsedResponse.question.correct_option);

        stop_preloader();
    }
    else if(parsedResponse.typeOfResponse == 'save_changes'){
        stop_preloader();
    }
    else if(parsedResponse.typeOfResponse == 'deleteDocuments'){
        stop_preloader();
    }else if(parsedResponse.typeOfResponse == 'createQuestion'){
        //clear the inputs
        
       // document.getElementById('question_form').reset();


              $("#question_form")[0].reset();
              stop_preloader("New Question Created");
        return false; // prevent submitting
    }
    else if(parsedResponse.typeOfResponse == 'crownMod'){
        stop_preloader("Moderator created");
       
    }
    else if(parsedResponse.typeOfResponse == 'createExamType'){
        stop_preloader("Exam created");
    }
    else if(parsedResponse.typeOfResponse == 'createSubject'){

        stop_preloader("Subject created");
    }
    else if(parsedResponse.typeOfResponse ==  "error"){
        stop_preloader_err();
    }
    }
       


function handleAjaxResponse(){

	let request = this;

	/*
    Exit this function unless the AJAX request is complete,
    and the server has responded.
    */
    if (request.readyState != 4)
        return;


    // If there wasn't an error, run our showResponse function
    if (request.status == 200) {

	let ajaxResponse = request.responseText;

	showAjaxResponse(ajaxResponse);
}
}

function myReplace(mainStr){
    let str = mainStr;
    let res = str.replace("%2F","/");
    res = res.replace(/%20/g, "+");
    return res;
}