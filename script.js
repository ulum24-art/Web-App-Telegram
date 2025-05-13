// Example for potential future interaction
document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Button clicked!');
    });
});

//script jquery
$(()=>{
    let h = $(window).height();
    let w = $(window).width();

    $("#menu-discuss").click(()=>{
        $(".section1").hide();
        $(".section2").hide();
        $(".section3").hide();
        $(".section4").show();
        $(".section5").hide();
        menuIndikator("discuss");
       
    })

    $("#menu-tugas").click(()=>{
        $(".section1").hide();
        $(".section2").hide();
        $(".section3").show();
        $(".section4").hide();
        $(".section5").hide();
        menuIndikator("tugas");
    })

    $("#menu-home").click(()=>{
        $(".section1").show();
        $(".section2").show();
        $(".section3").hide();
        $(".section4").hide();
        $(".section5").hide();
        menuIndikator("home");
    })

    $("#menu-video").click(()=>{
        $(".section1").hide();
        $(".section2").hide();
        $(".section3").hide();
        $(".section4").hide();
        $(".section5").show();
        menuIndikator("video")
    })

    function menuIndikator(menu){
        $("#footer li").removeClass("active");

    if(menu == "home") {
        $("#menu-home").closest("li").addClass("active");
        $("body").css("background-color","#00FFFF");
    } else if(menu == "tugas") {
        $("#menu-tugas").closest("li").addClass("active");
        $("body").css("background-color","white");
    } else if(menu == "discuss") {
        $("#menu-discuss").closest("li").addClass("active");
        $("body").css("background-color","black");
    } else if(menu == "video") {
        $("#menu-video").closest("li").addClass("active");
        $("body").css("background-color", "white");
    }
    }
})

let currentQuestionsIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let userData = {};

const questions = [
    {questions: "Ghibah adalah perbuatan yang dilakukan dengan cara?", answers: ["Menyampaikan nasihat dengan baik", "Membicarakan keburukan orang lain tanpa sepengetahuannya", "Mengklarifikasi berita yang belum jelas", "Berdiskusi secara terbuka dan jujur"], correct: 1},
    {questions: "Tabayun artinya?", answers: ["Menyampaikan berita kepada orang banyak", "Menyaring informasi yang masuk", "Menyampaikan informasi secara sembunyi-sembunyi", "Mencari kejelasan atau klarifikasi atas suatu informasi"], correct: 3},
    {questions: "Hukum ghibah dalam Islam adalah?", answers: ["Wajib", "Sunnah", "Makruh", "Haram"], correct: 3},
    {questions: "Tabayun termasuk akhlak?", answers: ["Tercela", "Terpuji", "Netral", "Tidak penting"], correct: 1},
    {questions: "Perilaku ghibah paling sering terjadi ketika seseorang?", answers: ["Beribadah bersama", "Belajar di kelas", "Berkumpul dan membicarakan orang lain", "Membaca Al-Qur’an"], correct: 2},
    {questions: "Contoh tabayun dalam kehidupan sehari-hari adalah?", answers: ["Langsung marah setelah dengar gosip", "Bertanya kepada orang yang bersangkutan sebelum menyimpulkan sesuatu", "Menyebarkan kabar dengan cepat", "Membuat status sindiran di media sosial"], correct: 1},
    {questions: "Ghibah bisa menimbulkan?", answers: ["Persahabatan", "Rasa syukur", "Permusuhan", "Kepercayaan"], correct: 2},
    {questions: "Salah satu cara menghindari ghibah adalah?", answers: ["Ikut dalam semua percakapan teman", "Mengalihkan pembicaraan ke hal yang positif", "Menyimpan cerita teman sebagai rahasia", "Menasihati orang lain secara diam-diam"], correct: 1},
    {questions: "Tabayun bisa membantu kita untuk?", answers: ["Menang dalam berdebat", "Menilai orang lain lebih cepat", "Menghindari kesalahpahaman", "Menghindari orang yang tidak disukai"], correct: 2},
    {questions: "Sikap yang tidak sesuai dengan tabayun adalah?", answers: ["Mendengarkan dua belah pihak", "Menanyakan kejelasan pada sumber langsung", "Menyimpulkan sendiri tanpa bertanya", "Tidak langsung percaya pada informasi"], correct: 2},
    {questions: "Jika kamu melihat status media sosial teman yang menyindir seseorang, sikapmu sebaiknya?", answers: ["Langsung balas dengan sindiran juga", "Menyebarkan status itu ke teman lain", "Menanyakan maksudnya secara baik-baik", "Abaikan dan diam saja"], correct: 2},
    {questions: "Ketika mendengar kabar negatif tentang temanmu, kamu seharusnya?", answers: ["Menyebarkan kabar tersebut agar semua tahu", "Langsung marah pada temanmu", "Bertanya kepada yang menyebarkan kabar", "Mencari tahu kebenarannya dari orang yang bersangkutan"], correct: 3},
    {questions: "Salah satu akibat negatif dari ghibah adalah?", answers: ["Hilangnya rasa saling percaya", "Menjadi lebih populer", "Meningkatkan solidaritas", "Menambah pahala"], correct: 0},
    {questions: "Dalam situasi ujian, kamu mendengar kabar bahwa akan ada pengawas galak. Sikapmu yang tepat adalah?", answers: ["Menyebarkan kabar ke semua teman", "Tabayun kepada guru atau wali kelas", "Membuat status lucu tentang hal itu", "Menyebar meme tentang guru tersebut"], correct: 1},
    {questions: "Kamu melihat temanmu menangis karena merasa disindir. Tindakan yang menunjukkan akhlak baik adalah?", answers: ["Ikut menertawakannya", "Menghindari semua yang terlibat", "Membela teman yang menyindir", "Menanyakan kebenaran dan menenangkan yang bersangkutan"], correct: 3},
    {questions: "Dalam situasi tertentu, ghibah bisa dianggap bukan ghibah jika?", answers: ["Disampaikan untuk meminta nasihat kepada orang yang tepat", "Dilakukan secara bercanda", "Bertujuan mempermalukan orang", "Disampaikan kepada banyak orang"], correct: 0},
    {questions: "Seseorang dianggap melakukan tabayun jika?", answers: ["Langsung percaya pada berita yang disebar", "Memperkeruh suasana dengan opini sendiri", "Menyebarkan informasi setelah klarifikasi", "Menyebar info tanpa menyebut nama"], correct: 2},
    {questions: "Dalam kelompok diskusi, kamu mendengar tuduhan tanpa bukti. Tindakanmu yang benar adalah?", answers: ["Menyuruh teman membuktikan kebenarannya", "Menghindar dari diskusi", "Membela teman tanpa tahu kebenarannya", "Mendukung orang yang menuduh"], correct: 0},
    {questions: "Jika kamu menerima informasi buruk tentang gurumu di media sosial, kamu harus?", answers: ["Klarifikasi langsung ke guru atau wali kelas", "Diam saja tanpa peduli", "Langsung menyebarkan ke grup kelas", "Tanya ke teman yang lain"], correct: 0},
    {questions: "Salah satu alasan mengapa kita harus menghindari ghibah adalah?", answers: ["Agar jadi lebih tahu tentang teman", "Menjaga pertemanan tetap hangat", "Agar lebih seru saat ngobrol", "Menjaga kehormatan orang lain"], correct: 3},
];

