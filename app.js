// app-1.js, app-2.js ... 조각을 모아서 실행
// 마지막 조각 끝의 표시(jt-end)까지만 읽어서, 예전 조각이 남아 있어도 섞이지 않아요.
// 조각 수가 바뀌어도 이 파일은 다시 고칠 필요가 없어요.
const END = "/*jt-end*/";
const get = (i) =>
  fetch("./app-" + i + ".js", { cache: "no-cache" })
    .then((r) => (r.ok ? r.text() : null))
    .catch(() => null);
try {
  const texts = [];
  let done = false;
  for (let start = 1; start <= 40 && !done; start += 6) {
    const batch = await Promise.all([0, 1, 2, 3, 4, 5].map((k) => get(start + k)));
    for (const t of batch) {
      if (t == null) {
        done = true;
        break;
      }
      texts.push(t);
      if (t.includes(END)) {
        done = true;
        break;
      }
    }
  }
  if (!texts.length) throw new Error("app-1.js");
  if (!texts[texts.length - 1].includes(END)) throw new Error("app-" + (texts.length + 1) + ".js 없음");
  const url = URL.createObjectURL(new Blob([texts.join("")], { type: "text/javascript" }));
  await import(url);
} catch (e) {
  const b = document.getElementById("boot");
  if (b) b.textContent = "앱 파일을 불러오지 못했어요 (" + (e && e.message) + "). 파일 이름과 내용을 확인해 주세요.";
  console.error(e);
}
