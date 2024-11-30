function updateLoadingBar(progress) {
    const loadingBar = document.getElementById('loading-bar');
    loadingBar.style.width = progress + '%';
}

function hideLoadingBar() {
    const loadingContainer = document.getElementById('loading-container');
    loadingContainer.style.visibility = 'hidden';
}

function showStartButton() {
    const startButton = document.getElementById('start-button');
    const infoScreen = document.getElementById('info-screen');

    startButton.style.display = 'block';  
    infoScreen.style.display = 'block';  
}

function checkLoadingComplete() {
    if (loadedModels === totalModels) {
        hideLoadingBar();
        showStartButton();
    }
}