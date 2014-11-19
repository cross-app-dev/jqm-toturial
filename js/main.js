/*************************
Checklist of app delivery:

1. The home page for the app should provide some basic information about what the tutorial topic is and a button to start the tutorial.

2. info/about page that provides your personal info as the developer.

3. links to the home page and info page should be presented as two buttons that fill a fixed footer at the bottom of the screen.

4. Clicking the start tutorial button should resume at whatever step the user last viewed.

5. At least half of the steps should have images.

6. Tapping the close button will take the user back to the Home page and save the current
step within the tutorial. Clicking on the start button again will take the user back to that
same step.

7. Users should be able to move backwards or forwards through each step in the tutorial.

8. Your App must have a custom theme that you create with the theme roller and import.

Useful attributes:
data-role=page, page-dialog=true,
page-tranisition=flip/slide
to buttons in the footer, use class ui-btn-right or ui-btn
apply class ui-bar to the footer it gives more spaces instead of crowded elements in the footer.
Search for ui-btn-icon
ui-mini, ui-btn-inline or u can use controlgroup instead and set data-type attribute to horizontal or vertical
buttons with icons: ui-btn-arrow-u/l/r/d ui-btn-icon-top/bottom/left/right ui-corner-all ui-btn-notext
**************************/

$(document).ready(function(ev){

    $('a:contains("Previous"),a:contains("Next")').on("click", function(ev){
        console.log("previous/next button has been clicked");

        /* Prevent jQuery Mobile from perfroming any default actions.*/
        ev.preventDefault();

        /* Apply page change options according to the pressed button. */
        var pageChangeOpts = {
            changeHash:false,
            role:"page",
            transition:"slide",
            isDlgClosePressed:false
        };

        if("Previous" === $(this).text()){
            pageChangeOpts.reverse = true;
        }
        if("#homepage" === ev.target.hash){
            pageChangeOpts.transition = "flip";
        }


        /* Move the next/previous page but avoid creating new entry in the browser
        history such that when the dialog close button is clicked, the homepage of
        the tutorial would be displayed */
        $.mobile.pageContainer.pagecontainer("change",
                                             $(this).attr("href"),
                                             pageChangeOpts);
    });

    $(document).on("pagecontainerbeforechange", function(ev, data){
//        console.log("Before change the page");
//        console.log(data.options.isDlgClosePressed);
        if('undefined' === typeof data.options.isDlgClosePressed){
            data.options.transition = "flip";
            data.options.isDlgClosePressed = true;
//            console.log("close button is pressed");
        }
    });
});
