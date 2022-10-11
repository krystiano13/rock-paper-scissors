if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
    document.body.innerHTML = "";
    const h1 = document.createElement('h1');
    h1.style.margin = '0';
    h1.style.textAlign = 'center';
    h1.style.marginTop = '25vh';
    h1.innerText = "Sorry , this app doesn't support mobile devices";
    document.body.appendChild(h1);
}
