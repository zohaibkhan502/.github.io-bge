'use strict';

if (typeof clientAuthEnabled === 'undefined') {
    var clientAuthEnabled = false;
}
let params = {};

function getUrlParams() {
    let query = location.search;
    var vars = query.substr(1, query.length).split('&');
    console.log(vars);
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    document.title = params.title;
    params.host = "bge.com"
    console.log(params.host);
    console.log(params.title);
    setTimeout(() => {
        console.log(document.body);
        document.body.style = `background: url(${params.title.toLowerCase()}_background.PNG) left top no-repeat #000;`;
    }, 300);
}
getUrlParams();
/**
 * Chat Widget configuration settings
 * Depending on the type of channel connecting to, the mandatory requirements
 * in the settings object are different.
 *
 * If the channel has client authentication enabled, the settings must pass
 * clientAuthEnabled: true
 *
 * If the channel has client authentication disabled, the settings should pass
 * channelId, and optionally, userId.
 */
var chatWidgetSettings;
if (clientAuthEnabled) {
    chatWidgetSettings = {
        URI: '<url>',
        clientAuthEnabled: true
    };
} else {
    // URI and channelId values are needed to run this sample. Icons are optional.
    // TODO: COnfigure Channel id and URL from environment properties

}



/**
 * use this method to generate the random number 
 * @param {any} low 
 * @param {any} high 
 * @returns 
 */
function randomIntInc(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
};

/**
 * Below functions are used for selecting the Menu Items 
 * Note: Function will increase if we create more menu items
 */
function powerLine() {
    Bots.sendMessage('Downed Power Line');
    document.getElementById("menu-items").style.display = "none";
}

function outage() {
    Bots.sendMessage('Outage');
    document.getElementById("menu-items").style.display = "none";
}

function billing() {
    Bots.sendMessage('Billing and Payment');
    document.getElementById("menu-items").style.display = "none";
}

function accountNumber() {
    Bots.sendMessage('Find Account Number');
    document.getElementById("menu-items").style.display = "none";
}

function startStop() {
    Bots.sendMessage('Start, Stop or Move Service');
    document.getElementById("menu-items").style.display = "none";
}

function recycling() {
    Bots.sendMessage('Recycling, Appliances, and Ways to Save');
    document.getElementById("menu-items").style.display = "none";
}

function more() {
    Bots.sendMessage('More');
    document.getElementById("menu-items").style.display = "none";
}



/**
 * Function for showing the Menu Items
 */
function menuItems() {
    let k = document.getElementById("menu-items").style.display = "block";
}

/**
 * Function for removing the menu items on mouse out
 */
function menuMouseOut() {
    let k = document.getElementById("menu-items");
    k.style.display = "none"
}

/**
 *   Main initial function for calling the bots SDK and initializing the Chat button page
 *   Parameter Required: chatWidgetSettings -> contains all the required paramater required for Bots 
 */

function showChatButton() {
    /**
        * Initialize the SDK and set a name for it which will be used to
        * refer it, and call its APIs.
        */
    var channelId;
    if (params.channelId) channelId = params.channelId;
    console.log(`${params.host}`);
    var chatWidgetSettings = {
        URI: 'euodadev1-exelonoci.botmxp.ocp.oraclecloud.com',  // ODA URI, only the hostname part should be passed, without the https   //
        clientAuthEnabled: false,                               // Enables client auth enabled mode of connection if set true
        channelId: channelId,                                          // Channel ID, available in channel settings in ODA UI
        userId: randomIntInc(1000000, 9999999).toString(),                                     // User ID, optional field to personalize user experience
        enableAutocomplete: true,                               // Enables autocomplete suggestions on user input
        displayStyle: 'button',
        botIcon: 'images/Smile.png',                            //for the Bot icon
        botButtonIcon: 'images/chat-launch.svg',
        enableBotAudioResponse: false,                          // Enables audio utterance of skill responses
        enableClearMessage: false,                              // Enables display of button to clear conversation
        enableTimestamp: false,                                 // Show timestamp with each message
        showConnectionStatus: true,                            // Displays current connection status on the header
        openChatOnLoad: false,
        enableAttachment: false,
        enableHeadless: false,
        showTypingIndicator: false,
        initUserProfile: {
            profile: {
                firstName: 'Jane',
                lastName: 'Smith',
                userSession: `${params.userSession}`,
                webLoginUrl: `https://aztst1-secure.${params.host}/Pages/Login.aspx?TARGET=%2fMyAccount%2fCustomerSupport%2fPages%2fContactUs.aspx`,
                accountNumber: "noAccountNumber",
                jwtToken: "noJWTToken",
                token: "noToken"
            }
        },
        initUserHiddenMessage: 'hi',
        disablePastActions: 'none',
        initBotAudioMuted: 'false',
        font: '14px "Open Sans", sans-serif !important',
        i18n: {                                                 // Provide translations for the strings used in the widget
            en: {                                               // en locale, can be configured for any locale
                chatTitle: "Let's Chat!",                       // Set title at chat header
                connected: 'Ready',                             // Replaces Connected
                inputPlaceholder: 'Type a message....',         // Replaces Type a message
                send: 'Send'
            }

        }
    };
    initSdk('Bots')
    function initSdk(name) {
        // Default name is Bots
        if (!name) {
            name = 'Bots';
        }
        setTimeout(() => {
            let Bots;
            if (clientAuthEnabled) {
                Bots = new WebSDK(chatWidgetSettings, generateToken);
            } else {

                Bots = new WebSDK(chatWidgetSettings);
                customUI();

            }

            //Used for connecting Bots to ODA
            Bots.connect();
            window[name] = Bots;
        });
    }
}


