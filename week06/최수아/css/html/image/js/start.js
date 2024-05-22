const main = document.getElementById('main');
const qna = document.getElementById('qna');
const result = document.getElementById('result');
const endPoint = 12;

let select = [];

const start = () => {
    main.style.animation = 'fadeOut 1s';
    setTimeout( () => {
        qna.style.animation = 'fadeIn 1s';
        setTimeout( () => {
            main.style.display = 'none';
            qna.style.display = 'flex';
        }, 450);

        let questionIndex = 0;
        goNext(questionIndex);
    }, 450);
};

const goNext = (questionIndex) => {
    if (questionIndex === endPoint) {
        goResult();
        return;
    }

    let questionBox = document.getElementById('question-box');
    questionBox.innerHTML = qnaList[questionIndex].q;

    let statusNum = document.getElementById('status-number');
    statusNum.innerHTML = questionIndex + 1 + '/12';

    let answerBox = document.getElementById('answer-box');
    answerBox.innerHTML = "";

    for (let i in qnaList[questionIndex].a) {
        addAnswerButton(qnaList[questionIndex].a[i].answer, questionIndex, i);
    }

    let status = document.getElementById('status-bar');
    status.style.width = (100 / endPoint) * (questionIndex + 1) + '%';
};

const addAnswerButton = (answerText, questionIndex, index) => {
    let answerBox = document.getElementById('answer-box');
    let answerButton = document.createElement('button');

    answerButton.classList.add("answerList");
    answerButton.classList.add('fadeIn');
    answerBox.appendChild(answerButton);
    answerButton.innerHTML = answerText;

    answerButton.addEventListener("click", () => {
        select[questionIndex] = index;
        let children = document.getElementsByClassName('answerList');
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.animation = "fadeOut 1s";
        }

        setTimeout(() => {
            for (let i=0; i<children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++questionIndex);
        }, 450);
    });
}

const goResult = () => {
    qna.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        result.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            qna.style.display = 'none';
            result.style.display = 'flex';
            setResult();
        }, 450);
    }, 450);
};

const calculateResult = () => {
    let pointArray = [
        {
            name: 'Java',
            value: 0,
            key: 0,
        },
        {
            name: 'Javascript',
            value: 0,
            key: 1,
        },
        {
            name: 'Python',
            value: 0,
            key: 2,
        },
        {
            name: 'C++',
            value: 0,
            key: 3,
        },
        {
            name: 'swift',
            value: 0,
            key: 4,
        },
        {
            name: 'Kotlin',
            value: 0,
            key: 5,
        },
        {
            name: 'SQL',
            value: 0,
            key: 6,
        },
    ];

    for (let i = 0; i < endPoint; i++) {
        let target = qnaList[i].a[select[i]];
        for (let j = 0; j < target.type.length; j++) {
            for (let k = 0; k < pointArray.length; k++) {
                if (target.type[j] === pointArray[k].name) {
                    pointArray[k].value += 1;
                }
            }
        }
    }
    let resultArray = pointArray.sort(function (a, b) {
        if (a.value > b.value) {
            return -1;
        }
    
        if (a.value < b.value) {
            return 1;
        }
        return 0;
    });
    console.log(resultArray);
    let resultWord = resultArray[0].key;
    return resultWord;    
};

const setResult = () => {
    let point = calculateResult();

    const resultName = document.getElementById('result-name');
    resultName.innerHTML = resultList[point].name;

    const resultTitle = document.getElementById('result-title');
    resultTitle.innerHTML = resultList[point].title;

    const resultDesc = document.getElementById('result-desc');
    resultDesc.innerHTML = resultList[point].desc;
};