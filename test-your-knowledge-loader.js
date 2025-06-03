document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit-btn");
    const emailInput = document.getElementById("email-input");
    const errorMsg = document.getElementById("error-msg");
    const gameContainerDiv = document.getElementsByTagName("body")[0];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    submitBtn.addEventListener("click", () => {
        const email = emailInput.value.trim();

        if (!emailRegex.test(email)) {
            errorMsg.textContent = "Please enter a valid email address.";
            return;
        }

        // Clear error and form
        errorMsg.textContent = "";
        document.getElementById("email-form").style.display = "none";

        // Create and add the game container
        const gameContainer = document.createElement("app-game-container");
        gameContainer.id = "Q0001";
        gameContainer.setAttribute("email", email);
        gameContainerDiv.appendChild(gameContainer);
    });

})