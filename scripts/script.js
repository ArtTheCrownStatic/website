document.addEventListener("DOMContentLoaded", () => {
    console.log("Script is linked correctly!");

    const boxes = document.querySelectorAll(".gift-box");
    const panels = document.querySelectorAll(".panel");
    const panelContainer = document.querySelector(".panel-container");
    const loader = document.querySelector(".loader");
    const mainContainer = document.querySelector(".main-container");
    const proceedButton = document.querySelector(".proceed-button");
    const voiceMessages = document.querySelectorAll(".voice-message");

    // Map voice messages to specific audio files
    const audioFiles = {
        vm1: "/website/assets/VMS/TheCherryChair.m4a",
        vm2: "/website/assets/VMS/helena_1564.m4a",
        vm3: "/website/assets/VMS/Emerald.opus",
        vm4: "/website/assets/VMS/Fallen.aac",
        vm5: "/website/assets/VMS/Ayu.mp3",
        vm6: "/website/assets/VMS/auri.m4a",
        vm7: "/website/assets/VMS/arthur.m4a",
        vm8: "/website/assets/VMS/Reds.mp3",
        vm9: "/website/assets/VMS/Dragoncy.aac",
        vm10: "/website/assets/VMS/theicepeer.mp3",
        vm11: "/website/assets/VMS/Ahana.mp3",
    };


    let currentAudio = null;

    // Function to handle voice message click
    function playVoiceMessage(voiceMessage) {
        const vmId = voiceMessage.classList[1]; // Get the vmX class (e.g., vm1, vm2)
        const audioFile = audioFiles[vmId];

        if (!audioFile) return;

        // Stop and clean up the current playing audio if any
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            document.querySelector(".voice-message.active")?.classList.remove("active");
        }

        // Add active class to the clicked voice message
        voiceMessage.classList.add("active");

        // Play the audio
        currentAudio = new Audio(audioFile);
        currentAudio.play();

        // Remove the active class when the audio ends
        currentAudio.addEventListener("ended", () => {
            voiceMessage.classList.remove("active");
            currentAudio = null; // Reset current audio
        });
    }

    // Attach click event listeners to voice messages
    voiceMessages.forEach((voiceMessage) => {
        voiceMessage.addEventListener("click", () => playVoiceMessage(voiceMessage));
    });

    // Attach click event listeners to each box
    boxes.forEach((box, index) => {
        box.addEventListener("click", (event) => {
            event.stopPropagation(); // Prevent the click from propagating to the document
            panelContainer.classList.add("active");
        });
    });

    // Attach a click event listener to the document to deactivate panels
    document.addEventListener("click", (event) => {
        if (!event.target.closest(".panel")) {
            panelContainer.classList.remove("active");
        }
    });

    // Handle proceed button click
    proceedButton.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        loader.classList.remove("active"); // Remove active from loader
        mainContainer.classList.add("active"); // Add active to main container
    });
});
