const pressed = [];
const secretCode = "wesbos";

window.addEventListener("keyup", (e) => {
    console.log(e.key);
    pressed.push(e.key);
    pressed.splice(-secretCode.length-1, pressed.length - secretCode.length);

    if(pressed.join("").includes(secretCode)){
        console.log("DING DING!");
        cornify_add();
    }
    console.log(pressed);
});

let cornify_count = 0;
let cornify_add = function(options){
    cornify_count += 1;

    let cornify_url = "https://www.cornify.com";
    let numType = "px";
    let heightRandom = Math.random() * 0.75;
    let windowHeight = 768;
    let windowWidth = 1024;
    let height = 0;
    let width = 0;
    let de = document.documentElement;
    let transform = "translate(-50%, -50%)";
    let showGrandUnircorn = cornify_count === 15;

    //create a div container
    let div = document.createElement("div");
    div.style.position = "fixed";
    div.className = "__cornify_unicorn";
    div.style.zIndex = 143143;
    div.style.outline = 0;
    div.onclick = cornify_add;
    
    //the equal sign in and the showGrandUnicorn suppose to be ==
    if(typeof window.innerHeight === "number"){
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
    }else if(de && de.clientHeight){
        windowHeight = de.clientHeight;
        windowWidth = de.clientWidth;
    }else {
        numType = "%";
        height = Math.round(height * 100) + "%";
    }

    //clicking 15 times
    if(showGrandUnircorn){
        div.style.top = "50%";
        div.style.left = "50%";
        div.style.zIndex = 143143143;
    }else {
        div.style.top = Math.round(Math.random() * 100) + "%";
        div.style.left = Math.round(Math.random() * 100) + "%"

        transform += " rotate(" + Math.round(Math.random() * 10 - 5) + "deg)";
    }

    //create image element
    let img = document.createElement("img");
    img.style.opacity = 0;
    img.style.transition = "all .1s linear";
    img.alt = "A love unicorn or rainbow";
    img.onload = function(){
        img.style.opacity = 1;
    };

    //used a cache buster
    let currentTime = new Date();
    let submitTIme = currentTime.getTime();

    if(showGrandUnircorn){
        submitTIme = 0;
    }

    //construct unicorn
    let url = `https://www.cornify.com/corns/${Math.random() > 0.5 ? "r" : "u"}${Math.ceil(Math.random() * 7)}.gif`;

    //add unicorns
    if(options && (options.y || options.younicorns)){
        url += "&y" + (options.y ? options.y : options.younicorns);

        if(Math.random() > 0.5){
            //flip it horizontally
            if(transform.length > 0){
                transform += "scaleX(-1)";
            }
        }
    }

    div.style.transform = transform;
    div.style.MozTransform = transform;
    div.style.webkitTransform = transform;

    img.setAttribute("src", url);
    //add a nice hover wiggle
    img.style.transition = "all .1s linear";

    div.onmouseover = function(){
        let size = 1 + Math.round(Math.random() * 10) / 100;
        let angle = Math.round(Math.random() * 20 - 10);
        let result = "rotate(" + angle + ")deg scale(" + size + "," + size + ")";
        img.style.transform = result;
        img.style.MozTransform = result;
        img.style.webkitTransform = result;
    };

    div.onmouseout = function(){
        let size = 0.9 + Math.round(Math.random() * 10)/100;
        let angle = Math.round(Math.random() * 6 - 3);
        let result = "rotate(" + angle + ")deg scale(" + size + "," + size + ")";
        img.style.transform = result;
        img.style.MozTransform = result;
        img.style.webkitTransform = result;
    };

    //append div to the page
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(div);
    div.appendChild(img);

    //click 5 times
    if(cornify_count === 5){
        let cssExisting = document.getElementById("__cornify_css");

        if(!cssExisting){
            let head = document.getElementsByTagName("head")[0];
            let css = document.createElement("link");
            css.id = "__cornify_css";
            css.type = "text/css";
            css.rel = "stylesheet";
            css.href = "https://www.cornify.com/css/cornify.css";
            css.media = "screen";
            head.appendChild(css);
        }
        cornify_replace();
    }
    cornify_updatecount();

    let event = new Event("cornify");
    document.dispatchEvent(event);
};

