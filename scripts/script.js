(function(){
        // smooth go to the SECTION
    function smoothMove (click_target, go_target){
        $(click_target).on('click', function(){ 
            $('body').animate({ scrollTop: $(go_target).offset().top}, 600);
        });
    }
        // HEADER Navigation
    smoothMove('header li:nth-of-type(1)', '#section_2');
    smoothMove('header li:nth-of-type(3)', '#section_3');
    smoothMove('header li:nth-of-type(5)', '#section_4');
    smoothMove('header li:nth-of-type(7)', '#section_5');
    smoothMove('header li:nth-of-type(9)', '#section_6');
        // FOOTER Navigation 
    smoothMove('footer li:nth-of-type(1)', '#section_2');
    smoothMove('footer li:nth-of-type(3)', '#section_3');
    smoothMove('footer li:nth-of-type(5)', '#section_4');
    smoothMove('footer li:nth-of-type(7)', '#section_5');
    smoothMove('footer li:nth-of-type(9)', '#section_6');
    smoothMove('footer li:nth-of-type(11)', '#section_5');



        // SCROLL TOP
    $('<span></span>').appendTo('body').addClass('top').hide();
    $('.top').html('&#916;');
    $(window).scroll(function(event) {
        if($(window).scrollTop() > 300){
            $('.top').fadeIn('slow');        
        } else {
            $('.top').fadeOut('slow');        
        }
    });
    $('.top').on('click', function(){
        $('body').animate({scrollTop: $('body').offset().top = 0},300);
    });
// SECTION 1
        // MENU 

    $('<div id="myMenu"></div>').insertAfter('#section_1').hide();

    var showMenu = true;
    $('#section_1 button').on('click', function(){
        if(showMenu) {
            $('#myMenu').slideDown('slow');
            showMenu = false;
        } else {
            $('#myMenu').slideUp('slow');
            showMenu = true;
        }    
    });
    var menuList = '<h3>name</h3>' +
                    '<h4>weightPrice</h4>' + 
                    '<p>description</p>';
    var articles = '<articles class="left"></articles><articles class="right"></articles>'; 

    $.getJSON('scripts/menu.json', function(menu){
        var thisMenu = menu;
        $('#myMenu').append(articles);
    
        // console.log(fullListMenu);
        numPlace = 0;  
        thisMenu.forEach( function(oneTab){
            var newTab = menuList.replace('name', oneTab.name)
                                  .replace('weightPrice', oneTab.weightPrice)
                                  .replace('description', oneTab.description);

            numPlace++;
            
            if (numPlace < (thisMenu.length/2)) {
                $('.left').append(newTab);    
            } else {
                $('.right').append(newTab);    
            }
            // console.log(numPlace);
        });
    });


// SECTION 5
        // FULL RECIPE

    $('<div id="fullRec"></div>').insertAfter('#section_5').hide();
    

    var showRec = true;
    $('#section_5 .btn').on('click', function(){
        if(showRec) {
            $('#fullRec').slideDown('slow');
            showRec = false;
        } else {
            $('#fullRec').slideUp('slow');
            showRec = true;
        }
    });

    var myRecipe = '<img id="pic" />' + 
                    '<article><p>products</p></article>' + 
                    '<article><p>how_to_cook</p></article>';

    $.getJSON('scripts/salt_recipe.json', function (recipe){
        var recipes = recipe;
        var recipeImage = $('#fullRec').append(myRecipe);
        var productList = $('#fullRec article:first-of-type p');
        var howToDo = $('#fullRec article:last-of-type p');
        

        var image_rotate; 
        var next_image = 1;
        var changeImage = $('#section_5 aside > img').attr('src', recipes[0].img);
        $('#fullRec img').attr('src', recipes[0].img);
        productList.html(recipes[0].products);
        howToDo.text(recipes[0].make_it);
        var pauseInterval = false;
        
        var thisInterval = setInterval(changeImg, 3000);
        function changeImg() {
            if (!pauseInterval) {                               // check is the interval is paused
                if (next_image < recipes.length) {
                    image_rotate = recipes[next_image].img;
                    changeImage = $('#section_5 aside > img').fadeOut('slow', function(){
                        $('#section_5 aside > img').attr('src', image_rotate);
                    }).fadeIn('slow');                              // change main image
                    $('#fullRec img').attr('src', image_rotate); // change image in recipe
                    productList.html(recipes[next_image].products); // change the list of products
                    howToDo.text(recipes[next_image].make_it); // change the made methood
                    next_image++;
                    
                } else { 
                    next_image = 0;
                    image_rotate = recipes[next_image].img;
                    changeImage = $('#section_5 aside > img').fadeOut('slow', function(){
                        $('#section_5 aside > img').attr('src', image_rotate);
                    }).fadeIn('slow');                            // change main image
                    $('#fullRec img').attr('src', image_rotate); // change image in recipe
                    productList.html(recipes[next_image].products); // change the list of products
                    howToDo.text(recipes[next_image].make_it); // change the made methood
                    next_image++;
                }
            }

        }
        
        $('#section_5 .btn').on('click', function(){        // first click pause Interval    
            if (!pauseInterval) {               
                pauseInterval = true;
            } else {                                        // second click start Interval again
                pauseInterval = false;
            }
        }); 
    });

// SECTION 3

    $('#section_3 .try').css('cursor', 'pointer');

    $('<div id="sweetFullRec"></div>').insertAfter('#section_3').hide();

    var showSweetRec = true;
    $('#section_3 .try').on('click', function(){
        if(showSweetRec) {
            $('#sweetFullRec').slideDown('slow');
            showSweetRec = false;
        } else {
            $('#sweetFullRec').slideUp('slow');
            showSweetRec = true;
        }
    });

    $.getJSON('scripts/sweet_recipe.json', function(sweetRec){
        var sweetRecipe = sweetRec;

        var sweetRecipeImage = $('#sweetFullRec').append(myRecipe);
        var productList = $('#sweetFullRec article:first-of-type p');
        var howToDo = $('#sweetFullRec article:last-of-type p');
        

        var sweet_rotate; 
        var sweet_image = 1;
        var sweet_time = 1;
        var changeSweetImage = $('#section_3 .try').css('background-image', 'url('+ sweetRecipe[0].img +')' );
        $('#sweetFullRec img').css('background-image', 'url('+ sweetRecipe[0].img +')' );
        productList.html(sweetRecipe[0].products);
        $('#section_3 .time').text(sweetRecipe[0].timeCook);
        $('#section_3 h2').text(sweetRecipe[0].title);
        $('#section_3 p').text(sweetRecipe[0].description);

        howToDo.text(sweetRecipe[0].make_it);
        var pauseInterval = false;
        
        var thisInterval = setInterval(changeSweetImg, 4000);
        function rotates (){
            // console.log(sweetRecipe[sweet_time-1].timeCook);    
            sweet_rotate = sweetRecipe[sweet_image].img;
            // console.log(sweet_rotate);
            changeImage = $('#section_3 .try').fadeOut('slow', function(){
                $('#section_3 .try').css('background-image', 'url(' + sweet_rotate + ')');
                $('#section_3 .time').text(sweetRecipe[sweet_time-1].timeCook);
                $('#section_3 h2').text(sweetRecipe[sweet_time-1].title);
                $('#section_3 p').text(sweetRecipe[sweet_time-1].description);
            }).fadeIn('slow');                              // change main image
            $('#sweetFullRec img').attr('src', sweet_rotate); // change image in recipe
            productList.html(sweetRecipe[sweet_image].products); // change the list of products
            howToDo.text(sweetRecipe[sweet_image].make_it); // change the made methood
            sweet_image++;
            sweet_time++;
        }
        function changeSweetImg() {
            if (!pauseInterval) {                               // check is the interval is paused
                if (sweet_image < sweetRecipe.length) {
                    rotates();
                } else { 
                    sweet_image = 0;
                    sweet_time = 0;
                    rotates();
                }
            }

        }
        
        $('#section_3 .try').on('click', function(){        // first click pause Interval    
            if (!pauseInterval) {               
                pauseInterval = true;
            } else {                                        // second click start Interval again
                pauseInterval = false;
            }
        }); 
// SMALL CAROUSEL movement - start
        var carouselLeft = 0;
        $('#section_3 img:first-of-type').attr('src', sweetRecipe[carouselLeft].img);
        $('#section_3 img:nth-of-type(2)').attr('src', sweetRecipe[carouselLeft + 1].img);
        $('#section_3 img:last-of-type').attr('src', sweetRecipe[carouselLeft + 2].img);
        
        $('#section_3 .rightR').on('click', function(){
            if(carouselLeft < sweetRecipe.length - 3){
                carouselLeft++;
                $('#section_3 img:first-of-type').attr('src', sweetRecipe[carouselLeft].img);
                $('#section_3 img:nth-of-type(2)').attr('src', sweetRecipe[carouselLeft + 1].img);
                $('#section_3 img:last-of-type').attr('src', sweetRecipe[carouselLeft + 2].img);
            }
            // console.log(carouselLeft);
        });
        $('#section_3 .leftR').on('click', function(){
            if(carouselLeft > 0){
                carouselLeft--;
                $('#section_3 img:first-of-type').attr('src', sweetRecipe[carouselLeft].img);
                $('#section_3 img:nth-of-type(2)').attr('src', sweetRecipe[carouselLeft + 1].img);
                $('#section_3 img:last-of-type').attr('src', sweetRecipe[carouselLeft + 2].img);
            }
            // console.log(carouselLeft);
        });
// SMALL CAROUSEL movement - end

    });
// BREAKFAST BUTTON - start
    $('<div class="breakfast"></div>').insertAfter('#section_4').hide();
    $('.breakfast').append('<article></article><article></article>');

    var slide = true;
    $('#section_4 button').on('click', function() {
        if (slide) {
            $('.breakfast').slideDown('slow');
            slide = false;
        } else {
            $('.breakfast').slideUp('slow');
            slide = true;
        }
    });

    var nowDate = new Date();
    var nowDay = nowDate.getDay();
    $('.breakfast article').append('<h2>HEADER</h2>');
    $('.breakfast article').append(menuList);
    $('.breakfast article').append('<h4 class="price">price</h4>');
    // if Monday, Tuesday, Wednesday, Thursday, Saturday, Sunday different offers - first article
    $.getJSON('scripts/breakfast.json',function(listOffers){
        var offer = listOffers;
        $.getJSON('scripts/happyHour.json',function(listHappy){
            var happyHour = listHappy;
            function offersDay (wellcome, numberDay){
                $('.breakfast article:first-of-type h2').text('Our offers for:');
                $('.breakfast article:first-of-type h4').text(offer[numberDay].offer);
                $('.breakfast article:first-of-type h3').text(offer[numberDay].dayOfWeek);
                $('.breakfast article:first-of-type p').text(offer[numberDay].description);
                $('.breakfast article:first-of-type .price').text(offer[numberDay].price);
                $('.breakfast article:last-of-type h2').text('Happy hour for ' + wellcome +':');
                $('.breakfast article:last-of-type h4').text(happyHour[numberDay].happyHours);
                $('.breakfast article:last-of-type h3').text(happyHour[numberDay].hour);
                $('.breakfast article:last-of-type p').text(happyHour[numberDay].descr);
                $('.breakfast article:last-of-type .price').text(happyHour[numberDay].happyPrice);
            }
            switch(nowDay) {
                case 1:
                    // $('.breakfast article:first-of-type h2').text('Our offers for:');
                    // $('.breakfast article:first-of-type h4').text(offer[0].offer);
                    // $('.breakfast article:first-of-type h3').text(offer[0].dayOfWeek);
                    // $('.breakfast article:first-of-type p').text(offer[0].description);
                    // $('.breakfast article:first-of-type .price').text(offer[0].price);
                    // $('.breakfast article:last-of-type h2').text('Happy hour for Monday:');
                    // $('.breakfast article:last-of-type h4').text(happyHour[0].happyHours);
                    // $('.breakfast article:last-of-type h3').text(happyHour[0].hour);
                    // $('.breakfast article:last-of-type p').text(happyHour[0].descr);
                    // $('.breakfast article:last-of-type .price').text(happyHour[0].happyPrice);
                    offersDay ('Monday', 0);
                    break;
                case 2:
                    offersDay ('Tuesday', 1);
                    break;
                case 3:
                    offersDay ('Tuesday', 2);
                    break;
                case 4:
                    offersDay ('Tuesday', 3);
                    break;
                case 5:
                    offersDay ('Tuesday', 4);
                    break;
                case 6:
                    offersDay ('Tuesday', 5);
                    break;
                case 0: 
                    offersDay ('Tuesday', 6);
                    break;
            }
        });
    });    
// BREAKFAST BUTTON - end

    $('.drop_steam').on('click', function(){
        $('header nav').toggleClass('visible');
    });


})();

