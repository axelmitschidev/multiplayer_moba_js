class User {
    constructor(pos_x, pos_y, id) {
        this.size = 20
        this.pos = createVector(pos_x, pos_y)
        this.vel = createVector(0, 0)
        this.acc = createVector(0, 0)
        this.maxSpeed = 6
        this.maxForce = 10
        this.target = createVector(0, 0)
        this.id = id
        this.color = "255, 255, 255"
        this.thingsView = []
        this.name = 'no'
    }

    setTarget(x, y) {
        this.target = createVector(x, y)
    }

    update() {
        let desired = p5.Vector.sub(this.target, this.pos)
        let steering = p5.Vector.sub(desired, this.vel)

        if (sqrt((this.pos.x - this.target.x)**2 + (this.pos.y - this.target.y)**2) > 3) {
            this.acc.add(steering)
            this.acc.limit(this.maxForce)
            
            this.vel.add(this.acc)
            this.vel.limit(this.maxSpeed)
            
            this.pos.add(this.vel)   
        }

        this.acc.set(0, 0)
    }

    draw = (isMe) => {
        push()
        text(this.name, this.pos.x, this.pos.y - 20)
        if (isMe) {
            text('X : ' + this.pos.x.toFixed(1), this.pos.x - 250, this.pos.y - 250)
            text('Y : ' + this.pos.y.toFixed(1), this.pos.x - 250, this.pos.y - 230)
        }
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        const arr_color = this.color.replace(' ', '').split(',')
        const r = parseInt(arr_color[0]) > 255 ? 255 : parseInt(arr_color[0]) < 0 ? 0 : parseInt(arr_color[0])
        const g = parseInt(arr_color[1]) > 255 ? 255 : parseInt(arr_color[1]) < 0 ? 0 : parseInt(arr_color[1])
        const b = parseInt(arr_color[2]) > 255 ? 255 : parseInt(arr_color[2]) < 0 ? 0 : parseInt(arr_color[2])
        fill(r, g, b)
        if (r + g + b < 255 * 3 / 2) {
            stroke(255)
        } else {
            stroke(0)
        }
        circle(0, 0, this.size)
        line(0, 0, 0 + this.size / 2, 0)
        pop()
    }
}

