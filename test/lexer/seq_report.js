// usage: timer
// 1, "script", ["timer/seq_report.js"]

if !env.init then{
  env.init = true;
  env.count = 0;
}

sents = [ "sent 1"
        , "sent 2"
        , "sent 3"
        , "sent 4"
        ]

drrr.print(sents[env.count])
env.count = (env.count + 1) % sents.length
