(function () {
  const data = window.MATTHEW18_STUDY_DECK;
  const deck = document.getElementById("deck");

  if (!data || !deck) {
    return;
  }

  const total = data.slides.length;

  function esc(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function paragraphs(text, className = "") {
    if (!text) return "";
    const chunks = Array.isArray(text) ? text : String(text).split(/\n{2,}/);
    return chunks
      .map((line) => `<p${className ? ` class="${className}"` : ""}>${esc(line).replace(/\n/g, "<br>")}</p>`)
      .join("");
  }

  function notes(slide) {
    const content = slide.notes || [];
    return `<aside class="notes">${content.map((item) => `<p>${item}</p>`).join("")}</aside>`;
  }

  function footer(index) {
    return `
      <div class="deck-footer">
        <span>马太 18:15-35 · 查经</span>
        <span class="slide-number" data-current="${index + 1}" data-total="${total}"></span>
      </div>
    `;
  }

  function sidebar(slide, index) {
    const parts = [
      ["intro", "导入"],
      ["restoration", "挽回弟兄"],
      ["authority", "权柄与同在"],
      ["forgiveness", "从心里饶恕"],
      ["close", "应用祷告"]
    ];
    return `
      <aside class="sidebar">
        <div class="brand">Matthew 18</div>
        <h5>查经路线</h5>
        <ul class="obj-list">
          ${parts.map(([key, label]) => {
            const className = key === slide.part ? "current" : parts.findIndex(([p]) => p === key) < parts.findIndex(([p]) => p === slide.part) ? "done" : "";
            return `<li class="${className}">${label}</li>`;
          }).join("")}
        </ul>
        <h5>当前页</h5>
        <p class="dim small">第 ${index + 1} / ${total} 页</p>
      </aside>
    `;
  }

  function scriptureBlock(ref, text) {
    const longClass = text && text.length > 260 ? " long" : "";
    return `
      <div class="scripture-box" data-anim="fade-up">
        <div class="scripture-ref">${esc(ref)}</div>
        <div class="scripture-text${longClass}">${paragraphs(text)}</div>
      </div>
    `;
  }

  function renderCover(slide, index) {
    return `
      <section class="slide cover-slide full" data-title="${esc(slide.dataTitle || slide.title)}">
        <img class="hero-bg" src="${esc(slide.image)}" alt="">
        <div class="hero-shade"></div>
        <div class="cover-content" data-anim="fade-up">
          <p class="kicker">${esc(slide.kicker)}</p>
          <h1 class="h1">${esc(slide.title)}</h1>
          <p class="lede">${esc(slide.subtitle)}</p>
          <div class="pill-row">
            ${slide.pills.map((pill) => `<span class="pill-academic">${esc(pill)}</span>`).join("")}
          </div>
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  function renderIntro(slide, index) {
    return `
      <section class="slide content-slide ${slide.type}" data-title="${esc(slide.dataTitle || slide.title)}">
        ${sidebar(slide, index)}
        <div class="main">
          <p class="kicker">${esc(slide.kicker)}</p>
          <h2 class="h2" data-anim="rise-in">${esc(slide.title)}</h2>
          ${slide.lede ? `<p class="lede">${esc(slide.lede)}</p>` : ""}
          <div class="grid g${slide.cards.length > 3 ? 4 : slide.cards.length} mt-l answer-grid">
            ${slide.cards.map((card) => `
              <div class="concept-box answer-point">
                <span class="card-index">${esc(card.index)}</span>
                <h4>${esc(card.title)}</h4>
                <p>${esc(card.body)}</p>
              </div>
            `).join("")}
          </div>
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  function renderScripture(slide, index) {
    return `
      <section class="slide scripture-slide" data-title="${esc(slide.dataTitle || slide.title)}">
        <img class="section-image" src="${esc(slide.image)}" alt="">
        <div class="main scripture-main">
          <p class="kicker">${esc(slide.kicker)}</p>
          <h2 class="h2" data-anim="rise-in">${esc(slide.title)}</h2>
          ${slide.lede ? `<p class="lede">${esc(slide.lede)}</p>` : ""}
          ${scriptureBlock(slide.ref, slide.scripture)}
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  function renderQuestion(slide, index) {
    return `
      <section class="slide content-slide qa-question" data-title="${esc(slide.dataTitle || `Q${slide.number}`)}">
        ${sidebar(slide, index)}
        <div class="main">
          <p class="kicker">问题 ${String(slide.number).padStart(2, "0")} · 先讨论</p>
          <h2 class="h2 question-title" data-anim="rise-in">${esc(slide.question)}</h2>
          ${scriptureBlock(slide.ref, slide.scripture)}
          <div class="discussion-cue" data-anim="fade-up">先看经文，先回答问题，再翻到下一页看整理答案。</div>
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  function renderAnswer(slide, index) {
    return `
      <section class="slide content-slide qa-answer" data-title="${esc(slide.dataTitle || `A${slide.number}`)}">
        ${sidebar(slide, index)}
        <div class="main">
          <p class="kicker">答案 ${String(slide.number).padStart(2, "0")} · 核心整理</p>
          <h2 class="h2" data-anim="rise-in">${esc(slide.title)}</h2>
          <div class="answer-grid ${slide.points.length > 4 ? "compact" : ""}">
            ${slide.points.map((point, idx) => `
              <div class="concept-box answer-point">
                <span class="card-index">${String(idx + 1).padStart(2, "0")}</span>
                <p>${esc(point)}</p>
              </div>
            `).join("")}
          </div>
          ${slide.takeaway ? `<div class="callout answer-point"><b>这一页要带走：</b>${esc(slide.takeaway)}</div>` : ""}
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  function renderSummary(slide, index) {
    return `
      <section class="slide content-slide summary-slide" data-title="${esc(slide.dataTitle || slide.title)}">
        ${sidebar(slide, index)}
        <div class="main">
          <p class="kicker">${esc(slide.kicker)}</p>
          <h2 class="h2" data-anim="rise-in">${esc(slide.title)}</h2>
          <div class="summary-line">${esc(slide.summary)}</div>
          <div class="grid g3 mt-l">
            ${slide.cards.map((card) => `
              <div class="concept-box answer-point">
                <h4>${esc(card.title)}</h4>
                <p>${esc(card.body)}</p>
              </div>
            `).join("")}
          </div>
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  function renderClosing(slide, index) {
    return `
      <section class="slide closing-slide full" data-title="${esc(slide.dataTitle || slide.title)}">
        <img class="hero-bg" src="${esc(slide.image)}" alt="">
        <div class="hero-shade"></div>
        <div class="closing-content">
          <p class="kicker">${esc(slide.kicker)}</p>
          <h1 class="h1" data-anim="rise-in">${esc(slide.title)}</h1>
          <div class="grid g2 mt-l">
            ${slide.cards.map((card) => `
              <div class="concept-box answer-point">
                <h4>${esc(card.title)}</h4>
                <p>${esc(card.body)}</p>
              </div>
            `).join("")}
          </div>
        </div>
        ${footer(index)}
        ${notes(slide)}
      </section>
    `;
  }

  const renderers = {
    cover: renderCover,
    goals: renderIntro,
    howto: renderIntro,
    scripture: renderScripture,
    question: renderQuestion,
    answer: renderAnswer,
    summary: renderSummary,
    closing: renderClosing
  };

  deck.innerHTML = data.slides
    .map((slide, index) => (renderers[slide.type] || renderIntro)(slide, index))
    .join("");
})();