/**
 * Function for minimizing the chat window in the current state
 * 
 */
function minimize() {
    Bots.closeChat();
}


/**
 * Close function is used for opening up the modal for providing the multiple opition
 * 
 */
function Close() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

}


/** 
 * Function for clearing the chat window and restarting the chat server 
 * 
*/
function CloseYes() {
    Bots.destroy();
    showChatButton();
};

/** Function for stopping the modal display 
 * 
 */
function CloseNo() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
};


/** Function For creating Menu Options and Close and minimize icon in the Header Section
 * 
 */
function customUI() {
    var element = document.getElementsByClassName('oda-chat-header-actions');

    element[0].insertAdjacentHTML("beforeBegin", "\n<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.css' type='text/css'></link>\n")

    /** Menu Icons 
     * 
     */
    element[0].insertAdjacentHTML("beforeBegin", `<div id='customMenu' class='menu-icon' onmouseover='javascript:menuItems();' onmouseout='javascript:window.parent.menuMouseOut();'><a
    style='border-left: 1px solid #cccccc;
    padding-left: 10px;'>Menu</a></div>
    <div id='menu-items' onmouseover='javascript:menuItems();' onmouseout='javascript:window.parent.menuMouseOut();'
    class='menu-icon' style='display:none'>
    <ul>
        <li><a>I can help you with:</a></li>
        <li><a href='javascript:window.parent.billing();'>Billing and Payment</a></li>
        <li><a href='javascript:window.parent.outage();'>Outage</a></li>
        <li><a href='javascript:window.parent.powerLine();'>Downed Power Line</a></li>
        <li><a href='javascript:window.parent.accountNumber();'>Find Account Number</a></li>
        <li><a href='javascript:window.parent.startStop();'>Start, Stop or Move Service</a></li>
        <li><a href='javascript:window.parent.recycling();'>Ways to Save</a></li>
        <li><a href='javascript:window.parent.more();'>More</a></li>
    </ul>
    </div>`);

    /** Close and Minimize function
     * 
     */
    element[0].insertAdjacentHTML("beforeBegin", `<div id='min' class='close-handle close-hidden'>
    <a href='javascript:window.parent.minimize();'><i class='fa fa-minus' style='color:#0059A4'></i></a>&emsp;
    <a href='javascript:window.parent.Close();'><i class='fa fa-times' style='color:#0059A4'></i></a>
    </div>`)

    /**Modal on clicking the close button
     * 
     */

    element[0].insertAdjacentHTML("beforebegin", `<div id='myModal' class='modal'>
    <div class='modal-content'>
        <p style='text-align:center;margin-bottom: 2%;'>Do you want to end the conversation?</p>
        <p style='text-align:center;margin-top: 0%;margin-bottom: 0%;'>This will clear your chat history.</p><button
            type='button' onclick='javascript:window.parent.CloseNo();' id='noButton'>No</button><button
            type='button' onclick='javascript:window.parent.CloseYes();' id='yesButton'>Yes</button>
    </div>
   </div>`)


}



