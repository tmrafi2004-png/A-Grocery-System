document.addEventListener("DOMContentLoaded", function () {

    

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
//------------

    document.querySelectorAll('.help-navigation a').forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            }

        });

    });


    const search = document.getElementById("searchHelp");

    if (search) {

        search.addEventListener("keyup", function () {

            const keyword = this.value.toLowerCase();

            document.querySelectorAll(".accordion-item").forEach(item => {

                const text = item.innerText.toLowerCase();

                if (text.includes(keyword)) {

                    item.style.display = "block";

                } else {

                    item.style.display = "none";

                }

            });

        });

    }


    const sections = document.querySelectorAll(".help-card,.content-box,.support-card");

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .2

    });

    sections.forEach(section => {

        section.style.opacity = "0";

        section.style.transform = "translateY(50px)";

        section.style.transition = ".6s";

        observer.observe(section);

    });


    const navLinks = document.querySelectorAll(".help-navigation a");

    window.addEventListener("scroll", function () {

        let current = "";

        document.querySelectorAll(".help-section").forEach(section => {

            const top = section.offsetTop - 120;

            if (window.scrollY >= top) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active-link");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active-link");

            }

        });

    });



    const chatBtn = document.querySelector(".support-card .btn");

    if (chatBtn) {

        chatBtn.addEventListener("click", function () {

            showToast("💬 Live Chat feature will be available soon.");

        });

    }


    function showToast(message) {

        const toast = document.createElement("div");

        toast.className = "help-toast";

        toast.innerHTML = message;

        document.body.appendChild(toast);

        setTimeout(() => {

            toast.classList.add("show");

        }, 100);

        setTimeout(() => {

            toast.classList.remove("show");

            setTimeout(() => {

                toast.remove();

            }, 300);

        }, 3000);

    }

});