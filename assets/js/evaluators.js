const evaluators = []

const sequence = {
    get id() {
        let id = 0
        while(evaluators[id]) {
            id += 1
        }
        return id
    }
}

document.getElementById('evaluators').childNodes.forEach(child => {  // load evaluators placed in html
    if(child.classList && child.classList.contains('input-container')) {
        const id = child.childNodes[1].id.substring(3)
        if(id) {
            evaluators[id] = buildEvaluator(id)
        }
    }
})

function addEventsListener() {
    document.getElementById('add_evaluator').addEventListener('click', handleAddEvaluator)
    evaluators.forEach(evaluator => {
        document.getElementById(evaluator.buttonId).addEventListener('click', evaluator.handleRemoveEvaluator)
    })
}

addEventsListener()

function handleAddEvaluator() {
    const id = sequence.id

    const evaluator = buildEvaluator(id)

    evaluators[id] = evaluator
    document.getElementById('evaluators').innerHTML += evaluator.html
    addEventsListener()
}

function buildEvaluator(id) {
    const evaluator = {
        justId: id,
        id: `p1_${id}`,
        buttonId: `remove_evaluator_${id}`,
        html: `
            <div class="input-container">
                <input type="number" class="p1_styler" id="p1_${id}" placeholder="" />
                <button class="button_evaluator" id="remove_evaluator_${id}"><i class="fa-solid fa-minus"></i></button>
            </div>
        `,
        handleRemoveEvaluator() {
            removeEvaluator(id)
        }
    }
    return evaluator
}

function removeEvaluator(id) {    
    const evaluator = evaluators[id]

    document.getElementById(evaluator.buttonId).removeEventListener('click', evaluator.handleRemoveEvaluator)

    delete evaluators[id]

    const evaluatorHTML = document.getElementById('evaluators')
    evaluatorHTML.innerHTML = addEvaluatorHTML()

    evaluators.forEach(evaluator => {
        evaluatorHTML.innerHTML += evaluator.html
    })

    addEventsListener()
}

function addEvaluatorHTML() {
    return `
        <div class="input-container">
            <input type="number" class="p1_styler" id="p1" placeholder="" />
            <button class="button_evaluator" id="add_evaluator"><i class="fa-solid fa-plus"></i></button>
        </div>
    `
}

export default () => [document.getElementById('p1'), ...evaluators.map(evaluator => document.getElementById(evaluator.id))]