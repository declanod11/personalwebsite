let px=[0],py=[5],pr=[100],pb=[200],pg=[50],pxD=[],pyD=[];
let dim,chooser
let alpha = 0;
let canv2,canv3, side=0, re,gr,bl;
let scalex,scaley

function setup() {
  createCanvas(400, 400);
  scalex=width/2.3;
  scaley=height/2.3;
  canv2 = createGraphics(width, height);
  canv3 = createGraphics(width, height);
  if(width>height){
    dim = height;
  } else {
    dim = width;
  }
  
  [xNew,yNew] = barnsley(px[0],py[0])
  xD = map(xNew, -2.1820, 2.6558, -scalex, scalex);
  yD = map(yNew, 0, 9.9983, scaley, -scaley);
  pxD.unshift(xD)
  pyD.unshift(yD)
  
  re=pr[0];
  gr=pg[0];
  bl=pb[0];
  
  frameRate(60)
  
}

function draw() {
  background(55);
  let xNew,yNew;
  let xTemp,yTemp;
  let r2,g2,b2;
  translate(width / 2, height / 2);
  imageMode(CENTER);
  // rotate(alpha);
  // alpha+=0.003;
  // if((alpha%TWO_PI)<PI){
  //   background(55)
  // }else{
  //   background(240)
  // }

  [xNew,yNew] = barnsley(px[0],py[0])
  xD = map(xNew, -2.1820, 2.6558, -scalex, scalex);
  yD = map(yNew, 0, 9.9983, scaley, -scaley);
  
  px.unshift(xNew)
  py.unshift(yNew)
  pxD.unshift(xD)
  pyD.unshift(yD)
  pr.unshift(re)
  pg.unshift(gr)
  pb.unshift(bl)
  
  let len = pxD.length;
  let r;
  
  if(len>100){
    x=pxD.pop()
    y=pyD.pop()
    canv2.strokeWeight(1)
    r2=pr.pop()
    g2=pg.pop()
    b2=pb.pop()
    
    canv2.stroke(r2,g2,b2)
    // canv3.stroke(r2,g2,b2)
    x=map(x,-width/2,width/2,0,width)
    y=map(y,height/2,-height/2,height,0)
    canv2.point(x,y)
    // canv3.point(x,y)
    
  }
  
  image(canv2, 0, 0);
  rotate(alpha);
  image(canv3, 0, 0);
  rotate(-alpha);
  
  for(let i=len-2;i>-1;i--){
    fill('purple')
    noStroke()
    if(i<100){
      r=pow((100-i)/20,2) +2;
    } else {
      r=2;
    }
    
    fill(pr[i],pg[i],pb[i])
    ellipse(pxD[i],pyD[i],r);
    // rotate(alpha);
    // fill(pg[i],pb[i],pr[i])
    // ellipse(pxD[i],pyD[i],r);
    // rotate(-alpha);
    
  }
  
}

function barnsley(x,y){
  let choose=random()
  if(choose<0.01){
    x = 0;
    y = 0.16*y;
    gr = random(50,200);
    side=0;
  } else if(choose<0.86) {
    x = 0.85*x + 0.04*y;
    y = -0.04*x + 0.85*y + 1.6;
    if(side===1){
      re=pr[0]*1.05;
    }else if (side===2){
      bl=pb[0]*1.05;
    } else {
      re=pr[0]*1.05;
      bl=pb[0]*1.05;
      gr=pg[0]*1.05;
    }
  } else if(choose<0.93) {
    x = 0.20*x - 0.26*y;
    y = 0.23*x + 0.22*y + 1.6;
    if(side==2){
      bl = pb[0]*1.1;
    } else if(side==1){
      re = 30;
      bl = 150;
    } else {
      re = 70;
      bl = 150;
    }
    // re = random(150,205);
    // bl = random(10,100);
    side=1;
  } else {
    x = -0.15*x + 0.28*y;
    y = 0.26*x + 0.24*y + 0.44;
    if(side==1){
      re = pr[0]*1.1;
    } else if(side==2){
      bl = 30;
      re = 150;
    } else {
      bl = 70;
      re = 150;
    }
    
    // bl = random(150,205);
    // re = random(10,100);
    side=2;
  }
  
  return [x,y]
}