//tracks how often we cornified
let cornify_updatecount = function(){
    let id = "__cornify_count";
    let p = document.getElementById(id);

    if(p == null){
        p = document.createElement("p");
        p.id = id;
        p.style.position = "fixed";
        p.style.bottom = "5px";
        p.style.left = "0px";
        p.style.right = "0px";
        p.style.zIndex = "1000000000";
        p.style.color = "#ff00ff";
        p.style.textAlign = "center";
        p.style.fontSize = "24px";
        p.style.fontFamily = "'Comic Sans MS', 'Comic Sans', 'Marker Felt', serif";
        p.style.textTransform = "uppercase";
        let body = document.getElementsByTagName("body")[0];
        console.log("  Body element inside cornify_updatecount:", body);
        if(body){
            body.appendChild(p);
        }else {
            console.error("CRITICAL ERROR: Body element is NULL when trying to append __cornify_count!");
            // This alert will pause execution and confirm if body is indeed null
            alert("Body is null in cornify_updatecount! Check HTML structure and script loading.");
            return;
        }
    }

    if(cornify_count === 1){
        p.innerHTML = "You cornified!";
    }else {
        p.innerHTML = "You cornified " + cornify_count + " times!";
    }

    cornify_setcookie("cornify", cornify_count + "", 1000);
};

let cornify_setcookie = function(name, value, days){
    let d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    
    let expires = "expires" + d.toGMTString();
    document.cookie = name + "=" + value + "; " + expires;
};

let cornify_getcookie = function(cname){
    let name = cname + "=";
    let ca = document.cookie.split(";");
    
    for(let i=0; i<ca.length; i++){
        let c = ca[i].trim();
        if(c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    return "";
};

//retrieve click count
cornify_count = parseInt(cornify_getcookie("cornify"));
if(isNaN(cornify_count)){
    cornify_count = 0;
}

//add happy words
let cornify_replace = function(){
    let hc = 6;
    let hs, h, k;
    let words = ["Happy", "Sparkly", "Glittery", "Fun", "Magical",
        "Lovely", "Cute", "Charming", "Amazing", "Wonderful",];
    
    while(hc >= 1){
        hs = document.getElementsByTagName("h" + hc);
        for(k=0; k<hs.length; k++){
            h = hs[k];
            h.innerHTML = words[Math.floor(Math.random() * words.length)] + " " + h.innerHTML;
        }
        hc -= 1;
    }
};

//clicking raindbows should make unicorns disappear
let cornify_click_cupcake_button = function(){
    let doc = document;
    let corns = doc.getElementsByClassName("__cornify_unicorn");

    if(corns){
        for(let i=0; i<corns.length; i++){
            corns[i].parentNode.removeChild(corns[i]);
        }
    }

    //remove our counter
    let button1 = doc.getElementById("__cornify_count");
    if(button1){
        button1.parentNode.removeChild(button1);
    }

    //remove cupcake button
    let button2 = doc.getElementById("__cornify_cupcake_button");
    if(button2){
        button2.parentNode.removeChild(button2);
    }

    let event = new Event("cornify-clear");
    document.dispatchEvent(event);
};

//add the rainbow cupcake button to the page
let cornify_add_cupcake_button = function(){
    let id= "__cornify_cupcake_button";
    let doc = document;
    let button = doc.getElementById(id);

    if(!button){
        button = button.createElement("div");
        button.id = id;
        button.onclick = cornify_click_cupcake_button;
        button.style.position = "fixed";
        button.style.top = "10px";
        button.style.right = "10px";
        button.style.zIndex = 2147483640;
        button.setAttribute("aria-label", "Hide unicorns and rainbows");

        let image = document.createElement("img");
        img.src = "https://wwww.cornify.com/assets/cornify-cupcake-button.png";
        image.alt = "Cupcake button";
        image.height = 50;
        image.width = 50;
        image.style.width = "50px !important";
        image.style.height = "50px !important";
        image.style.display = "black !important";
        image.style.cursor = "pointer !important";
        image.style.margin = "0 !important";
        image.style.padding = "0 !important";
        button.appendChild(image);

        doc.getElementsByTagName("body")[0].appendChild(button);
    }
};

// Adapted from http://www.snaptortoise.com/konami-js/
let cornami = {
    input: "",
    pattern: "38384040373937396665",
    clear: setTimeout("cornami.clear_input()", 5000),
    load: function(){
        window.document.onkeydown = function(event){
            if(cornami.input === cornami.pattern){
                cornify_add();
                clearTimeout(cornami.clear);
                return;
            }else {
                cornami.input += event.keyCode;
                if(cornami.input === cornami.pattern){
                    cornify_add();
                }
                clearTimeout(cornami.clear);
                cornami.clear = setTimeout("cornami.clear_input()", 5000);
            }
        };
    },
    clear_input: function(){
        cornami.input = "";
        clearTimeout(cornami.clear);
    },
};

cornami.load();



