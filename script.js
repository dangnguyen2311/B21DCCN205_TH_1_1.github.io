function startExam(event) {
    event.preventDefault();

    const hoten = document.getElementById('hoten').value;
    const dob = document.getElementById('dob').value;
    const maSV = document.getElementById('maSV').value;
    const lop = document.getElementById('lop').value;

    localStorage.setItem('hoten', hoten);
    localStorage.setItem('dob', dob);
    localStorage.setItem('maSV', maSV);
    localStorage.setItem('lop', lop);

    window.location.href = 'Thi.html';
}



document.addEventListener('DOMContentLoaded', function() {
    const hoten = localStorage.getItem('hoten');
    const maSV = localStorage.getItem('maSV');
    const lop = localStorage.getItem('lop');

    document.getElementById('hien_ten').textContent = 'Họ tên: ' + hoten;
    document.getElementById('hien_ma_lop').textContent ='Mã SV:  ' +  maSV + '.....Lớp: '+lop;
});

document.addEventListener('DOMContentLoaded', function() {
    const correct_answer = {
        q1: 'true', q2: 'false' , q3: 'true', q4: 'true', q5: 'true', q6: 'true', q7: 'false', q8: 'true', q9: 'false', q10: 'false',
        q11: 'b', q12: 'c', q13: 'a', q14: 'a', q15: 'd', q16: 'b', q17: 'd', q18: 'c', q19: 'a', q20: 'd', 
        q21: ['a', 'b'],  q22: ['a', 'c', 'd'], q23: ['a', 'd'], q24: ['b', 'd'], q25: ['b', 'c'], q26: ['a', 'c'], q27: ['c', 'd'], q28: ['a', 'b', 'c'], q29: ['a', 'b'], q30: ['c'], 
        q31: "1", q32: "P = mG", q33: "15", q34: "Angle", q35: "Thoăn thoắt", q36: "15.5", q37: "A = 10", q38: "15", q39: "3.14", q40: "100"
    };
    function calculateScore() {
        let score = 0;
        for(let i = 1; i <= 4; i ++){
            for(let j = 1; j <= 10; j ++){
                const cauhoi = `q${(i-1)*10 + j}`;
                const answer = getanswer(cauhoi);
                if (Array.isArray(correct_answer[cauhoi])) {
                    // Nếu đáp án là mảng (nhiều lựa chọn), so sánh từng phần tử
                    if (arraysEqual(answer, correct_answer[cauhoi])) {
                        score++;
                    }
                } else {
                    // So sánh câu trả lời với đáp án đúng (cho lựa chọn đúng/sai và một lựa chọn)
                    if (answer == correct_answer[cauhoi]) {
                        score++;
                    }
                }
            }
            
        }
        for(let j = 1; j <= 10; j ++){
            const cauhoi = `q${30 + j}`;
            const answer = getanswer(cauhoi);
            if(answer === correct_answer[cauhoi]){
                score++;
            }
        }

        displayResult(score);
    }

    
    function getanswer(cauhoi) {
        const choose = document.querySelectorAll(`input[name="${cauhoi}"]:checked`);
        const answer = Array.from(choose).map(input => input.value);
        return answer;
    }
    function displayResult(score) {
        const kqElement = document.getElementById('quizResult');
        const scoreElement = document.getElementById('score');
        const nx = document.getElementById('feedback');

        scoreElement.textContent = `Số điểm: ${score/4}`;
        if (score >= 36) {
            nx.textContent = 'Điểm thuộc mức Xuất Sắc, chúc mừng bạn';
        } 
        else if(score >=32){
            nx.textContent = 'Điểm thuộc Giỏi';
        }
        else if(score >=28){
            nx.textContent = 'Điểm thuộc Khá';
        }
        else if(score >=20){
            nx.textContent = 'Điểm thuộc Trung bình, cần cố gắng hơn nữa';
        }
        else {
            nx.textContent = 'Điểm thuộc mức kém, bạn phải học lại';
        }

        // Hiển thị phần kết quả
        kqElement.classList.remove('hidden');
    }

    // Hàm so sánh hai mảng
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    // Gắn sự kiện cho nút Nộp bài
    const submitButton = document.querySelector('button');
    submitButton.addEventListener('click', calculateScore);
});
