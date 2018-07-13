import "./core.css"

const doc = <HTMLDocument>document
const el_msg = <HTMLElement>doc.querySelector("#msg")
const el_duration = <HTMLInputElement>doc.querySelector("#duration")
const el_direction = <HTMLSelectElement>doc.querySelector("#direction")
const el_button = <HTMLButtonElement>doc.querySelector("button")
const el_timeline = <HTMLElement>doc.querySelector("#time_line")
const el_ball = <HTMLElement>doc.querySelector(".ball")

let fd: any = null
el_ball.addEventListener("animationstart", (e: any) => {
    el_button.disabled = true
    fd = updateTimeLine(el_timeline)
})
el_ball.addEventListener("animationend", (e: any) => {
    el_button.disabled = false
    clearInterval(fd)
    el_msg.innerText = "Pending"
})

el_button.addEventListener("click", (e: any) => {
    rotateInSteps(<HTMLElement>doc.querySelector(".ball"), Number(el_duration.value), el_direction.value)
})

function rotateInSteps(target: HTMLElement, duration: number, direction: string = "end") {
    el_timeline.innerText = "0"
    el_msg.innerText = "Running"

    target.style.animation = "none"
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            target.style.animation = `rotate ${duration}s steps(3, ${direction})`
        })
    })
}

function updateTimeLine(target: HTMLElement) {
    const fd = setInterval(() => {
        const o = Number(target.innerText) || 0
        target.innerText = String(o + 1)
    }, 1000)

    return fd
}
