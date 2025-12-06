const testarDownloadButton = document.getElementById('testar-download');
const testarUploadButton = document.getElementById('testar-upload');
const resultadosDiv = document.getElementById('resultados');

testarDownloadButton.addEventListener('click', () => {
    const startTime = performance.now();
    fetch('https://example.com')
        .then(response => response.blob())
        .then(blob => {
            const endTime = performance.now();
            const elapsedTime = (endTime - startTime) / 1000;
            const fileSize = blob.size;
            const downloadSpeed = fileSize / elapsedTime;
            resultadosDiv.innerHTML = `Velocidade de Download: ${downloadSpeed.toFixed(2)} MB/s`;
        })
        .catch(error => console.error('Erro ao testar download:', error));
});

testarUploadButton.addEventListener('click', () => {
    const startTime = performance.now();
    const formData = new FormData();
    formData.append('file', new Blob(['A'.repeat(1024 * 1024)])); // 1MB de dados
    fetch('https://example.com/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const endTime = performance.now();
        const elapsedTime = (endTime - startTime) / 1000;
        const fileSize = data.fileSize;
        const uploadSpeed = fileSize / elapsedTime;
        resultadosDiv.innerHTML = `Velocidade de Upload: ${uploadSpeed.toFixed(2)} MB/s`;
    })
    .catch(error => console.error('Erro ao testar upload:', error));
});
