function jkTrigger(J, C, K, start) {
    let Q = start[0];
    let Qm = start[1];

    if (C === 1) {
        if (J === 1 && K === 0) {
            Q = 1; // Режим установки (SET)
            Qm = 0;
        } else if (J === 0 && K === 1) {
            Q = 0; // Режим сброса (RESET)
            Qm = 1;
        } else if (J === 1 && K === 1) {
            // Режим триггера (Toggle)
            Q = Q === 1 ? 0 : 1;
            Qm = Q === 1 ? 0 : 1;
        }
        // В остальных случаях Q и Qm остаются неизменными
    }

    return [Q, Qm];
}

function binaryToDecimal(binaryString) {
    const decimalNumber = parseInt(binaryString, 2);
    return decimalNumber;
}

function revChetchik(cp, cm, start) {
    q0 = jkTrigger(1, (cp || cm), 1, start[0]);
    q1 = jkTrigger(1, ((cp && q0[0]) || (cm && q0[1])), 1, start[1]);
    q2 = jkTrigger(1, ((cp && q1[0] && (cp && q0[0])) || (cm && q1[1] && (cm && q0[1]))), 1, start[2]);

    return [q0, q1, q2];
}

document.addEventListener('DOMContentLoaded', function() {
    // Начальные значения
    let q0 = [0, 1];
    let q1 = [0, 1];
    let q2 = [0, 1];
    let startQ = [q0, q1, q2];

    // Получаем ссылки на элементы DOM
    const bcp = document.getElementById("cp");
    const bcm = document.getElementById("cm");
    const printe = document.getElementById("result");
    const reset = document.getElementById("reset");
    const input = document.getElementById("twoSys");
    const inputRes = document.getElementById("resultInput");

    function updateResult(cp, cm) {
        let result = revChetchik(cp, cm, startQ);
        q0 = result[0];
        q1 = result[1];
        q2 = result[2];
        startQ = [q0, q1, q2];
        printe.innerHTML = [result[0][0], result[1][0], result[2][0]].join(", ") + '<br>' + binaryToDecimal([result[0][0], result[1][0], result[2][0]].join(""));
    }

    // Обработчики событий для увеличения cp и cm
    bcp.addEventListener("click", function() {
        updateResult(1, 0);
    });

    bcm.addEventListener("click", function() {
        updateResult(0, 1);
    });

    // Обработчик события для сброса значений
    reset.addEventListener("click", function() {
        q0 = [0, 1];
        q1 = [0, 1];
        q2 = [0, 1];
        startQ = [q0, q1, q2];
        updateResult(0, 0);
        console.clear();
    });

    // Обработка инпута
    input.addEventListener("input", function() {
        inputRes.innerHTML = "2 -> 10: <b>" + binaryToDecimal(input.value) + "</b>";
    });
});
