import { p1, p2, p3, p4, p5, mood } from './mood.js'
import getEvaluatorsInput from './evaluators.js'

document.getElementById('form').addEventListener('submit', handleSubmit)

function handleSubmit(event) {
    event.preventDefault()
    if(event.submitter.id === 'add_evaluator' || event.submitter.id.substring(0, 16) === 'remove_evaluator') {
        return
    }

    const p1Values = getEvaluatorsInput().map(input => !input.value ? NaN : Number(input.value))
    const p2Value = getInputValue('p2')
    const p3Value = getInputValue('p3')
    const p4Value = getInputValue('p4')
    const p5Value = getInputValue('p5')

    const moodValue = mood(p1(p1Values), p2(p2Value), p3(p3Value), p4(p4Value), p5(p5Value))

    console.log(`Aprovação de ${moodValue}%`)
    document.dispatchEvent(new CustomEvent('success_submit', { detail: moodValue }))
}

function getInputValue(id) {
    const input = document.getElementById(id)
    return !input.value ? NaN : Number(input.value)
}

document.addEventListener('success_submit', ({ detail }) => {

    if(detail < 0 || !detail) {
        document.getElementById('result').innerHTML = '<strong><span class="less">\<</span>0</strong><span>%</span>'
        setFontColor('#200')
        return
    } else if(detail >= 0 && detail <= 15) {
        setFontColor('darkred')
    } else if(detail > 15 && detail <= 30) {
        setFontColor('#f22d32')
    } else if(detail > 30 && detail < 35) {
        setFontColor('#fc8d4c')
    } else if(detail >= 35 && detail <= 65) {
        setFontColor('#fcdc4c')
    } else if(detail > 65 && detail <= 75) {
        setFontColor('#82eb62')
    } else if(detail > 75 && detail <= 90) {
        setFontColor('#62d0eb')
    } else if(detail > 90 && detail < 100) {
        setFontColor('#9b3b9285')
    } else if(detail == 100) {
        setFontColor('#bb44af')
    } else {
        setFontColor('white')
    }
    
    document.getElementById('result').innerHTML = `<strong>${parseInt(detail)}</strong><span>%</span>`
})

function setFontColor(color) {
    document.querySelector('.result-content h1').style.color = color
}