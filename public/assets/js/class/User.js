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

    draw = () => {
        push()
        text(this.name, this.pos.x, this.pos.y - 20)
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        circle(0, 0, this.size)
        stroke(0)
        line(0, 0, 0 + this.size / 2, 0)
        pop()
    }
}

