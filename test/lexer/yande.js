event [me, msg] (u,m:"^/baka yande.re") => {
  url = "https://yande.re/post.json?limit=1&page=" + Math.floor(Math.random() * 1e4)
  $.get(url, d => drrr.dm(u,".",d[0].preview_url))
}
