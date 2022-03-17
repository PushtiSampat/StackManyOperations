class element{
     x:number;
     y:number;
     height:number;
     width:number;
     data:number;
     context:CanvasRenderingContext2D;
     canvas:HTMLCanvasElement;
    
     constructor(context:CanvasRenderingContext2D,canvas:HTMLCanvasElement,x:number,y:number,height:number,width:number,data:number){
         this.width=height;
         this.height=width;
         this.context=context;
         this.canvas=canvas;
         this.x=x;
         this.y=y;
         this.data=data;
     }
     writeData(){
        this.context.fillText(this.data+"",this.X+(this.width/3),this.Y+(this.height/2));
     }

     get Y(){
         return this.y;
     }

     get X(){
        return this.x;
    }

     drawArrayElement(){
        this.context.clearRect(this.x,this.y,this.width,this.height);
        this.context.lineWidth=2;
        this.context.strokeStyle='orange';
        this.context.strokeRect(this.x,this.y,this.width,this.height);
     }
     drawStackElement(){
        this.context.lineWidth=2;
       // this.context.strokeStyle='blue';
        this.context.clearRect(249,141,this.canvas.width,this.canvas.height);
        this.context.strokeRect(this.x,this.y,this.width,this.height);
     }
     drawPrevElementStack(){
        this.context.lineWidth=2;
       // this.context.strokeStyle='purple';
        this.context.strokeRect(this.x,this.y,this.width,this.height);
     }
     incrementX(n:number){
         this.x=this.x+n;
     }
     incrementY(n:number){
        this.y=this.y+n;
    }
    decrementX(n:number){
        this.x=this.x-n;
    }
    decrementY(n:number){
       this.y=this.y-n;
   }
   
}
   
