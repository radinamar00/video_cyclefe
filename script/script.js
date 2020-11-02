// HIDING AND SHOWING CONTENT FOR VALUES

const goodPrice = document.querySelector('.goodprice');
const socialising = document.querySelector('.socialising');
const unique = document.querySelector('.unique');

function displayElements(elementsToShow, elementsToHide) {
    for (let i = 0; i <= elementsToShow.length - 1; i++) {
        elementsToShow[i].classList.remove('hidden');
    }

    for (let i = 0; i <= elementsToHide.length - 1; i++) {
        elementsToHide[i].classList.add('hidden');
    }
}

document.getElementById('btn1').addEventListener('click', function () {
    displayElements([goodPrice], [socialising, unique]);
});
document.getElementById('btn2').addEventListener('click', function () {
    displayElements([socialising], [goodPrice, unique]);
});

document.getElementById('btn3').addEventListener('click', function () {
    displayElements([unique], [goodPrice, socialising]);
});



//END