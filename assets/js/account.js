document.addEventListener("DOMContentLoaded", function () {


    // Sidebar Tab Switching

    const menuItems = document.querySelectorAll(".sidebar ul li[data-tab]");
    const tabs = document.querySelectorAll(".tab-content");

    menuItems.forEach(item => {

        item.addEventListener("click", function () {

            menuItems.forEach(i => i.classList.remove("active"));
            this.classList.add("active");

            const tab = this.dataset.tab;

            tabs.forEach(content => {
                content.classList.remove("active");
            });

            document.getElementById(tab).classList.add("active");

        });

    });


    // Save Account Settings

    const settingsForm = document.querySelector("#settings form");

    if (settingsForm) {

        settingsForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const inputs = settingsForm.querySelectorAll("input");

            const user = {
                name: inputs[0].value,
                email: inputs[1].value,
                phone: inputs[2].value
            };

            localStorage.setItem("ecobazarUser", JSON.stringify(user));

            showToast("Profile updated successfully!");

        });

    }


    // Load Saved User

    const savedUser = JSON.parse(localStorage.getItem("ecobazarUser"));

    if (savedUser) {

        document.querySelector(".profile h4").textContent = savedUser.name;

        const inputs = document.querySelectorAll("#settings input");

        if (inputs.length >= 3) {
            inputs[0].value = savedUser.name;
            inputs[1].value = savedUser.email;
            inputs[2].value = savedUser.phone;
        }

    }


    // Edit Profile

    const editBtn = document.querySelector(".profile button");

    if (editBtn) {

        editBtn.addEventListener("click", function () {

            const settingsTab = document.querySelector('[data-tab="settings"]');

            settingsTab.click();

        });

    }


    // Logout Confirmation

    const logout = document.querySelector('.sidebar a[href="index.html"]');

    if (logout) {

        logout.addEventListener("click", function (e) {

            const ok = confirm("Are you sure you want to logout?");

            if (!ok) {
                e.preventDefault();
            }

        });

    }

    // Dashboard Counter Animation

    const counters = document.querySelectorAll(".dashboard-card h3");

    counters.forEach(counter => {

        const target = Number(counter.innerText);

        let current = 0;

        const timer = setInterval(() => {

            current++;

            counter.innerText = current;

            if (current >= target) {

                clearInterval(timer);

            }

        }, 60);

    });

    // Toast Notification

    function showToast(message) {

        let toast = document.createElement("div");

        toast.className = "account-toast";

        toast.innerHTML = `
            <i class="fa-solid fa-circle-check"></i>
            ${message}
        `;

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

    // Dark Mode

    const darkBtn = document.createElement("button");

    darkBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';

    darkBtn.className = "dark-btn";

    document.body.appendChild(darkBtn);

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    darkBtn.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });

});