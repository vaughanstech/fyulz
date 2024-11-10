document
  .getElementById("open-file-picker")
  .addEventListener("click", async () => {
    const filePaths = await window.electron.openFilePicker();

    const filePathElement = document.getElementById("file-path");
    if (filePaths.length > 0) {
      filePathElement.textContent = `Selected file: ${filePaths[0]}`;
    } else {
      filePathElement.textContent = "No file selected";
    }
  });
