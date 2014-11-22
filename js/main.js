/*************************
Checklist of app delivery:

1. The home page for the app should provide some basic information about what the tutorial topic is and a button to start the tutorial.

2. info/about page that provides your personal info as the developer.

5. At least half of the steps should have images.

8. Your App must have a custom theme that you create with the theme roller and import.
**************************/
var localStorageKey = "show0017_step";
var tutorialPagesPrefix = "#page-";

$(document).ready(function(ev){

    /* Set click listener for start button. */
    $('a:contains("Start")').on("click", function(ev){
        /*console.log("Start button is clikced");*/

        ev.preventDefault();

        var lastPageHref = localStorage.getItem(localStorageKey);
        lastPageHref = (null === lastPageHref)? tutorialPagesPrefix+"01": lastPageHref;

        $.mobile.pageContainer.pagecontainer("change", lastPageHref , {transition:"flip"});
    });

    /* Set click listener for prev/next buttons*/
    $('a:contains("Previous"),a:contains("Next")').on("click", function(ev){
        console.log("previous/next button has been clicked");

        /* Prevent jQuery Mobile from perfroming any default actions.*/
        ev.preventDefault();

        /* Apply page change options according to the pressed button. */
        var pageChangeOpts = {
            changeHash:false,
            role:"page",
            transition:"slide",

            /* This variable is used to differeniate whether the dialog is hidden because
             of close button is pressed or next/prev button is pressed. Since there is no
             special jquery mobile event for close button of the dialog. */
            isDlgClosePressed:false
        };

        if("Previous" === $(this).text()){
            pageChangeOpts.reverse = true;
        }


        /* Move the next/previous page but avoid creating new entry in the browser
        history such that when the dialog close button is clicked, the homepage of
        the tutorial would be displayed */
        $.mobile.pageContainer.pagecontainer("change",
                                             $(this).attr("href"),
                                             pageChangeOpts);
    });

    /* Set listene for page container object before changing any page. */
    $(document).on("pagecontainerbeforechange ", function(ev, data){

        /* save laste visited page tutorial when closing. This can be achieved by
        checking previous and target pages ids.*/
        var prevPageRegex=/(page-\d+)$/;
        if(data.prevPage)
            var myResult = data.prevPage["0"].id.match(prevPageRegex);

        if(myResult && ("homepage" === data.toPage["0"].id)){
            localStorage.setItem(localStorageKey,"#"+myResult[0]);
            data.options.transition = "flip";
        }


    });
});
