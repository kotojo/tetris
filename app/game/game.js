function Game(spec) {
  const game = spec;
  const canvas = spec.canvas;
  const ctx = canvas.getContext('2d');
  const buffer = new ArrayBuffer(800); // 4 bytes per square with 10x20 squares
  // const readState = new Uint8ClampedArray(buffer);
  const writeState = new Uint32Array(buffer);
  const colors = { green: 0xFF2ED217 };

  const drawSquare = () => {
    const { scrollWidth, scrollHeight } = canvas;
    const squareWidth = scrollWidth / 10;
    const squareHeight = scrollHeight / 20;
    const squareBuffer = new ArrayBuffer(squareHeight * squareWidth * 4);
    const squareWriteArr = new Uint32Array(squareBuffer);

    squareWriteArr.forEach((val, i) => {
      squareWriteArr[i] = colors.green;
    });

    writeState[0] = colors.green;

    return new ImageData(new Uint8ClampedArray(squareBuffer), squareWidth, squareHeight);
  };

  const drawInital = () => {
    const square = drawSquare();
    ctx.putImageData(square, 0, 0);
  };

  const play = () => {
    drawInital();
  };

  game.play = play;
  return game;
}

export default Game;
