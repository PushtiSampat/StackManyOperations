//window.onload = () => {
const canvas = document.getElementById('canvas');
var ele = document.getElementById("pushbutton");
var ele2 = document.getElementById("popbutton");
var topbtn = document.getElementById("topbutton");
var isemptybtn = document.getElementById("isemptybutton");
var isfullbtn = document.getElementById("isfullbutton");
const ctx = canvas.getContext('2d');
var arrElmnts = new Array();
var arrNum = new Array();
var Top = -1;
ctx.lineWidth = 5;
ctx.strokeStyle = 'orange';
let temp, flag = 0;
for (let p = 0; p < 4; p++) {
    flag = 0;
    while (flag != 1) {
        temp = Math.floor((Math.random() * 99) + 1);
        if (arrNum.indexOf(temp) == -1) {
            arrNum[p] = temp;
            flag = 1;
        }
    }
}
function myArray(count) {
    var arrayStartX = 250;
    var arrayStartY = 100;
    let i;
    ctx.font = "20px Georgia";
    ctx.clearRect(250, 100, 300, 40);
    for (i = 0; i < 4; i++) {
        arrElmnts[i] = new element(ctx, canvas, arrayStartX, arrayStartY, 74, 40, arrNum[i]);
        arrElmnts[i].drawArrayElement();
        if (count == undefined || count < i) {
            arrElmnts[i].writeData();
        }
        arrayStartX += 74;
    }
}
function demoRestart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    myStack();
    ctx.font = "40px Georgia";
    ctx.fillText("Array=>", 50, 130);
    ctx.fillText("Stack=>", 50, 350);
    ctx.font = "20px Georgia";
    ctx.fillText("Click on the Push Button", 280, 50);
    ctx.fillText("for Inserting an Element in Stack", 250, 80);
    myArray();
    topValueElement();
    topValueIndex(-1);
    ele2.disabled = true;
    height = 40;
    Top = -1;
    stckElmnt = [];
    stp = 447;
    cnt = -1;
    ele.disabled = false;
}
function demoIsEmpty() {
    ctx.clearRect(635, 350, canvas.width, canvas.height);
    ctx.clearRect(250, 2, 350, 93);
    Top == -1 ? ctx.fillText("Top Index is -1", 340, 50) : ctx.fillText("Top Index is not -1", 340, 50);
    Top == -1 ? ctx.fillText("So Stack is Empty", 330, 80) : ctx.fillText("So Stack is not Empty", 330, 80);
    if (Top > -1) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(stckElmnt[Top].X - 90, stckElmnt[Top].Y, stckElmnt[Top].width + 260, stckElmnt[Top].height);
    }
}
function demoIsFull() {
    ctx.clearRect(635, 390, canvas.width, canvas.height);
    ctx.clearRect(250, 2, 350, 93);
    if (Top >= 0 && Top <= 3) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'purple';
        ctx.strokeRect(stckElmnt[Top].X - 90, stckElmnt[Top].Y, stckElmnt[Top].width + 260, stckElmnt[Top].height);
        ctx.fillText("Stack Limit is 3rd index.Top Index is " + Top, 250, 50);
    }
    else if (Top == -1) {
        ctx.fillText("Stack Limit at 3rd index.Top Index is -1", 250, 50);
    }
    //  Top==3?ctx.fillText("Top Index is -1",340,50):ctx.fillText("Top Index is not -1",340,50)
    Top == 3 ? ctx.fillText("So Stack is Full", 330, 80) : ctx.fillText("So Stack is not Full", 330, 80);
}
function demoTop() {
    ctx.clearRect(635, 350, canvas.width, canvas.height);
    ctx.clearRect(250, 2, 350, 93);
    if (Top > -1) {
        ctx.strokeStyle = 'purple';
        ctx.lineWidth = 5;
        ctx.strokeRect(stckElmnt[Top].X - 90, stckElmnt[Top].Y, stckElmnt[Top].width + 260, stckElmnt[Top].height);
        ctx.fillText(" Top Index is " + Top + " with element " + stckElmnt[Top].data, 260, 50);
    }
    else {
        ctx.fillText("Stack is Empty", 320, 50);
        ctx.fillText("So Top Index is -1", 310, 80);
    }
}
function singleElementDeleteStack(stckElmnt, cnt) {
    var myreq;
    let popvalue;
    stckElmnt[Top].drawStackElement();
    stckElmnt[Top].writeData();
    myStack();
    for (let i = Top; i >= 0; i--) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
    }
    if (stckElmnt[Top].X == 650 && stckElmnt[Top].Y >= 248)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].Y > 248)
        stckElmnt[Top].decrementY(2);
    else if (stckElmnt[Top].X < 650)
        stckElmnt[Top].incrementX(2);
    if (stckElmnt[Top].X == 650 && stckElmnt[Top].Y == 412) {
        popvalue = stckElmnt[Top].data;
        Top--;
        if (Top <= -1)
            ele2.disabled = true;
        if (Top > -1) {
            ctx.clearRect(250, 2, 350, 93);
            ctx.fillText(popvalue + " is poped from Stack successfully", 260, 50);
            ctx.fillText("So now " + stckElmnt[Top].data + " is top element in Stack", 260, 80);
            canvas_arrow(ctx, 438, stckElmnt[Top].Y + (40 / 2), 535, stckElmnt[Top].Y + (40 / 2));
            ctx.stroke();
            ctx.fillText("Top", 540, stckElmnt[Top].Y + (40 / 2) + 5);
            ctx.fillText("Popped Element", 633, 390);
            ele2.disabled = false;
        }
        else {
            ctx.clearRect(250, 2, 350, 93);
            ctx.fillText(popvalue + " is poped from Stack successfully", 260, 50);
            ctx.fillText("Popped Element", 633, 390);
            ctx.fillText("Stack UnderFlow", 330, 80);
        }
        topbtn.disabled = false;
        if (cnt < 3)
            ele.disabled = false;
        isemptybtn.disabled = false;
        isfullbtn.disabled = false;
        topValueIndex(Top);
        return;
    }
    myreq = window.requestAnimationFrame(() => { this.singleElementDeleteStack(stckElmnt, cnt); });
}
function demoPop() {
    ele2.disabled = true;
    ele.disabled = true;
    topbtn.disabled = true;
    isemptybtn.disabled = true;
    isfullbtn.disabled = true;
    myStack();
    if (cnt > 0) {
        for (let i = cnt; i <= 0; i--) {
            stckElmnt[i].drawPrevElementStack();
            stckElmnt[i].writeData();
        }
    }
    ctx.clearRect(250, 2, 350, 93);
    ctx.fillText(stckElmnt[Top].data + " is poping from Stack......", 300, 50);
    singleElementDeleteStack(stckElmnt, cnt);
}
let height = 40;
function singleElementInsertStack(stckElmnt, stp, cnt) {
    let stop = stp;
    var myreq;
    stckElmnt[Top].drawStackElement();
    stckElmnt[Top].writeData();
    //ctx.fillText(arrNum[cnt],stckElmnt.X+(74/2),stckElmnt.Y+(40/2));
    myArray(cnt);
    myStack();
    let count = cnt;
    for (let i = 0; i < Top; i++) {
        stckElmnt[i].drawPrevElementStack();
        stckElmnt[i].writeData();
        canvas_arrow(ctx, 438, stckElmnt[Top - 1].Y + (40 / 2), 535, stckElmnt[Top - 1].Y + (40 / 2));
        ctx.stroke();
        ctx.fillText("Top", 540, stckElmnt[Top - 1].Y + (40 / 2) + 5);
    }
    if (stckElmnt[Top].Y < 245)
        stckElmnt[Top].incrementY(2);
    else if (stckElmnt[Top].X < 354)
        stckElmnt[Top].incrementX(2);
    else if (stckElmnt[Top].X > 354)
        stckElmnt[Top].decrementX(2);
    else if (stckElmnt[Top].X == 354 && stckElmnt[Top].Y >= 200)
        stckElmnt[Top].incrementY(2);
    Top > 0 ? stp = stckElmnt[Top - 1].Y - 40 : stp = 408;
    if ((stckElmnt[Top].X == 354) && (stckElmnt[Top].Y == stp)) {
        ctx.clearRect(250, 2, 350, 93);
        ctx.fillText(arrNum[cnt] + " is pushed in Stack successfully", 260, 50);
        ctx.fillText("So now " + arrNum[cnt] + " is top element in Stack", 260, 80);
        canvas_arrow(ctx, 438, stp + (40 / 2), 535, stp + (40 / 2));
        ctx.stroke();
        ctx.fillText("Top", 540, stp + (40 / 2) + 5);
        ctx.clearRect(354 + 85, stp + 40, 140, height);
        height += 40;
        topValueIndex(Top);
        if (Top != 3)
            ele.disabled = false;
        if (cnt == 3)
            ele.disabled = true;
        ele2.disabled = false;
        topbtn.disabled = false;
        isemptybtn.disabled = false;
        isfullbtn.disabled = false;
        return;
    }
    myreq = window.requestAnimationFrame(() => { this.singleElementInsertStack(stckElmnt, stp, cnt); });
}
function myStack() {
    let h = 439;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 287);
    ctx.lineTo(350, 450);
    ctx.lineTo(432, 450);
    ctx.lineTo(432, 287);
    ctx.stroke();
    ctx.font = "25px Georgia";
    for (let i = 0; i < 4; i++) {
        ctx.fillText(i + "", 300, h);
        h -= 45;
    }
    ctx.font = "20px Georgia";
}
function canvas_arrow(context, fromx, fromy, tox, toy) {
    var headlen = 10; // length of head in pixels
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}
function topValueElement() {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'pruple';
    ctx.fillText("Top Index", 640, 85);
    ctx.strokeRect(650, 95, 74, 40);
}
function topValueIndex(num) {
    ctx.clearRect(650 + (74 / 5), 95 + (40 / 5) - 4, 30, 25);
    ctx.fillText(num + "", 650 + (74 / 3), 95 + (40 / 2));
}
// let strt=176;
var stckElmnt = new Array();
let stp = 447;
let cnt = -1;
// let inc=40;
function demoPush() {
    ele.disabled = true;
    ele2.disabled = true;
    topbtn.disabled = true;
    isemptybtn.disabled = true;
    isfullbtn.disabled = true;
    ++cnt;
    ++Top;
    stp -= 40;
    ctx.clearRect(250, 2, 350, 93);
    ctx.fillText(arrNum[cnt] + " is pushing in Stack......", 300, 50);
    canvas_arrow(ctx, 438, stp + (40 / 2), 535, stp + (40 / 2));
    ctx.strokeRect(438, 200, 20, 20);
    // strt+=74;
    stckElmnt[Top] = new element(ctx, canvas, arrElmnts[cnt].X, arrElmnts[cnt].Y, 74, 40, arrNum[cnt]);
    singleElementInsertStack(stckElmnt, stp, cnt);
}
myStack();
ctx.font = "40px Georgia";
ctx.fillText("Array=>", 50, 130);
ctx.fillText("Stack=>", 50, 350);
ctx.font = "20px Georgia";
ctx.fillText("Click on the Push Button", 280, 50);
ctx.fillText("for Inserting an Element in Stack", 250, 80);
myArray();
topValueElement();
topValueIndex(-1);
ele2.disabled = true;
//ctx.strokeRect(600,90,80,80)
//# sourceMappingURL=app.js.map