document.getElementById("submit-btn").addEventListener("click", function(){
    let Nama = document.getElementById("nama").value;
    let Kelas = document.getElementById("kelas").value;
    let noAbsen = document.getElementById("noabsen").value;
    if (Nama && Kelas && noAbsen) {
        document.getElementById("start").style.display = "none";
        document.getElementById("soal").style.display = "block";
        document.getElementById("nav-buttons").style.display = "block";
        correctAnswers = 0;
        wrongAnswers = 0;
        currentQuestionsIndex = 0;
        loadQuestion();
    }
});

function loadQuestion () {
    hasAnswered = false;
    let q = questions[currentQuestionsIndex];
    document.getElementById("question").textContent = (currentQuestionsIndex + 1) + ". " + q.questions;
    let answerButtons = document.getElementById("answer");
    answerButtons.innerHTML = "";
    q.answers.forEach((answer, index) => {
        let button = document.createElement("button");
        button.innerText = answer;
        button.onclick = () => selectAnswer(index);
        answerButtons.appendChild(button);
    });
    if (userData[currentQuestionsIndex] !== undefined) {
        let selected = userData[currentQuestionsIndex];
        answerButtons.children[selected].classList.add("selected");
    }
    updateProgress();
}

function selectAnswer(index) {
    let q = questions[currentQuestionsIndex];
    let buttons = document.getElementById("answer").children;
    for (let i = 0; i < buttons.length; i++) {
        buttons [i].classList.remove("selected");
    }
    buttons[index].classList.add("selected");
    userData[currentQuestionsIndex] = index;
}

function next() {
    let selected = userData[currentQuestionsIndex];

    let q = questions[currentQuestionsIndex];
    if (selected !== undefined) {
        if (selected === q.correct) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
    }

    if (questions[currentQuestionsIndex + 1] !== undefined) {
        currentQuestionsIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function previous() {
    if (currentQuestionsIndex > 0) {
        currentQuestionsIndex--;
        loadQuestion();
    }
}

function updateProgress() {
    let progress = ((currentQuestionsIndex + 1) / questions.length) * 100;
    document.getElementById("progress").style.backgroundColor = "green";
    document.getElementById("progress").style.width = `${progress}%`;
}

function showResult() {
    correctAnswers = 0;
    wrongAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
        let selected = userData[i];
        if (selected === questions[i].correct) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
    }
    document.getElementById("soal").style.display = "none";
    document.getElementById("result").style.display = "block";
    document.getElementById("nav-buttons").style.display ="none";
    document.getElementById("res-nama").textContent = document.getElementById("nama").value;
    document.getElementById("res-kelas").textContent = document.getElementById("kelas").value;
    document.getElementById("res-noabsen").textContent = document.getElementById("noabsen").value;
    document.getElementById("score").textContent = Math.round((correctAnswers / questions.length) * 100);
    document.getElementById("correct").textContent = correctAnswers;
    document.getElementById("wrong").textContent = wrongAnswers;
}

function goHome() {
    window.location.href = "/Asset/Component/Asesmen 1.html";
}

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

if (window.Telegram.WebApp) {
    Telegram.WebApp.ready();
    Telegram.WebApp.BackButton
        .onClick(() => {
            Telegram.WebApp.close();
        })
        .show();
}
