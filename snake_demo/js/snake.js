class Snake {
  constructor(board){
    this.direction = "N";
    this.segments = [[0,0]];
    this.board = board;
  }
}

Snake.prototype.move = () => {
  let newSeg = this.segments[0];
  if (this.direction === "N") {
    newSeg = [newSeg[0], newSeg[1] + 1];
  }
  else if (this.direction === "E") {
    newSeg = [newSeg[0] + 1, newSeg[1]];
  }
  else if (this.direction === "S") {
    newSeg = [newSeg[0], newSeg[1] - 1];
  }
  else if (this.direction === "W") {
    newSeg = [newSeg[0] - 1, newSeg[1]];
  }
  this.segments = this.segments.unshift(newSeg);
};

Snake.prototype.turn = dir => {
  this.direction = dir;
};
