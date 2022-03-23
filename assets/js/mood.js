export function p1(...a) {
    return a.reduce((total, value) => total + value) / (5 * a.length)
}

export function p2(x) {
    return x == 0 ? 20 : -10000 * x
}

export function p3(x) {
    return (104 - 2 * (x / 20 + 20 / x)) / 5
}

export function p4(x) {
    let t
    if(0 <= x && x < 20) {
        t = 100
    } else if(20 <= x && x < 70) {
        t = 100 - 2 * (x - 20)
    } else if(70 < x) {
        return -Infinity
    }

    return 30 - (1000 / t)
}

export function p5(x) {
    let s
    if(0 <= x && x < 30) {
        s = 100 / 30 * x
    } else if(30 <= x && x <= 60) {
        s = 100
    } else if(60 < x) {
        s = 100 - 5 * (x - 60)
    }

    return s / 5
}

export function mood(p1, p2, p3, p4, p5) {
    return p1 + p2 + p3 + p4 + p5
}