function invertAnd(one, two, three) {
    if (one && two && three) {
        return false;
    } else {
        return true;
    }
}

function dTrigger(D, R, C, S, Q, Q2) {
    let and1 = invertAnd(D, R, C);
    let and2 = invertAnd(S, C, !D);
    let and3 = invertAnd(S, and1, Q2);
    Q = and3;
    let and4 = invertAnd(Q, and2, R);
    Q2 = and4;
    return `<b>Q</b> = ${Q}<br><b>-Q</b> = ${Q2}`;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('pip').addEventListener('submit', function(event) {
        event.preventDefault();

        var formElements = document.getElementById('pip').elements;
        var values = [];

        for (var i = 0; i < formElements.length-1; i++) {
            var element = formElements[i];
            if (element.tagName === 'INPUT') {
                var state;
                if (element.type === 'checkbox' || element.type === 'radio') {
                    state = element.checked;
                }
                values.push(Boolean(state)); // Преобразование в логическое значение
            }
        }

        document.getElementById('result').innerHTML = 'Результат:<br>' + dTrigger(values[0], values[1], values[2], values[3], values[4], values[5]);
    });
});
