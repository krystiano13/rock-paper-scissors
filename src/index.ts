type div = HTMLDivElement | null;

let mode: string = "ai";
const left: div = document.querySelector(".left");
const right: div = document.querySelector(".right");

let winner: string = "";
const score: number[] = [0, 0];

const chooseMode = (divClass: string) => {
  if (divClass === "left") {
    mode = "player";
  } else {
    mode = "ai";
  }

  enterGame();
};

left?.addEventListener("click", () => chooseMode(left.className));
right?.addEventListener("click", () => chooseMode(right.className));

const enterGame = (): void => {
  left!.style.opacity = "0";
  right!.style.opacity = "0";
  setTimeout(() => {
    document.body.innerHTML = "";
    renderGame();
    gameMainProcess();
  }, 400);
};

const renderGame = (): void => {
  const gameWrapper: div = document.createElement("div");
  const list: div = document.createElement("div");
  const p1_list: div = document.createElement("div");
  const p2_list: div = document.createElement("div");
  const ui: div = document.createElement("div");
  const p1: div = document.createElement("div");
  const p2: div = document.createElement("div");
  const h1: HTMLHeadingElement | null = document.createElement("h1");
  const h12: HTMLHeadingElement | null = document.createElement("h1");
  const btn1: HTMLButtonElement | null = document.createElement("button");
  const btn2: HTMLButtonElement | null = document.createElement("button");
  const score1: HTMLHeadingElement | null = document.createElement("h1");
  const score2: HTMLHeadingElement | null = document.createElement("h1");
  const h21: HTMLHeadingElement | null = document.createElement("h2");
  const h22: HTMLHeadingElement | null = document.createElement("h2");
  h21.innerText = "Q - ✌ | W - ✋ | E - ✊";
  h22.innerText = mode === 'player' ? "I - ✌ | O - ✋ | P - ✊" : '';
  list.classList.add("list");
  p1.classList.add("p1");
  p2.classList.add("p2");
  p1_list.classList.add("p1_list");
  p2_list.classList.add("p2_list");
  list.appendChild(p1_list);
  list.appendChild(p2_list);
  score1.innerText = "0";
  score1.id = "sp1";
  score1.classList.add("score");
  score2.innerText = "0";
  score2.id = "sp2";
  score2.classList.add("score");
  btn1.id = "p1";
  btn1.classList.add("ready");
  btn2.id = "p2";
  btn2.classList.add("ready");
  h1.innerText = "Player 1";
  p1.appendChild(h1);
  p1.appendChild(h21);
  p1.appendChild(btn1);
  p1.appendChild(score1);
  h12.innerText = mode === 'player' ? "Player 2" : 'AI';
  p2.appendChild(h12);
  p2.appendChild(h22);
  p2.appendChild(btn2);
  p2.appendChild(score2);
  gameWrapper.classList.add("gameWrapper");
  ui.classList.add("ui");
  ui.appendChild(p1);
  ui.appendChild(p2);
  gameWrapper.appendChild(ui);
  gameWrapper.appendChild(list);
  document.body.appendChild(gameWrapper);
};

const gameMainProcess = (): void => {
  const readyButton1: HTMLElement | null = document.getElementById("p1");
  const readyButton2: HTMLElement | null = document.getElementById("p2");
  let playerState: { ready: boolean; choosedHand: string }[] = [
    {
      ready: false,
      choosedHand: "",
    },
    {
      ready: false,
      choosedHand: "",
    },
  ];

  document.body.addEventListener("keypress", (e) => {
    switch (e.keyCode) {
      case 113:
        playerState[0].ready = true;
        playerState[0].choosedHand = "✌";
        break;
      case 119:
        playerState[0].ready = true;
        playerState[0].choosedHand = "✋";
        break;
      case 101:
        playerState[0].ready = true;
        playerState[0].choosedHand = "✊";
        break;

      case 105:
        if (mode === "player") {
          playerState[1].ready = true;
          playerState[1].choosedHand = "✌";
        }

        break;
      case 111:
        if (mode === "player") {
          playerState[1].ready = true;
          playerState[1].choosedHand = "✋";
        }

        break;
      case 112:
        if (mode === "player") {
          playerState[1].ready = true;
          playerState[1].choosedHand = "✊";
        }

        break;
    }
    if (mode === "ai") {
      if (playerState[0].ready === false) return;
      let id = Math.floor(Math.random() * 3);
      switch (id) {
        case 0:
          playerState[1].ready = true;
          playerState[1].choosedHand = "✌";
          break;
        case 1:
          playerState[1].ready = true;
          playerState[1].choosedHand = "✋";
          break;
        case 2:
          playerState[1].ready = true;
          playerState[1].choosedHand = "✊";
          break;
      }
    }
    if (playerState[0].ready === true) {
      readyButton1!.style.backgroundColor = "#38D108";
    }

    if (playerState[1].ready === true) {
      readyButton2!.style.backgroundColor = "#38D108";
    }

    if (playerState[0].ready === true && playerState[1].ready === true) {
      const p1 = document.querySelector(".p1_list");
      const p2 = document.querySelector(".p2_list");
      const h1p1 = document.createElement("h1");
      const h1p2 = document.createElement("h1");

      h1p1.innerText = playerState[0].choosedHand;
      h1p2.innerText = playerState[1].choosedHand;

      if (playerState[0].choosedHand === "✊") {
        if (playerState[1].choosedHand === "✌") winner = "Player 1";
        else if (playerState[1].choosedHand === "✋") winner = "Player 2";
        else winner = "Draw";
      } else if (playerState[0].choosedHand === "✌") {
        if (playerState[1].choosedHand === "✋") winner = "Player 1";
        else if (playerState[1].choosedHand === "✊") winner = "Player 2";
        else winner = "Draw";
      } else {
        if (playerState[1].choosedHand === "✊") winner = "Player 1";
        else if (playerState[1].choosedHand === "✌") winner = "Player 2";
        else winner = "Draw";
      }
      const sp1: HTMLHeadingElement | null = document.querySelector("#sp1");
      const sp2: HTMLHeadingElement | null = document.querySelector("#sp2");
      switch (winner) {
        case "Player 1":
          score[0]++;
          break;
        case "Player 2":
          score[1]++;
          break;
        case "Draw":
          score[0]++;
          score[1]++;
          break;
      }
      sp1!.innerText = String(score[0]);
      sp2!.innerText = String(score[1]);
      p1!.innerHTML = "";
      p2!.innerHTML = "";

      p1?.appendChild(h1p1);
      p2?.appendChild(h1p2);

      playerState.forEach((item) => (item.ready = false));
      setTimeout(() => {
        readyButton1!.style.backgroundColor = "#D12008";
        readyButton2!.style.backgroundColor = "#D12008";
      }, 250);
    }
  });
};
