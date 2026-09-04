const status = document.querySelector("#page-status");
const cartCount = document.querySelector(".count");
const productModalElement = document.querySelector("#product-modal");
const productModal = new bootstrap.Modal(productModalElement);
let cartItems = Number(cartCount.textContent) || 0;

const announce = (message) => {
    status.textContent = "";
    window.setTimeout(() => {
        status.textContent = message;
    }, 20);
};

const productName = (card) => card.querySelector("h4")?.textContent.trim() || "product";

const addToCart = (card) => {
    cartItems += 1;
    cartCount.textContent = cartItems;
    announce(`${productName(card)} was added to your cart. ${cartItems} items are now in the cart.`);
};

const makeKeyboardAccessible = (element, label, handler) => {
    element.setAttribute("role", "button");
    element.tabIndex = 0;
    element.setAttribute("aria-label", label);
    element.addEventListener("click", handler);
    element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handler();
        }
    });
};

document.querySelectorAll(".products_box").forEach((card) => {
    const name = productName(card);
    const image = card.querySelector("img");
    if (image) image.alt = name;

    const cartControl = card.querySelector(".products_cart");
    if (cartControl) {
        const icon = cartControl.querySelector("i");
        if (icon) icon.className = "fa-solid fa-cart-shopping";
        makeKeyboardAccessible(cartControl, `Add ${name} to cart`, () => addToCart(card));
    }

    const actions = card.querySelectorAll(".eye_love > div");
    const favourite = actions[0];
    const quickView = actions[1];
    if (favourite) {
        let saved = false;
        favourite.setAttribute("aria-pressed", "false");
        makeKeyboardAccessible(favourite, `Add ${name} to wishlist`, () => {
            saved = !saved;
            favourite.setAttribute("aria-pressed", String(saved));
            favourite.setAttribute("aria-label", `${saved ? "Remove" : "Add"} ${name} ${saved ? "from" : "to"} wishlist`);
            const icon = favourite.querySelector("i");
            if (icon) icon.className = saved ? "fa-solid fa-heart" : "fa-regular fa-heart";
            announce(`${name} ${saved ? "was added to" : "was removed from"} your wishlist.`);
        });
    }
    if (quickView) {
        makeKeyboardAccessible(quickView, `Quick view ${name}`, () => {
            document.querySelector("#product-modal-title").textContent = name;
            document.querySelector("#product-modal-body").textContent = `Quick preview for ${name}. Select Add to cart to include it in your cart.`;
            productModal.show();
        });
    }
});

document.querySelectorAll("[data-product-search]").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = new FormData(form).get("q").trim().toLowerCase();
        const cards = [...document.querySelectorAll(".products_box")];
        const matches = cards.filter((card) => productName(card).toLowerCase().includes(query));
        cards.forEach((card) => {
            card.hidden = query.length > 0 && !matches.includes(card);
        });
        document.querySelectorAll("[data-product-search] input").forEach((input) => {
            input.value = query;
        });
        if (!query) {
            announce("All products are visible.");
            return;
        }
        announce(`${matches.length} product${matches.length === 1 ? "" : "s"} found for ${query}.`);
        matches[0]?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});

document.querySelectorAll(".popular_header button").forEach((button) => {
    button.type = "button";
    button.addEventListener("click", () => {
        const section = button.closest("section");
        section?.scrollIntoView({ behavior: "smooth", block: "start" });
        announce(`All ${section.querySelector("h1").textContent.trim().toLowerCase()} are shown on this page.`);
    });
});

document.querySelectorAll("[data-shop-now]").forEach((button) => {
    button.addEventListener("click", () => {
        document.querySelector("#featured-products").scrollIntoView({ behavior: "smooth", block: "start" });
        announce("Featured products are ready to browse.");
    });
});

document.querySelectorAll("[data-notice]").forEach((button) => {
    button.addEventListener("click", () => announce(button.dataset.notice));
});

document.querySelector("[data-header-favorite]").addEventListener("click", () => {
    announce("Your wishlist is empty. Use a product heart to add an item.");
});

document.querySelector("[data-view-cart]").addEventListener("click", () => {
    announce(`Your cart contains ${cartItems} item${cartItems === 1 ? "" : "s"}.`);
});

document.querySelectorAll("[data-testimonial-direction]").forEach((button) => {
    button.addEventListener("click", () => {
        const cards = [...document.querySelectorAll(".review_box")];
        const target = button.dataset.testimonialDirection === "next" ? cards[1] : cards.at(-1);
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
});

document.querySelectorAll(".latest_box img").forEach((image) => {
    image.alt = `Article: ${image.closest(".latest_box").querySelector(".latest_para").textContent.trim()}`;
});
document.querySelectorAll(".review_box").forEach((card) => {
    const image = card.querySelector("img");
    if (image) image.alt = card.querySelector(".user_review p").textContent.trim();
});
document.querySelectorAll(".instagram_container img").forEach((image, index) => {
    image.alt = `Instagram post ${index + 1}`;
});

document.querySelectorAll(".social span").forEach((social) => {
    makeKeyboardAccessible(social, "Social media link", () => announce("Social links are not connected in this static demo."));
});
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    if (!form.checkValidity()) {

        e.stopPropagation();

        form.classList.add("was-validated");

        return;

    }

    const spinner = document.getElementById("spinner");

    const btnText = document.getElementById("btnText");

    spinner.classList.remove("d-none");

    btnText.innerHTML = "Sending...";

    setTimeout(() => {

        spinner.classList.add("d-none");

        btnText.innerHTML = "Send Message";

        alert("✅ Your message has been sent successfully!");

        form.reset();

        form.classList.remove("was-validated");

    }, 2000);

});

const cards = document.querySelectorAll(".team-card");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, { threshold: .2 });

cards.forEach(card => {

    observer.observe(card);

});

document.querySelector("[data-newsletter-form]").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const email = new FormData(form).get("email");
    form.reset();
    announce(`${email} has been subscribed to the newsletter.`);
});

// Back To Top

const topBtn = document.getElementById("topBtn");

topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

// Smooth scrolling

document.querySelectorAll('footer a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
