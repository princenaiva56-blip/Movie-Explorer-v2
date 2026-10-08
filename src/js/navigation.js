const menuToggle = document.querySelector(".menu-toggle");
const closeMenu = document.querySelector(".close-menu");
const mobileSidebar = document.querySelector(".mobile-sidebar");
const sidebarOverlay = document.querySelector(".sidebar-overlay");

menuToggle.addEventListener("click", () => {
    mobileSidebar.classList.add("active");
    sidebarOverlay.classList.add("active");
});

function closeNavigation() {
    mobileSidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");
}

closeMenu.addEventListener("click", closeNavigation);
sidebarOverlay.addEventListener("click", closeNavigation);