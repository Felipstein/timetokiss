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

    console.log(p1Values)

    const moodValue = mood(p1(p1Values), p2(p2Value), p3(p3Value), p4(p4Value), p5(p5Value))

    console.log(`Aprovação de ${moodValue}%`)

}

function getInputValue(id) {
    const input = document.getElementById(id)
    return !input.value ? NaN : Number(input.value)
}