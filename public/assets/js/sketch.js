document.oncontextmenu = new Function("return false")

const socket = io()

let client_user = {}
let server_users = []
let server_texts = []

function setup() {
    createCanvas(800, 800)
    textAlign(CENTER)

    client_user = new User(0, 0)
    client_user.id = socket.id
    client_user.name = prompt('Choice your name :')
}

function draw() {
    client_user.update()
    socket.emit('user', client_user)

    background(32)
    translate(-(client_user.pos.x - 400), -(client_user.pos.y - 400))
    server_texts.forEach(t => {
        if (sqrt((client_user.pos.x - t.x)**2 + (client_user.pos.y - t.y)**2) < 600) {
            text(t.text, t.x, t.y)
        }
    })
    fill(100, 255, 100)
    circle(client_user.target.x, client_user.target.y, 5)
    fill(255)
    server_users.forEach(u => {
        if (u.id !== client_user.id) {
            u.draw()
        }
    })
    client_user.draw()
}

function mouseClicked() {
    if (sqrt((mouseX - 400) ** 2 + (mouseY - 400) ** 2) < 400) {
        client_user.setTarget(client_user.pos.x + (mouseX - 400), client_user.pos.y + (mouseY - 400))
    }
}

socket.on("connect", () => {
    client_user.id = socket.id
})

socket.on('users positions', users => {
    users = users.map(u => {
        const u_buff = new User(u.pos.x, u.pos.y)
        u_buff.vel = createVector(u.vel.x, u.vel.y)
        u_buff.id = u.id
        u_buff.name = u.name
        return u_buff
    })

    server_users = users
})

socket.on('texts positions', texts => {
    server_texts = texts
})

function keyPressed() {
    
    if (keyCode === 32) {
        socket.emit('add text', {
            text: document.getElementById('text').value,
            x: client_user.pos.x,
            y: client_user.pos.y
        })
    }
}
