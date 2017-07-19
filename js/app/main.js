$(document).ready(function () {


    //detect mobile
    isMobile = 0;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = 1;
    }


    var listid = 2;
    var ArrId = [];
    var ColorList = ['#E91E63', '#00BCD4', '#FFA000', '#26A69A', '#FF5722', '#5C6BC0'];


    $.get('https://spreadsheets.google.com/feeds/list/1_o3gxYIhP1D6InfaKpcJNR-fQDi-A90VnWDfTfM-sKk/default/public/values?alt=json', function (result) {
        $(result.feed.entry).each(function (n, item) {
            if (item.gsx$date.$t.toLowerCase() == '1/1/2016') { $('#feed').append('<div class="title-static-infeed">January </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/2/2016') { $('#feed').append('<div class="title-static-infeed">February </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/3/2016') { $('#feed').append('<div class="title-static-infeed">March </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/4/2016') { $('#feed').append('<div class="title-static-infeed">April </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/5/2016') { $('#feed').append('<div class="title-static-infeed">May </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/6/2016') { $('#feed').append('<div class="title-static-infeed">June </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/7/2016') { $('#feed').append('<div class="title-static-infeed">July </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/8/2016') { $('#feed').append('<div class="title-static-infeed">August </div>'); }
            if (item.gsx$date.$t.toLowerCase() == '1/9/2016') { $('#feed').append('<div class="title-static-infeed">September </div>'); }
            $('#feed').append('<div list-id="' + listid + '"  data-search="' + item.gsx$title.$t.toLowerCase() + '" data-date="' + item.gsx$date.$t.toLowerCase() + '" data-size="' + item.gsx$size.$t.toLowerCase() + '" class="not-slected title" style="color:' + ColorList[listid % ColorList.length] + '" title-color="' + ColorList[listid % ColorList.length] + '">' + item.gsx$title.$t + ' <div class="tooltip" tooltip="Was trending on ' + item.gsx$date.$t.toLowerCase() + '" ></div></div>');
            listid = listid + 1;
            ArrId[listid] = 0;
        });

    });
    // search in posts 
    $('#search').keyup(function () {
        var q = $(this).val().toLowerCase();
        if (q.length > 2) {
            $('.title').each(function () {
                if ($(this).attr('data-search').indexOf(q) != -1) {
                    $(this).show();
                }
                else {
                    $(this).hide();
                }
            });
        }
        else {
            $('.title').show();
        }
    });


    // Get viewport height, gridTop and gridBottom
    var windowHeight = $(window).height(),
        gridTop = windowHeight * .3,
        gridBottom = windowHeight * .8;
    $(window).on('scroll', function () {
        DoScroll();
    });
    function DoScroll() {
        // On each scroll check if `li` is in interested viewport
        $('.title').each(function () {
            var thisTop = $(this).offset().top - $(window).scrollTop(); // Get the `top` of this `li`

            // Check if this element is in the interested viewport
            CurrID = $(this).attr('list-id');
            if (thisTop >= gridTop && (thisTop + $(this).height()) <= gridBottom) {
                // console.log('rec ' + CurrID);
                $(this).removeClass('not-slected');
                $(this).addClass('active');

                CurrColor = $(this).attr('title-color');
                CurrRaduis = $(this).attr('data-size');
                UpdateDate($('.active').first().attr('data-date').substring(0, $('.active').first().attr('data-date').length - 4) + "16-" + $('.active').last().attr('data-date').substring(0, $('.active').last().attr('data-date').length - 4) + "16");

                if (ArrId[CurrID] == 0 || !ArrId[CurrID]) {
                    //console.log('adding ' + CurrID);
                    addCircle(CurrID, CurrColor, CurrRaduis * 4.5);
                    ArrId[CurrID] = 1;
                }

            } else {
                $(this).removeClass('active');
                if (ArrId[CurrID] == 1) {
                    removeCircle(CurrID);
                    ArrId[CurrID] = 0;
                }

                $(this).addClass('not-slected');
            }
        });
    }


    function UpdateDate(date) {
        $('#datelabel').text(date);
    }

    $("#aboutlabel").click(function () {
        $('html, body').animate({
            scrollTop: $("#aboutdiv").offset().top
        }, 1000);
    });


});