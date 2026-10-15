// app-1.js ~ app-5.js 조각을 모아서 실행 (GitHub 웹 편집기 크기 제한 때문에 나눔)
const PARTS = 5;
try {
  const texts = await Promise.all(
    Array.from({ length: PARTS }, (_, i) =>
      fetch("./app-" + (i + 1) + ".js", { cache: "no-cache" }).then((r) => {
        if (!r.ok) throw new Error("app-" + (i + 1) + ".js");
        return r.text();
      })
    )
  );
  const url = URL.createObjectURL(new Blob([texts.join("")], { type: "text/javascript" }));
  await import(url);
} catch (e) {
  const b = document.getElementById("boot");
  if (b) b.textContent = "앱 파일을 불러오지 못했어요 (" + (e && e.message) + "). 파일 이름과 내용을 확인해 주세요.";
  console.error(e);
}
