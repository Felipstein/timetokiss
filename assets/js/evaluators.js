const evaluatorsDOM = document.getElementById('evaluators')
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

evaluatorsDOM.childNodes.forEach(child => {  // load evaluators placed in html
    document.getElementById('add_evaluator').addEventListener('click', handleAddEvaluator)
    if(child.classList && child.classList.contains('input-container')) {
        const id = child.childNodes[1].id.substring(3)
        if(id) {
            const evaluator = buildEvaluator(id)
            evaluators[id] = evaluator
            document.getElementById(evaluator.buttonId).addEventListener('click', evaluator.handleRemoveEvaluator)
        }
    }
})

function handleAddEvaluator(event) {
    const id = sequence.id
    const evaluator = buildEvaluator(id)
    evaluators[id] = evaluator

    const element = evaluator.createElement()

    evaluatorsDOM.appendChild(element)
    document.getElementById(evaluator.buttonId).addEventListener('click', evaluator.handleRemoveEvaluator)

    if(event.pointerId === -1) {
        document.getElementById(evaluator.id).focus()
    }
}

function buildEvaluator(id) {
    const evaluator = {
        id: `p1_${id}`,
        buttonId: `remove_evaluator_${id}`,
        idOfGroup: `p1_${id}-group`,
        handleRemoveEvaluator() {
            removeEvaluator(id)
        },
        createElement() {
            const evaluator = document.createElement('div')
            evaluator.id = this.idOfGroup
            evaluator.classList.add('input-container')
            evaluator.innerHTML = `
                <input type="number" class="p1_styler" id="${this.id}" placeholder="" max="100" />
                <button class="button_evaluator" id="${this.buttonId}"><i class="fa-solid fa-minus"></i></button>
            `
            return evaluator
        }
    }
    return evaluator
}

function removeEvaluator(id) {    
    const evaluator = evaluators[id]

    document.getElementById(evaluator.buttonId).removeEventListener('click', evaluator.handleRemoveEvaluator)
    document.getElementById(evaluator.idOfGroup).remove()
    
    delete evaluators[id]
}

export default () => [document.getElementById('p1'), ...evaluators.map(evaluator => document.getElementById(evaluator.id)).filter(evaluator => evaluator != undefined)]