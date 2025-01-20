let player = "X";

const board = Array(9).fill(null);

const items = document.querySelectorAll(".item");

function handleClick(e) {
  const item = e.target;
  const index = Array.from(items).indexOf(item);
  if (board[index] === null) {
  }
}
items.forEach((item) => {
  item.addEventListener("click", handleClick);
});
