var type = ""; //Car type
var service = ""; //Main service name
var addService = []; //Additional service name
var toggle = 0; // Variable for toggling blocks

$(document).ready(function(){

    //First step
    var chooseOne = $('.main-body_left_section_choose_one > .main-body_left_section_choose_point-box'); //first choice
    
     //First step
    chooseOne.click(function () {
        
        var isDisabledButton = $('check-submit').hasClass('disabled');
        if(isDisabledButton){
            return;
        }else{
            $('#check-submit').addClass('disabled');
        }
        
        //Remove class checked from others
        for(var i = 0; i<chooseOne.length;i++){
            if($(chooseOne[i]).hasClass('choose_point-box_checked')){
                $(chooseOne[i]).removeClass('choose_point-box_checked');
            }
        }
        
        //Add class checked for selected item
        $(this).addClass('choose_point-box_checked');
        
        //Save the choise for the next query
        type = $(this).attr('id');
        
        ChangeWashTypePicture(type);
        
        //Throw info into check
        $('#check').css("visibility", "visible");
        var carType = $(this).children('.main-body_left_section_choose_point-box_data').children('.main-body_left_section_choose_point-box_data_header').text();
        $('#check-car-type').text(carType);
        $('#check-car-type').removeClass('hidden');
        
        //Toggle to the next choose step
        if(toggle<=1){
            toggle = 1;
            toggleTheBlocks(toggle);
        }
        else{
            $('.main-body_left_section_choose_two').removeClass('visible');
            $('.main-body_left_section_choose_three').removeClass('visible');
            toggle = 1;
            toggleTheBlocks(toggle);
        }
        $('html, body').animate({
        scrollTop: $('#choose-two').offset().top}, 800);
       
    });
    
    function ChangeWashTypePicture(type){
        
        var toChange = $('.main-body_left_section_choose_two > .main-body_left_section_choose_point-box > .choose_point-box_wash-type_image');
        var pictureClass = "wash-type_image_" + type;
        
        
        var types = new Array("bike", "golf", "business", "universal", "parket", "4x4", "micro", "gazel");
        
        for(var i = 0; i<types.length; i++){
            var strClassToRemove = "wash-type_image_" + types[i];
            if($(toChange).hasClass(strClassToRemove)){
                $(toChange).removeClass(strClassToRemove);
            }
        }
        
        $(toChange).addClass(pictureClass);
    }
    
    //Choose two
  var chooseTwo = $('.main-body_left_section_choose_two > .main-body_left_section_choose_point-box'); //second choice (wash type)
    
    //Choose two
    chooseTwo.click(function () {
        
        //Remove class checked from others
        for(var i = 0; i<chooseTwo.length;i++){
            if($(chooseTwo[i]).hasClass('choose_point-box_checked')){
                $(chooseTwo[i]).removeClass('choose_point-box_checked');
            }
        }
    
        //Add class checked for selected item
        $(this).addClass('choose_point-box_checked');
        
        //Save the choise for the next query
        service = $(this).attr('id');
        
        //Throw info into check
        var serviceType = $(this).children('.main-body_left_section_choose_point-box_data').children('.wash-type_header').text();
        $('#check-service').text(serviceType);
        $('#check-service').removeClass('hidden');
        
        $('#check-duration-name').removeClass('hidden');
        
        var thisWashType = $(this).hasClass('point-box_wash-type_four');
        var durationText = "";
        if(thisWashType){
            durationText = "60 минут";
        }else{
            durationText = "30 минут";
        }
        $('#check-duration').text(durationText);
        $('#check-duration').removeClass('hidden');
        $('#check-submit').removeClass('disabled');

        
        
        if(toggle<=2){
            toggle = 2;
            toggleTheBlocks(toggle);
        }
        else{
            $('.main-body_left_section_choose_two').removeClass('visible');
            $('.main-body_left_section_choose_three').removeClass('visible');
            toggle = 2;
            toggleTheBlocks(toggle);
        }
        $('html, body').animate({
        scrollTop: $('#choose-three').offset().top}, 800);
       
    });
    
    //Choose three
  var chooseThree = $('.main-body_left_section_choose_three .choose_point-box_add_service'); //third choice (additional service)
    
    //Choose three (additional sevice)
    chooseThree.click(function () {
        
        //Mark the item as choosen
        $(this).toggleClass('choose_point-box_checked');
        
        //Add to array of the add-services with checcking if it is already there
        var flag = true;
        for(var i =0; i<addService.length; i++){
            if(addService[i] == $(this).attr('id')){
                flag = false;
                addService.splice(addService.indexOf($(this).attr('id')),1);
            }
        }
        
        if(flag){
            addService.push($(this).attr('id'));
        }
        
        if(addService.length == 1){
            var text = $(this).children('.main-body_left_section_choose_point-box_data_add_service').children('.choose_point-box_data_header_add_service').text();
            $('#check-add-service').text(text);
        }else{
            var addServiceLenghts = addService.length;
            var serviceText;
            if(addServiceLenghts == 2 || addServiceLenghts == 3 || addServiceLenghts == 4 || addServiceLenghts == 22 || addServiceLenghts == 23 || addServiceLenghts == 24){
                serviceText = "услуги";
            }else if(addServiceLenghts == 21 || addServiceLenghts == 31){
                serviceText = "услуга";
            }else{
                serviceText = "услуг";
            }
            var text = addService.length + " " + serviceText;
            $('#check-add-service').text(text);
        }
        
        $('#check-add-service').removeClass('hidden');
    });
    
    //Scroll on-ckick to change the points in the check
    $('#check-car-type').click(function(){
        $('html, body').animate({
        scrollTop: $('#choose-one').offset().top}, 800);
    });
    
    $('#check-service').click(function(){
        $('html, body').animate({
        scrollTop: $('#choose-two').offset().top}, 800);
    });
    
    $('#check-add-service').click(function(){
        $('html, body').animate({
        scrollTop: $('#choose-three').offset().top}, 800);
    });
    
    
    
    //On submit
    $('#check-submit').click(function(){
    var aType = type;
    var aService = service;
    var aAddService = JSON.stringify(addService);
    console.log(aAddService);
    $.ajax({
        type: "POST",
        url: "ajax.php",
        dataType: "json",
        data: {
            type: aType,
            service: aService,
            addService: aAddService
        },
        success: function(data){
            console.log(data);
        }
        
    });
});
});
    
    
    
    function toggleTheBlocks(toggle){
        
        //Toggling the step blocks when choosing
        //If user change his mind about the step before the next one is opening and others are hiding
        switch(toggle){
            case 1:
                $('.main-body_left_section_choose_two').addClass('visible');
                ClearTheAddService();
                break;
            case 2:
                $('.main-body_left_section_choose_three').addClass('visible');
                break;
            case 3:
                $('.main-body_left_section_choose_four').addClass('visible');
                break;
            default:{
                $('.main-body_left_section_choose_two').removeClass('visible');
                $('.main-body_left_section_choose_three').removeClass('visible');
                break;
            }
        }
    }
    
//Clear additional service in the check
    function ClearTheAddService(){
        var addServiceChecked = $('.choose_point-box_add_service');
        for(var i=0;i<addServiceChecked.length;i++){
            if($(addServiceChecked[i]).hasClass('choose_point-box_checked')){
                $(addServiceChecked[i]).removeClass('choose_point-box_checked');
            }
        }
        addService = [];
        $('#check-add-service').addClass('hidden');
    }
    
//Making scrool check on the right side
$(function(){
    var positionFromTop = 95;
    var topPos = $('.main-body_right_check').offset().top - positionFromTop;
 $(window).scroll(function() { 
  var top = $(document).scrollTop();
  if (top > topPos) $('.main-body_right_check').addClass('fixed'); 
  else $('.main-body_right_check').removeClass('fixed');
 });
});

//Send Ajax query
$(function(){
//    $('#check-submit').click(function(){
//    var aType = type;
//    var aService = service;
//    var aAddService = addService.serialize();
//    console.log(aAddService);
//    $.ajax({
//        type: "POST",
//        url: "ajax.php",
//        data: 
//    });
//});
});