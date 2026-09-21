export function showMessage(container, message, type = "info") {
    container.innerHtml = "";

    const messageElement = document.createElement("p");

    messageElement.classList.add("status-message", type);

    messageElement.textContent = message;

    container.appendChild(messageElement)
}