let app = angular.module("PHAPP", ["ngRoute"]);

let mActive = num => {
    window.scrollTo(0, 0);
    let nav = document.querySelectorAll('nav a');
    if (num == -1) {
        nav.forEach(function (data, count) {
            nav[count].classList.remove('active');
        });
        return;
    } else {
        nav.forEach(function (data, count) {
            nav[count].classList.remove('active');
        });
        nav[num].classList.add('active');
    }
};

let reDirect = url => {
    window.location.href = "#!/" + url;
}
let elem = el => { return document.getElementById(el); }

let mouseSlider = item => {
    /* Slider Scroll With Mouse */
    const slider = document.querySelector("#" + item);
    let isDown = false;
    let startX;
    let scrollLeft;
    slider.addEventListener("mousedown", e => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        slider.style.cursor = "grabbing";
    });
    slider.addEventListener("mouseleave", () => {
        isDown = false;
        slider.style.cursor = "default";
    });
    slider.addEventListener("mouseup", () => {
        isDown = false;
        slider.style.cursor = "grab";
    });
    slider.addEventListener("mousemove", e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX;
        slider.scrollLeft = scrollLeft - walk * 1.4;
    });
}

let goBackPage = () => {
    window.history.go(-1);
}

let cMsg = (msg) => {
    alert(msg);
};

let cartCtrlCount = 0;
let cartDisplay = () => {

    if (cartCtrlCount >= 1 && cartCtrlCount <= 9) {
        elem('cartIcon').innerHTML =
            `<span>${cartCtrlCount}</span>`;
        elem('cartIcon').classList.add('iCart');
    } else if (cartCtrlCount >= 10) {
        elem('cartIcon').innerHTML =
            `<span>9+</span>`;
        elem('cartIcon').classList.add('iCart');
    }
    else if (cartCtrlCount <= 0) {
        elem('cartIcon').innerHTML =
            `<i class="fas fa-shopping-cart"></i>`;
        elem('cartIcon').classList.remove('iCart');
    } else {
        elem('cartIcon').innerHTML =
            `<i class="fas fa-shopping-cart"></i>`;
        elem('cartIcon').classList.remove('iCart');
    }

}

cartDisplay();

let addToCartMain = () => {
    cartCtrlCount++;
    elem('cartMessage').style.display = 'block';
    cartDisplay();
    setTimeout(() => {
        elem('cartMessage').style.display = 'none';
    }, 900);
}

let checkDone = () => {
    cMsg("You have completed you purchases successfully!");
    window.location.href = '#!/';
    window.location.reload();
}



app.config($routeProvider => {
    $routeProvider
        .when('/', {
            templateUrl: "pages/home.html",
            controller: "homeCtrl"
        })
        .when('/search', {
            templateUrl: "pages/search.html",
            controller: "searchCtrl"
        })
        .when('/cart', {
            templateUrl: "pages/cart.html",
            controller: "cartCtrl"
        })
        .when('/user', {
            templateUrl: "pages/myProfile.html",
            controller: "userCtrl"
        })
        .when('/settings', {
            templateUrl: "pages/settings.html",
            controller: "settingsCtrl"
        })
        .when('/notification', {
            templateUrl: "pages/notifications.html",
            controller: "notiCtrl"
        })
        .when('/product/:num', {
            templateUrl: "pages/prodOpen.html",
            controller: "prodCtrl"
        })
        .when('/searchRes/:text', {
            templateUrl: "pages/searchRes.html",
            controller: "sResCtrl"
        })
        .when('/category/:text', {
            templateUrl: "pages/categories.html",
            controller: "categoriesCtrl"
        })
        .when('/reorder', {
            templateUrl: "pages/reorder.html",
            controller: "reorderCtrl"
        })
        .otherwise({
            template: `<div class='content'>
            <h2 class='text-center mt30 errmmm' style='font-weight: 900; color: #252525; font-size: 1rem; text-transform: capitalize'>
                <p style='font-size: 4rem'>🤨🙄</p>
                <br />  
                <br />  
                What the folk
                are you doing here ??
                <br />
                <p class='gbsim' style="font-size: 1.2rem;position: fixed; bottom: 80px; left: 20px; color: #252525; text-transform: capitalize; font-weight: 900;">
                    👇 Go back simon ! 🙌
                </p>
            </h2>
            `,
            controller: "errorPage"
        })
});

app.controller('homeCtrl', function () {
    mActive(0);

    mouseSlider("sliderImage");
    mouseSlider("medSlider");


});
app.controller('searchCtrl', function () {
    mActive(1);
    elem('txtSearch').focus();


});
app.controller('sResCtrl', function ($routeParams) {
    mActive(1);

    elem('searchVar').innerHTML = $routeParams.text;
    elem('dynamicSample').innerHTML = $routeParams.text;

});
app.controller('categoriesCtrl', function ($routeParams) {
    mActive(1);

    elem('resultTxt').innerHTML = $routeParams.text;

});
app.controller('userCtrl', function () {
    mActive(2);



});

app.controller('cartCtrl', function () {
    mActive(3);

    let cartItemTemp = `
    <div class="cItems">
        <button class="closeBtn"><i class="fas fa-minus"></i></button>
        <img
        src="https://images1.livehindustan.com/uploadimage/library/2018/03/15/16_9/16_9_1/sample_of_medicine_1521107534.jpg"
        alt="B-12B"
        />
        <div class="conn">
        <h3>
            B-12B is the medicine for the people suffering from the corona virus
        </h3>
        <p class="desccc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            blanditiis sapiente quisquam facere voluptas excepturi doloribus minima
            impedit, consectetur veritatis tempora rerum, quam numquam. Dignissimos
            pariatur ratione doloribus ullam sit!
        </p>
        <p class="price">₹40.00 <span>₹80.00</span></p>
        <span class="tog">
            <label>Quantity: </label>
            <input type="number" value="1" />
        </span>
        </div>
    </div>
    `;
    let cartCheckoutTemp = (price) => {
        return `
    <p class="price sm-text">
        <strong>Grand Total :</strong>
        ₹${price}
    </p>
    <button class="ripple" onclick="checkDone()">
        Checkout &nbsp; <i class="fas fa-chevron-right"></i>
    </button>
    `
    };

    if (cartCtrlCount >= 1) {
        elem('itemsCont').innerHTML = '';
        for (let count = 0; count <= cartCtrlCount - 1; count++) {
            elem('itemsCont').innerHTML += cartItemTemp;
        }
        let gPrice = 40 * cartCtrlCount;
        elem('checkoutInn').innerHTML = cartCheckoutTemp(parseFloat(gPrice).toFixed(2));
    } else {
        elem('itemsCont').innerHTML = `
        <p class="pageErrorSM">No items in your cart</p>
        `;
    }



});
app.controller('settingsCtrl', function () {
    mActive(4);

});
app.controller("errorPage", function () {
    mActive(-1);

});
app.controller("notiCtrl", function () {
    mActive(-1);

});
app.controller("prodCtrl", function ($scope, $routeParams) {
    mActive(-1);
    let prodID = $routeParams.num;
    let countItem = 0;

    let countCart = () => {
        if (countItem == 0) {
            elem('countReal').style.display = 'none';
        } else if (countItem >= 1) {
            elem('countReal').style.display = 'flex';
            elem('countReal').innerHTML = parseInt(countItem);
        } else {
            elem('countReal').style.display = 'none';
        }
    }

    countCart();

    $scope.addCart = function () {
        countItem++;
        countCart();
    };

});
app.controller("reorderCtrl", function () {
    mActive(-1);

});