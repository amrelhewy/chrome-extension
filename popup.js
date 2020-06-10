document.addEventListener(
  "DOMContentLoaded",
  () => {
    var websites = [
      { website_name: "Amazon", name: "amazon", logo: "Amazon_logo.svg" },
      { website_name: "Jumia", name: "jumia", logo: "jumia-seeklogo.com.svg" },
      { website_name: "Souq", name: "souq", logo: "Souq_Logo_Primary_EN.svg" },
      { website_name: "Olx", name: "olx", logo: "olx.png" },
      { website_name: "Zara", name: "zara", logo: "Zara_Logo.svg" },
      { webiste_name: "Lacoste", name: "lacoste", logo: "Lacoste_logo.svg" },
      { website_name: "H&M", name: "hm", logo: "H&M-Logo.svg" },
      {
        website_name: "Pull&Bear",
        name: "pullandbear",
        logo: "Pull&Bear_logo.svg",
      },
      { website_name: "Bershka", name: "bershka", logo: "Bershka_logo.svg" },
      {
        website_name: "American Eagle",
        name: "ae",
        logo: "american-eagle-outfitters.svg",
      },
      { website_name: "Adidas", name: "adidas", logo: "Adidas_Logo.svg" },
      { website_name: "Nike", name: "nike", logo: "nike.png" },
      { website_name: "Puma", name: "puma", logo: "puma.png" },
      { website_name: "Reebok", name: "reebook", logo: "reebook.png" },
      {
        website_name: "El Araby Group",
        name: "elarabygroup",
        logo: "Elaraby-group-logo.png",
      },
      { website_name: "B-tech", name: "btech", logo: "b-tech.png" },
      { website_name: "Fresh", name: "fresh", logo: "fresh.png" },
      {
        website_name: "Mazaya Stores",
        name: "mazayastores",
        logo: "mazaya-png.png",
      },
      {
        website_name: "Huda Beauty",
        name: "hudebeauty",
        logo: "hude-beauty.png",
      },
      { website_name: "Sephora", name: "sephora", logo: "sephora.png" },
      {
        website_name: "Anastasia",
        name: "anastasia",
        logo: "Anastasia_Beverly_Hills_logo.png",
      },
      { website_name: "Ikea", name: "ikea", logo: "Ikea_logo.svg" },
      {
        website_name: "In&Out Furniture",
        name: "inandoutfurniture",
        logo: "inout.png",
      },
      { website_name: "Gc", name: "gc", logo: "gc.png" },
      {
        website_name: "DDiamonds",
        name: "ddiamonds",
        logo: "D-Diamonds-Logo-JPEG.jpg",
      },
      { website_name: "Iwatch", name: "iwatch", logo: "i-watch.png" },
      { website_name: "Azzam", name: "azzam", logo: "azzam_logo_tung.png" },
      { website_name: "currency", name: "currency", logo: "currency.png" },
      { website_name: "Gold", name: "XAU", logo: "gold.png" },
      { website_name: "Silver", name: "XAG", logo: "silver.png" },
    ];
    var email;
    var supportswebsite;
    let target = document.querySelector(".error");
    // document.querySelector("button").addEventListener("click", sendLink, false);
    document.querySelector("#login").addEventListener(
      "click",
      () => {
         email= document.querySelector("#email").value;
        var password = document.querySelector("#password").value;
        let regex = /\S+@\S+\.\S+/;
        if (!email || !password) {
          target.innerHTML =
            '<span style="color:red">Please Enter Your Credentials</span>';

          return;
        }
        if (!regex.test(email)) {
          target.innerHTML =
            '<span style="color:red">Please Enter Your Email</span>';

          return;
        }
        let obj = {
          email: email,
          password: password,
        };

        const options = {
          method: "POST",
          body: JSON.stringify(obj),
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          mode: "cors",
        };
        fetch("http://localhost:5000/account/login", options)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            chrome.tabs.query(
              { active: true, lastFocusedWindow: true },
              (tabs) => {
                let url = tabs[0].url;
                let body = document.querySelector("body");
                var link = new URL(url);
                var domain = link.hostname;
                websites.forEach((website) => {
                  if (domain.includes(website.name)) {
                    supportswebsite = "This website is supported by Notify";
                  }
                });

                body.innerHTML = `
            <div class="container">
            <img src="./logotexttt.png" class="ml-4" alt="" /><br>
            <div class="mt-3">
            <img src="${data.picture}" style="width:50px;border-radius:40px;"/> <br> <span> You're logged in as ${data.firstname} ${data.lastname}</span><br>
            <span>You're currently on <b>${domain}</b></span>
            <div class="support"></div>
            </div>
            <hr>
            
            <div class="info"></div>
            
            <button type="button" id="trackme" class="btn btn-primary mt-3 mb-3">
            Track Product on Page
          </button>

            </div>
             `;
             let tracker = document
             .querySelector("button#trackme");

             tracker.addEventListener('click',sendLink, false);
                if (supportswebsite) {
                  let info_div = document.querySelector(".info");
                  info_div.innerHTML = `<span id="check" style="color:green">${supportswebsite}</span>`;
                } else {
                  let info_div = document.querySelector(".info");
                  info_div.innerHTML = `<span id="check" style="color:red">Unfortunately, ${domain} isn't supported by Notify yet.</span>`;
                  let btn = document.querySelector("button");
                  btn.disabled = true;
                }
        
                  
              }
            );
          
          })
          .catch(() => {
            target.innerHTML =
              '<span style="color:red">Incorrect Email or Password</span>';

            return;
          });
      },
      false
    );
    function sendLink() {
      let tracker = document.querySelector("button");
     tracker.innerText='Loading...'
      
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url;
        // use `url` here inside the callback because it's asynchronous!
        const obj = {
          link: url
        };

        const options = {
          method: "POST",
          body: JSON.stringify(obj),
          headers: new Headers({
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          mode: "cors",
        };

        fetch("http://localhost:5000/find/", options)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            
            let info = document.querySelector(".info");
            tracker.remove();

            info.innerHTML = `
            <div class="notifyifsuccess"></div>
            <img src="${data.ImgSrc}" id="pic" style="width:80px" />
            <button class='btn btn-primary' class="ml-3 " id="tracknow">Track Now</button>
            `;
            let trackbtn = document.querySelector("button#tracknow");
            trackbtn.addEventListener(
              "click",
              () => {
                let info = {
                  link: url,
                  price: data.price,
                  name: data.name,
                  currency: data.currency,
                  userEmail: email,
                  image: data.ImgSrc,
                  userRequirement: 0,
                };
                const options = {
                  method: "POST",
                  body: JSON.stringify(info),
                  headers: new Headers({
                    "Content-Type": "application/json",
                    Accept: "application/json",
                  }),
                  mode: "cors",
                };
                fetch("http://localhost:5000/find/schedule", options)
                  .then(() => {
                    let pic = document.querySelector("img#pic");
                    pic.remove();
                    let btn = document.querySelector("button#tracknow");
                    btn.remove();
                    let div = document.querySelector(".notifyifsuccess");
                    div.innerHTML = `<span style="color:green">You have successfully started tracking this product.<br> 
You'll recieve an Email once the price drops.</span> `;
                  })
                  .catch(() => {
                    let div = document.querySelector(".notifyifsuccess");
                    div.innerHTML = `<span style="color:red">Tracking this product has failed.</span> `;
                  });
              },
              false
            );
          })
          .catch((errr) => {
            console.error(errr);
          });
      });
    }
  },
  false
);
