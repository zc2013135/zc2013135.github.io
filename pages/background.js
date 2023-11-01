// 可调参数
    var BACKGROUND_COLOR = "rgba(1,43,54,1)";   // 背景颜色
    var POINT_NUM =100;                        // 星星数目
    var POINT_COLOR = "rgba(255,255,255,255)";  // 点的颜色
    var LINE_LENGTH = 10000;                    // 点之间连线长度(的平方)
    
    // 创建背景画布
    var cvs = document.createElement("canvas");
    
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    cvs.style.cssText = "\
        position:fixed;\
        top:0px;\
        left:0px;\
        z-index:-1;\
        opacity:1.0;\
        ";
    document.body.appendChild(cvs);
    
    var ctx = cvs.getContext("2d");
    var grd = ctx.createLinearGradient(10, 10, 1100, 500);
    grd.addColorStop(0, "CornflowerBlue");
    grd.addColorStop(1, "LightPink");
    var startTime = new Date().getTime();
    
    //随机数函数
    function randomInt(min, max) {
        return Math.floor((max - min + 1) * Math.random() + min);
    }
    
    function randomFloat(min, max) {
        return (max - min) * Math.random() + min;
    }
    
    //构造点类
    function Point() {
        this.x = randomFloat(0, cvs.width);
        this.y = randomFloat(0, cvs.height);
    
        var speed = randomFloat(0.2, 1.0);
        var angle = randomFloat(0, 2 * Math.PI);
    
        this.dx = Math.sin(angle) * speed;
        this.dy = Math.cos(angle) * speed;
    
        this.r = 1.2;
    
        this.color = POINT_COLOR;
    }
    
    Point.prototype.move = function () {
        this.x += this.dx;
        if (this.x < 0) {
            this.x = 0;
            this.dx = -this.dx;
        } else if (this.x > cvs.width) {
            this.x = cvs.width;
            this.dx = -this.dx;
        }
        this.y += this.dy;
        if (this.y < 0) {
            this.y = 0;
            this.dy = -this.dy;
        } else if (this.y > cvs.height) {
            this.y = cvs.height;
            this.dy = -this.dy;
        }
    }
    
    Point.prototype.draw = function () {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
    
    var points = [];
    
    function initPoints(num) {
        for (var i = 0; i < num; ++i) {
            points.push(new Point());
        }
    }
    
    var p0 = new Point(); //鼠标
    p0.dx = p0.dy = 0;
    var degree = 2.5;
    document.onmousemove = function (ev) {
        p0.x = ev.clientX;
        p0.y = ev.clientY;
    }
    document.onmousedown = function (ev) {
        degree = 5.0;
        p0.x = ev.clientX;
        p0.y = ev.clientY;
    }
    document.onmouseup = function (ev) {
        degree = 2.5;
        p0.x = ev.clientX;
        p0.y = ev.clientY;
    }
    window.onmouseout = function () {
       p0.x = null;
        p0.y = null;
    }
    
    function drawLine(p1, p2, deg) {
        var dx = p1.x - p2.x;
        var dy = p1.y - p2.y;
        var dis2 = dx * dx + dy * dy;
        if (dis2 < 2 * LINE_LENGTH) {
            if (dis2 > LINE_LENGTH) {
                if (p1 === p0) {
                    p2.x += dx * 0.03;
                    p2.y += dy * 0.03;
                } else return;
            }
            var t = (1.05 - dis2 / LINE_LENGTH) * 0.2 * deg;
            ctx.strokeStyle = "rgba(255,255,255," + t + ")";
            ctx.beginPath();
            ctx.lineWidth = 1.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();
            ctx.stroke();
        }
        return;
    }
    
    //绘制每一帧
    function drawFrame() {
        cvs.width = window.innerWidth;
        cvs.height = window.innerHeight;
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, cvs.width, cvs.height);
    
        var arr = (p0.x == null ? points : [p0].concat(points));
        for (var i = 0; i < arr.length; ++i) {
            for (var j = i + 1; j < arr.length; ++j) {
                drawLine(arr[i], arr[j], 1.0);
            }
            arr[i].draw();
            arr[i].move();
        }
    
        window.requestAnimationFrame(drawFrame);
    }
    
    initPoints(POINT_NUM);
    drawFrame();
	
 (function fairyDustCursor() {
 
            var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"]
            var width = window.innerWidth;
            var height = window.innerHeight;
            var cursor = { x: width / 2, y: width / 2 };
            var particles = [];
 
            function init() {
                bindEvents();
                loop();
            }
 
           
            function bindEvents() {
                document.addEventListener('mousemove', onMouseMove);
                window.addEventListener('resize', onWindowResize);
            }
 
            function onWindowResize(e) {
                width = window.innerWidth;
                height = window.innerHeight;
            }
 
            function onMouseMove(e) {
                cursor.x = e.clientX;
                cursor.y = e.clientY;
 
                addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
            }
 
            function addParticle(x, y, color) {
                var particle = new Particle();
                particle.init(x, y, color);
                particles.push(particle);
            }
 
            function updateParticles() {
 
                
                for (var i = 0; i < particles.length; i++) {
                    particles[i].update();
                }
 
               
                for (var i = particles.length - 1; i >= 0; i--) {
                    if (particles[i].lifeSpan < 0) {
                        particles[i].die();
                        particles.splice(i, 1);
                    }
                }
 
            }
 
            function loop() {
                requestAnimationFrame(loop);
                updateParticles();
            }
 
          
 
            function Particle() {
 
                this.character = "*";
                this.lifeSpan = 120; //ms
                this.initialStyles = {
                    "position": "fixed",
                    "display": "inline-block",
                    "top": "0px",
                    "left": "0px",
                    "pointerEvents": "none",
                    "touch-action": "none",
                    "z-index": "10000000",
                    "fontSize": "25px",
                    "will-change": "transform"
                };
 
              
                this.init = function (x, y, color) {
 
                    this.velocity = {
                        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
                        y: 1
                    };
 
                    this.position = { x: x + 10, y: y + 10 };
                    this.initialStyles.color = color;
 
                    this.element = document.createElement('span');
                    this.element.innerHTML = this.character;
                    applyProperties(this.element, this.initialStyles);
                    this.update();
 
                    document.querySelector('.js-cursor-container').appendChild(this.element);
                };
 
                this.update = function () {
                    this.position.x += this.velocity.x;
                    this.position.y += this.velocity.y;
                    this.lifeSpan--;
 
                    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px, 0) scale(" + (this.lifeSpan / 120) + ")";
                }
 
                this.die = function () {
                    this.element.parentNode.removeChild(this.element);
                }
 
            }
 
           
            function applyProperties(target, properties) {
                for (var key in properties) {
                    target.style[key] = properties[key];
                }
            }
 
            if (!('ontouchstart' in window || navigator.msMaxTouchPoints)) init();
        })();   
		document.addEventListener('wheel', function(event) {
    if (event.ctrlKey) {
        event.preventDefault();
    }
}, { passive: false });