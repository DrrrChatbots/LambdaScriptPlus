API_SERVER = "https://drrr-netease.herokuapp.com"

playlists = []
played = []

play_next = () => {
  if( playlists.length) {
    curlist = playlists[0]
    if( curlist.length) {
      playMusic(curlist[0][0], curlist[0][1])
      played.unshif(t(curlist[0])
      curlist.shif(t()
      if( !curlist.length) playlist.shif(t()
    }
  }
}

play_prev = () => {
  if( played.length < 2
 ) {
    if( !playlists.length
   ) playlists.push([])
    playlists[0].unshif(t(played[0])
    played.shif(t()
    playlists[0].unshif(t(played[0])
    played.shif(t()
    play_next()
  }
  else drrr.print("no previous song")
}

play_repeat = () => {
  if( played.length
 ) {
    if( !playlists.length
   ) playlists.push([])
    playlists[0].unshif(t(played[0])
    played.shif(t()
    play_next()
  }
  else drrr.print("no song played")
}

event musicend {
  print("music end")
  play_next()
}

try_next = () => {
  sendTab({
    fn: is_playing
  }, false, (status) => {
    active = status[0]
    after = status[1]
    console.log(active, after);
    if( !active
   ) play_next()
    else print("there's a song playing")
  })
}

fetch_list = id => {
  url = API_SERVER + "/playlist/detail?id=" + id
  print(url)
  $.get(url, d => {
    playlist = d.playlist
    songs = playlist.trackIds.map(track => track.id)
    message = playlist.name + "(" + songs.length + ")"+ "\n" + playlist.description
    drrr.print(message, playlist.coverImgUrl)
    $.get(API_SERVER + "/song/detail?ids=" + songs.join(","),
      data => {
        playlists.push(data.songs.map(s => [s.name, "網 " + s.id]))
        try_next()
      }
    )
  })
}

event [msg, me, dm] (user, cont: "^/list \\d+\\s*$") => {
  fetch_list(cont.split(" ")[1])
}

event [msg, me, dm] (user, cont: "^/next\\s*$") => {
  play_next()
}

event [msg, me, dm] (user, cont: "^/prev\\s*$") => {
  play_prev()
}

event [msg, me, dm] (user, cont: "^/repeat\\s*$") => {
  play_repeat()
}

event [msg, me, dm] (user, cont: "^/del \\d+\\s*$") => {
  if( playlists.length)
    playlists[0].splice(parseInt(cont.split(" ")[1]), 1);
  else drrr.print("no playlist now")
}

event [msg, me, dm] (user, cont: "^/dellist \\d+\\s*$") => {
  playlists.splice(parseInt(cont.split(" ")[1]), 1);
}

event [msg, me, dm] (user, cont: "^/list\\s*$") => {
  if( playlists.length
 ) {
    msg = "current playlist:\n"
    msg += playlists[0]
      .slice(0, 8)
      .map((x, idx) => String(idx) + ". " + x[0])
      .join("\n")
    if( playlists[0].length > 8)
      msg += " ... ..."

    rest = playlists.slice(1)
    if( rest.length)
      msg += rest.map((li, idx)
        => "\nplaylist" + (idx + 1) + ": (" + li.length + ")")
    drrr.print(msg)
  }
  else drrr.print("no playlist now")
}

// fetch_list("3005581883")
