let song;
let analyzer;
let fft;
let circles = [];
let eq = ['16 ', '32 ', '64 ', '128 ', '256 ', '512 ', '1 k', '2 k', '3 k', '4 k', '6 k', '8 k',  '10 k', '12 k', '16 k', '20 k'];
function preload() {
  // Load your song here
  soundFormats('mp3', 'wav');
  song = loadSound('assets/tobogan');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  fftWave = new p5.FFT(0.8, 1024);
  fftSpectrum = new p5.FFT(0.85, 16);
  song.amp(0.3);
}

function draw() {
  background(170);
  noFill();
  let spectrum = fftSpectrum.analyze();
  let wave = fftWave.waveform();

  let displayText = -1;
  stroke(190);
  beginShape();
  for (i = 0; i < spectrum.length; i += 1) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);

    if (mouseX > i*windowWidth/16 && mouseX < i*windowWidth/16 + windowWidth/16) {
      displayText = i;
      fill(120);
    } else {
      fill(170);
    }
    rect(x, height, width / spectrum.length, 2*h/3 )

    let value = int(map(spectrum[displayText], 0, 255, 0, 100));

    fill(255);
    textSize(48);
    textAlign(CENTER, CENTER);
    text(`${displayText != -1 ? `${eq[displayText]}Hz : ${value}` : ''}`, width/2, height/3);

  }
  endShape();
  
  stroke(170);  
  translate(width / 4, height / 3);

  fill(220)
  rect(-112, -132, 224, 264);
  fill(120)
  ellipse(0, -20, 100, 100);
  fill(60)
  ellipse(0, -20, 40, 40);
  fill(120)
  rect(-28, 50, 56, 14);
  ellipse(54, -20, 5, 5)
  ellipse(-54, -20, 5, 5)
  ellipse(-28, -66, 5, 5)
  ellipse(28, -66, 5, 5)
  ellipse(-28, 26, 5, 5)
  ellipse(28, 26, 5, 5)

  stroke(255);  

  //skip every other value
  for (let i = 0; i < wave.length; i += 2) {
    let r = map(wave[i], -1, 1, 150, 250);
    let x = r * sin(i);
    let y = r * cos(i);
    ellipse(x, y, 2, 2);
    
  }

  stroke(170);  
  translate(width / 2, 0);

  fill(220)
  rect(-112, -132, 224, 264);
  fill(120)
  ellipse(0, -20, 100, 100);
  fill(60)
  ellipse(0, -20, 40, 40);
  fill(120)
  rect(-28, 50, 56, 14);
  ellipse(54, -20, 5, 5)
  ellipse(-54, -20, 5, 5)
  ellipse(-28, -66, 5, 5)
  ellipse(28, -66, 5, 5)
  ellipse(-28, 26, 5, 5)
  ellipse(28, 26, 5, 5)


  stroke(255);  
  //skip every other value
  for (let i = 0; i < wave.length; i += 2) {
    let r = map(wave[i], -1, 1, 150, 250);
    let x = r * sin(i);
    let y = r * cos(i);
    // make these ellipses different colors based on the frequency
    fill(255, 255, 255-i, 255 - i);
    ellipse(x, y, 2, 2);

  }
}


function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
    noLoop();
  } else {
    song.play();
    loop();
  }
}
