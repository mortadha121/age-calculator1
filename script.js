document.getElementById('calculate').addEventListener('click', function() {
    const birthdate = new Date(document.getElementById('birthdate').value);
    const targetDateInput = document.getElementById('target-date').value;
    const targetDate = targetDateInput ? new Date(targetDateInput) : new Date();
    
    if (isNaN(birthdate.getTime())) {
        document.getElementById('result').innerHTML = '<p style="color: red;">الرجاء إدخال تاريخ ميلاد صحيح!</p>';
        return;
    }

    if (targetDate < birthdate) {
        document.getElementById('result').innerHTML = '<p style="color: red;">التاريخ المحدد يجب أن يكون بعد تاريخ الميلاد!</p>';
        return;
    }

    let years = targetDate.getFullYear() - birthdate.getFullYear();
    let months = targetDate.getMonth() - birthdate.getMonth();
    let days = targetDate.getDate() - birthdate.getDate();

    if (days < 0) {
        months--;
        days += new Date(targetDate.getFullYear(), targetDate.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // حساب الفرق بالوحدات المختلفة
    const diffInMs = targetDate - birthdate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInSeconds = Math.floor(diffInMs / 1000);

    // إعداد النتيجة
    let resultHTML = `<h3>نتيجة الحساب:</h3>`;
    
    if (targetDateInput) {
        resultHTML += `<p>في تاريخ <span class="highlight">${targetDate.toLocaleDateString('ar-EG')}</span> سيكون عمرك:</p>`;
    } else {
        resultHTML += `<p>عمرك الحالي هو:</p>`;
    }

    resultHTML += `
        <p>${years} سنة و ${months} شهر و ${days} يوم</p>
        <p>أو <span class="highlight">${diffInDays}</span> يوم</p>
        <p>أو <span class="highlight">${diffInHours}</span> ساعة</p>
        <p>أو <span class="highlight">${diffInMinutes}</span> دقيقة</p>
        <p>أو <span class="highlight">${diffInSeconds}</span> ثانية!</p>
    `;

    document.getElementById('result').innerHTML = resultHTML;
});