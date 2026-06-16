# 马太 18:15-35 查经 HTML 网页 PPT

静态 HTML deck，可直接用 Cloudflare Pages 部署。

## 打开

- 根目录 `index.html` 会自动跳转到 `examples/matthew-18-study/`
- 也可以直接打开 `examples/matthew-18-study/index.html`

## 键盘

- 左右键 / Space：翻页
- `S`：演讲者视图，包含当前页、下一页、讲者 notes 和计时器
- `T`：切换暖色主题
- `F`：全屏
- `O`：总览

## 结构

- `slides-data.js`：48 页查经内容
- `deck-build.js`：根据数据生成 HTML PPT slides
- `deck-animations.js`：GSAP 分段入场动画
- `style.css`：暖色教学风主题
- `assets/images/`：AI 生成的四张章节图
- `assets/html-ppt/`：vendored HTML PPT runtime、主题和动画资源

## Image Prompts Used

1. Cover: Warm cinematic photograph of an open Bible on a wooden table, soft morning window light, ceramic mug, subtle paper notes, warm terracotta and amber palette, reverent small group Bible study atmosphere, no readable text, no logo, no people faces, realistic, high detail, 1920x1080.
2. Section 1: Warm editorial scene of two chairs beside an open Bible and notebook in a quiet church room, suggesting private restoration and gentle correction, soft amber light, olive green and terracotta accents, no readable text, no logos, realistic.
3. Section 2: Warm photograph of a small group praying around an open Bible, hands visible but faces not prominent, gentle church fellowship setting, sunlight, reverent and calm, no readable text, no logo, realistic.
4. Section 3: Warm symbolic still life of a ledger with a large forgiven debt idea, a few small coins nearby, open Bible in background softly out of focus, amber light, no readable text except abstract marks, no logo, realistic.
