function calculateScore() {
    const form = document.getElementById('quizform');
    const resultbox = document.getElementById('resultbox');
    let score = 0;

    for (let i = 1; i <= 6; i++) {
        const options = document.getElementsByName(`q${i}`);
        options.forEach(option => {
            if (option.checked) {
                score += parseInt(option.value);
            }
        });
    }

    let feedback = '';
    if (score === 2) {
        feedback = '🌟 Kamu Si Bijak Digital! Tetap tabayun dan hindari ghibah!';
    } else if (score === 1) {
        feedback = '👏🏻 Hampir Bijak, tapi masih perlu belajar lebih hati-hati!';
    } else {
        feedback = '🫵🏼 Ups! Yuk belajar saring sebelum sharing!';
    }

    resultbox.innerText = `skor kamu: ${score}/6\n${feedback}`;
    resultbox.style.display = 'block';
}