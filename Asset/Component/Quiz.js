const scenarios = [
    {
        text: `<strong>Percakapan:</strong><br>
        <em>Nina</em>: "Kamu tahu si Dira katanya suka bolos, ya?"<br>
        <em>Raya</em>: "Kamu denger dari siapa?"<br>
        <em>Nina</em>: "Temennya sendiri kok yang bilang."<br>
        <em>Raya</em>: "Tapi kita udah tanya Dira langsung belum?"`,
        answers: {
            'Nina': 'Ghibah',
            'Raya': 'Tabayun'
        }
    },
    {
        text: `<strong>Percakapan</strong><br>
        <em>Andi</em>: "Eh jangan main sama Riko deh, katanya kemarin nyolong di kantin."<br>
        <em>Lala</em>: "Kamu lihat sendiri? Atau cuma denger aja?"<br>
        <em>Andi</em>: "Denger dari temen yang katanya lihat."<br>
        <em>Lala</em>: "Yuk kita tanya langsung ke Riko besok."<br>`,
        answers: {
            'Andi': 'Ghibah',
            'Lala': 'Tabayun'
        }
    },
    {
        text: `<strong>Percakapan</strong><br>
        <em>Tono</em>: "Kakak kelas kita DO karena nilainya jelek semua."<br>
        <em>Sari</em>: "Masa sih? Kamu tahu dari mana?"<br>
        <em>Tono</em>: "Ada yang lihat surat DO-nya katanya."<br>
        <em>Sari</em>: "Jangan percaya gitu aja, kita cari tahu bener nggak."<br>`,
        answers: {
            'Tono': 'Ghibah',
            'Sari': 'Tabayun'
        }
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadScenario() {
    const s = scenarios[currentQuestionIndex];
    document.getElementById('scenario').innerHTML = s.text;
    const optionsBox = document.getElementById('options');
    const result = document.getElementById('result');
    result.innerText = '';
    optionsBox.innerHTML = '';

    Object.keys(s.answers).forEach(name => {
        const btn = document.createElement('button');
        btn.innerText = name;
        btn.className = 'option-btn';
        btn.onclick = () => checkAnswer(name, btn);
        optionsBox.appendChild(btn);
    });
}

function checkAnswer(selected) {
    const role = scenarios[currentQuestionIndex].answers[selected];
    const result = document.getElementById('result');
    const allButtons = document.querySelectorAll('.option-btn');

    allButtons.forEach(btn => {
        const name = btn.innerText;
        btn.disabled = true;

        // Beri warna sesuai benar/salah
        if (scenarios[currentQuestionIndex].answers[name] === 'Tabayun') {
            btn.classList.add('correct');
        } else {
            btn.classList.add('incorrect');
        }
    });

    if (!scenarios[currentQuestionIndex].answered) {
        if (role === 'Tabayun') {
            result.innerText = `✅ Benar! ${selected} sedang tabayun.`;
            score++;
        } else {
            result.innerText = `❌ Ups! ${selected} sedang ber-ghibah.`;
        }
        scenarios[currentQuestionIndex].answered = true;
    }
}

function nextScenario() {
    currentQuestionIndex++;
    if (currentQuestionIndex < scenarios.length) {
        loadScenario();
    } else {
        showResult();
    }
}

function showResult() {
    let message = '';
    let emoji = '';
    let bgColor = '';
    
    const scorePercent = (score / scenarios.length) * 100;

    if (scorePercent === 100) {
        message = '🥳 Keren! Kamu Detektif Tabayun Hebat!';
        emoji = '🎉🎉🎉';
        bgColor = '#D4EDDA';
    } else if (scorePercent >= 60) {
        message = '😎 Lumayan! Tapi masih bisa lebih tabayun lagi~';
        emoji = '👍✨';
        bgColor = '#FFF3CD';
    } else {
        message = '😅 Ups, kamu harus latihan lagi mengenali ghibah!';
        emoji = '💤📚';
        bgColor = '#F8D7DA';
    }

    document.getElementById("quiz-container").innerHTML = `
        <div style="background-color:${bgColor}; padding: 30px; border-radius: 15px; text-align: center; animation: bounceIn 1s;">
            <h2 style="animation: tada 1s infinite alternate;">${emoji}</h2>
            <h2>Detektif Tabayun: Siapa yang Ghibah?</h2>
            <p style="font-size: 1.2em;"><strong>${message}</strong></p>
            <p style="font-size: 1.5em;">Skor Akhir Kamu: <strong>${score} / ${scenarios.length}</strong></p>
            <button onclick="goToMenu()" class="btn">Selesai</button>
        </div>
    `;
}

function goToMenu() {
    window.location.reload("Quiz.html");
}

window.onload = function () {
    currentQuestionIndex = 0;
    score = 0;
    loadScenario();
};
