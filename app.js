// app-1.js, app-2.js ... 조각을 순서대로 모아서 실행
// (회사 네트워크에서 한 번에 올릴 수 있는 크기 때문에 나눔. 조각 수가 바뀌어도 이 파일은 그대로 둬도 돼요)
try {
  const texts = [];
  for (let i = 1; i <= 30; i++) {
    let r;
    try {
      r = await fetch("./app-" + i + ".js", { cache: "no-cache" });
    } catch (e) {
      r = null;
    }
    if (!r || !r.ok) break;
    texts.push(await r.text());
  }
  if (!texts.length) throw new Error("app-1.js");
  const url = URL.createObjectURL(new Blob([texts.join("")], { type: "text/javascript" }));
  await import(url);
} catch (e) {
  const b = document.getElementById("boot");
  if (b) b.textContent = "앱 파일을 불러오지 못했어요 (" + (e && e.message) + "). 파일 이름과 내용을 확인해 주세요.";
  console.error(e);
}
