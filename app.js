document.addEventListener('DOMContentLoaded', () => {
const squares = document.querySelectorAll('.grid div')
const scoreDisplay = document.querySelector('#result')
const timerDisplay = document.querySelector('#timer')
const startBtn = document.querySelector('#start')
const instBtn = document.querySelector('#inst-Btn')
const instruction = document.querySelector('#instructions')
const top = document.querySelector('#top')

const width = 10
let currentIndex = 0 //first div 
let appleIndex = 0  //first div
let currentSnake = [2,1,0] //snake 2 head 1 body 0 tail
let direction = 1 
let speed = 0.9
let score = 0
let intervalTime = 0
let interval = 0
let timer = 0
let topScore = 0

function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove('pkb1'))
    currentSnake.forEach(index => squares[index].classList.remove('pkb2'))
    currentSnake.forEach(index => squares[index].classList.remove('pkb3'))
    currentSnake.forEach(index => squares[index].classList.remove('pkb4'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerHTML = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    timer = 0
    timerDisplay.innerHTML = timer
    currentSnake.forEach(index => squares[index].classList.add(randomPkb()))
    interval = setInterval(moveOutcomes, intervalTime)
}
function randomPkb(){
    let pokeballs = ['pkb1', 'pkb2', 'pkb3', 'pkb4']
    let pkb = pokeballs[Math.floor(Math.random() * pokeballs.length)];
    return pkb
}

function moveOutcomes(){
    if (
        (currentSnake[0] + width >= (width * width) && direction === width) || //if hit bottom
        (currentSnake[0] % width === width -1 && direction === 1) || //if hit right
        (currentSnake[0] % width === 0 && direction === -1) || //if hit left
        (currentSnake[0] - width < 0 && direction === -width) || //if hit top
        squares[currentSnake[0] + direction].classList.contains('pkb1') ||
        squares[currentSnake[0] + direction].classList.contains('pkb2') ||
        squares[currentSnake[0] + direction].classList.contains('pkb3') ||
        squares[currentSnake[0] + direction].classList.contains('pkb4')
    ){
        alert('Game Over, Final score is ' + score)
        if (topScore < score){
            topScore = score
            top.innerHTML = `${topScore} by Player1`
        }
        return clearInterval(interval) //gameover
    }

    const tail = currentSnake.pop() //removes last
    squares[tail].classList.remove('pkb1') //removes class from tail
    squares[tail].classList.remove('pkb2') //removes class from tail
    squares[tail].classList.remove('pkb3') //removes class from tail
    squares[tail].classList.remove('pkb4') //removes class from tail
    currentSnake.unshift(currentSnake[0] + direction) //gives direction to the head
    console.log(currentSnake)

    //deal with apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
        squares[currentSnake[0]].classList.remove('apple')
        squares[currentSnake[0]].classList.add('effect')
        setTimeout(() => squares[currentSnake[0]].classList.remove('effect'), 200)
        squares[tail].classList.add(randomPkb())
        currentSnake.push(tail)
        randomApple()
        score++
        scoreDisplay.textContent = score 
        clearInterval(interval)
        intervalTime = intervalTime * speed 
        interval = setInterval(moveOutcomes, intervalTime)
        console.log('intervaltime', intervalTime)
    }
    squares[currentSnake[0]].classList.add(randomPkb())
    timer++
    timerDisplay.innerHTML = timer
}

//generate apple
function randomApple(){
    do {
        appleIndex = Math.floor(Math.random() *squares.length)
    } while (squares[appleIndex].classList.contains('pkb1') || squares[appleIndex].classList.contains('pkb2') || squares[appleIndex].classList.contains('pkb3') || squares[appleIndex].classList.contains('pkb4'))
    squares[appleIndex].classList.add('apple')
    console.log(appleIndex)
}

function control(e) {
    squares[currentIndex].classList.remove('pkb1')
    squares[currentIndex].classList.remove('pkb2')
    squares[currentIndex].classList.remove('pkb3')
    squares[currentIndex].classList.remove('pkb4')
    if (e.keyCode === 39){
        direction = 1   // if we press right
    } else if (e.keyCode === 38){
        direction = -width // if we press up
    } else if (e.keyCode === 37){
        direction = -1  // if we press left
    } else if (e.keyCode === 40){
        direction = +width // if we press down
    }
}

document.addEventListener('keyup', control)
startBtn.addEventListener('click', startGame)
instBtn.addEventListener('click', () =>{
    if (instBtn.innerHTML === 'Instructions'){
     instBtn.innerHTML = 'Hide'
     instruction.style.display = 'block'
    } else if (instBtn.innerHTML === 'Hide'){
     instBtn.innerHTML = 'Instructions'
     instruction.style.display = 'none'  
    }
 })

}) 