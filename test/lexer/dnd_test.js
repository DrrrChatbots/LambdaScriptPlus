// usage:
//   dnd_test();

// from https://unnamed42.github.io/2016-06-30-%E5%AE%98%E6%96%B9%E7%89%88DnD%E9%98%B5%E8%90%A5%E6%B5%8B%E8%AF%95.html

records = {}

query = [{"chapter": "第一卷：對親戚的看法",
  "questions": [{"options": [{"infl": "xg",
                              "value": "2",
                              "text": "接受批評，改變方法"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "嘗試與長輩妥協，用折衷的方法"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "忽略長輩的輕蔑，誹謗他們"},
                             {"infl": "xe",
                              "value": "2",
                              "text": "千方百計使他們收聲"}],
                 "text": "長輩在家族中公開反對你，你會："},
                {"options": [{"infl": "xg",
                              "value": "2",
                              "text": "不用想，肯定會"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "會，但有點不情願"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "除非我肯定我會很快重回工作崗位"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "不會"}],
                 "text": "你會放棄一個前途無量的職業來幫忙解決家庭的燃眉之急嗎？"},
                {"options": [{"infl": "xe",
                              "value": "2",
                              "text": "會，不帶一點罪惡感"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "會——只要我能秘密行事"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "我會抗拒這誘惑"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "我認為這個主意極為可恨"}],
                 "text": "你會為了前途而背叛家人嗎？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "他們的言語指導著我的行動"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "他們是我的榜樣"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "他們通常都與我無關"},
                             {"infl": "cx",
                              "value": "2",
                              "text": "我當他們透明"}],
                 "text": "你尊敬一家之主嗎？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "聽從安排，為能幫助家族而自豪"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "會，但強顏歡笑"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "巧妙地抗婚"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "逃跑"}],
                 "text": "如果家族要你與一個令人作嘔的家夥結婚，你會："},
                {"options": [{"infl": "cx",
                              "value": "2",
                              "text": "與他談談，但堅守立場"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "不跟他說話"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不計前嫌敞開心扉地討論前事"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "積極進行和解，並留心聽他的遺言"}],
                 "text": "有一位家人疏遠了你。在他彌留之際，他想與你和解。你會："}]},
 {"chapter": "第二卷：對朋友的看法",
  "questions": [{"options": [{"infl": "xe",
                              "value": "2",
                              "text": "照做，然後拿錢"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "拿錢照做，但盡量使證詞顯得無力"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "拒絕"},
                             {"infl": "xg",
                              "value": "2",
                              "text": "不管結果如何，都站在朋友那一邊"}],
                 "text": "一個位高權重的腐敗法官允諾如果你能作對你朋友不利的假證，他便給你一大筆錢。你會："},
                {"options": [{"infl": "xg",
                              "value": "2",
                              "text": "我有一大群密友"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "我有些密友"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "我有幾個密友"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "我會與人保持距離"}],
                 "text": "你會親近朋友，還是與大部分人保持一段距離以保安全？"},
                {"options": [{"infl": "xe",
                              "value": "2",
                              "text": "我幹過不止一次，有時也能逃避懲罰"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "我只幹過那麽一次"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "我曾被慫恿過這麽做，但從未做過"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "我從未考慮過這種事"}],
                 "text": "你背叛過朋友嗎？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "我曾有過或正渴望著這麽一段羅曼史"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "這種羅曼史挺理想的——如果能成功的話"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "我擔心我會錯過其他人對我的愛"},
                             {"infl": "cx",
                              "value": "2",
                              "text": "作繭自縛？真是天大的錯誤"}],
                 "text": "你怎麽看待“執子之手，與子偕老”這類對愛人的終生承諾？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "會，而且寫好借據，不得抵賴"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "會，但期限上會寬松些"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不會，盡管還了會更好"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "不會，他們欠我一個人情"}],
                 "text": "朋友借了你錢，你會要他們還嗎？"},
                {"options": [{"infl": "nx",
                              "value": "2",
                              "text": "是的，我們定期通信"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "是的，我們努力保持聯絡"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "不會，我經常搬家"},
                             {"infl": "cx",
                              "value": "2",
                              "text": "不會，我不再與他們有共同之處"}],
                 "text": "你仍與兒時玩伴保持聯絡嗎？"}]},
 {"chapter": "第三卷：對集體的看法",
  "questions": [{"options": [{"infl": "xg",
                              "value": "2",
                              "text": "會，我會優先考慮集體的需要"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "如果我的需求被滿足的話，我會盡我所能"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "不會，我沒錢也不閑"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "不會，花時間和金錢在集體上是一種浪費"}],
                 "text": "你會花時間和金錢在集體上嗎？"},
                {"options": [{"infl": "xg",
                              "value": "2",
                              "text": "保衛它直至自己的最後一口氣"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "和殘存同伴構築防禦"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "一看到勢頭不對就逃跑"},
                             {"infl": "xe",
                              "value": "2",
                              "text": "與入侵者達成協議，成為間諜"}],
                 "text": "集體面臨被侵害的威脅，你會："},
                {"options": [{"infl": "xn",
                              "value": "2",
                              "text": "會的，因為他們知道我也會為他們做同樣的事"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "會的，因為我很受歡迎"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "可能不會，因為我不受信任"},
                             {"infl": "xe",
                              "value": "2",
                              "text": "肯定不會，我在集體中樹敵了"}],
                 "text": "如果你受傷了，需要急救，你的同伴願意幫助你嗎？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "毋庸置疑，是的"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "是的，總的來說他們是最佳的管理方式"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "當它適合我時，我才會——有些規章我並不認同"},
                             {"infl": "cx",
                              "value": "2",
                              "text": "我不關心他們；他們拿我沒轍"}],
                 "text": "你尊重集體的規章和領袖嗎？"},
                {"options": [{"infl": "cx",
                              "value": "2",
                              "text": "是的，這些井底之蛙不會理解超規格的人"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "有些會，因為並不是所有人都認同我"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不會，我看起來一切正常"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "不會，我就是集體中的正常人的標準"}],
                 "text": "同伴回避你，或嘲笑你嗎？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "做這種事是我所樂意接受的榮譽"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "當然。這是每個人的義務"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不會，除非無人能接手此事"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "不會，我不想為集體利益負責"}],
                 "text": "你當官會為民作主，或者希望代表集體的意志嗎？"}]},
 {"chapter": "第四卷：對國家的看法",
  "questions": [{"options": [{"infl": "xg",
                              "value": "2",
                              "text": "與其他人共享自己有的食物"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "自己吃盡可能少，余下的給其他人"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "偷取自己生存所需食物"},
                             {"infl": "xe",
                              "value": "2",
                              "text": "偷取盡可能多的食物，然後高價賣出"}],
                 "text": "你的國家鬧饑荒，你會："},
                {"options": [{"infl": "xe",
                              "value": "2",
                              "text": "會，類似的事我幹過了"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "如果我能逃避懲罰的話，我會的"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "不會，盡管我覺得這一大筆錢很誘人"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "不會，而且我會叫國王小心這個陰謀"}],
                 "text": "給你足夠的錢，你會往國王的酒中下毒嗎？"},
                {"options": [{"infl": "xg",
                              "value": "2",
                              "text": "接下尋求解藥的危險任務"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "盡力治好病人"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "避免接觸到病人"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "逃離國家"}],
                 "text": "瘟疫傳遍你的國家，你會："},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "是的，X主席萬歲！"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "是的，我們的統治者大體上是公平、公正的"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "不會，統治者還不是人一個！"},
                             {"infl": "cx",
                              "value": "2",
                              "text": "不會，權力必定導致腐化"}],
                 "text": "你尊重領主的法律權威嗎？"},
                {"options": [{"infl": "cx",
                              "value": "2",
                              "text": "會，因為我的國家勢必任人魚肉"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "會，因為國家機密對我無關緊要"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不會，我會被抓的"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "不會，我不會辜負國家對我的信任"}],
                 "text": "給你一筆穩賺的生意，你會為敵國做間諜嗎？"},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "是的，因為維護法律比任何個人爭執重要"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "是的，因為法庭就是為了解決這種爭執而設立的"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "你在開玩笑嗎？政府連路都不會鋪"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "絕對不會，如果我自己不能保護個人所有，我就無權擁有它"}],
                 "text": "你依靠政府來建立社會契約和保障所有權嗎？"}]},
 {"chapter": "第五卷：對刑罰的看法",
  "questions": [{"options": [{"infl": "xe",
                              "value": "2",
                              "text": "會，服刑這麽多年等於鎖住自己"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "會，在犯事時便已知道這風險了"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "不會，除非只造成容易愈合的小傷"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "不會，那些守衛只是在盡本分而已"}],
                 "text": "如果你入獄了，你會傷害或殺死其他人而脫獄嗎？"},
                {"options": [{"infl": "xn",
                              "value": "2",
                              "text": "是的，很幸運，貴族們投了個好胎"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "是的，有時要靠嚇，他們才肯幹活"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "不會，貴族應仁慈地統治"},
                             {"infl": "xg",
                              "value": "2",
                              "text": "任何人都無權惡劣對待別人。以上。"}],
                 "text": "你接受貴族有權惡劣對待手下的仆人嗎？"},
                {"options": [{"infl": "xg",
                              "value": "2",
                              "text": "認罪，並向受害者賠償"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "認罪，向法官請求寬大處理"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "隱瞞自己的涉案事實，必要時說謊"},
                             {"infl": "xe",
                              "value": "2",
                              "text": "嫁禍於人"}],
                 "text": "你意外地犯罪了，你會："},
                {"options": [{"infl": "lx",
                              "value": "2",
                              "text": "會，因為我有這個責任"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "會，因為我會因此獲得輕判"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不會，我會等到檢察官證明我有罪"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "不會，我會證明我“無罪”的"}],
                 "text": "如果犯罪了，你會認罪嗎？"},
                {"options": [{"infl": "cx",
                              "value": "2",
                              "text": "會，我寧願受罰也不願保持沈默"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "會，總要有人說真話"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "不會，盡管私底下我會對朋友說"},
                             {"infl": "nx",
                              "value": "2",
                              "text": "不會，不值得為政治費神"}],
                 "text": "如果可能被懲罰，你會表明一個革命性的政見嗎？"},
                {"options": [{"infl": "cx",
                              "value": "2",
                              "text": "連夜溜走，避免作證"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "說自己什麽也沒看到"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "勉強留下，作證，然後離開"},
                             {"infl": "lx",
                              "value": "2",
                              "text": "留下直至結案所需證供足夠"}],
                 "text": "旅行時，你目擊了一場襲擊。你被傳去作證，這會非常耽誤你的行程。你會："}]},
 {"chapter": "第六卷：對財富的看法",
  "questions": [{"options": [{"infl": "xg",
                              "value": "2",
                              "text": "幫助窮人和不幸的人"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "滿足親朋戚友需要"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "讓自己達到人生巔峰"},
                             {"infl": "xe",
                              "value": "2",
                              "text": "不僅達到巔峰，還要阻止別人超過自己"}],
                 "text": "財富的最大用途是什麽？"},
                {"options": [{"infl": "xg",
                              "value": "2",
                              "text": "慷慨地給錢"},
                             {"infl": "xg",
                              "value": "1",
                              "text": "恰到好處地給錢"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "只給我認為無所謂的錢——至多一兩塊"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "視而不見"}],
                 "text": "遇到乞丐，你會："},
                {"options": [{"infl": "xe",
                              "value": "2",
                              "text": "會，而且我還要盡可能地消費"},
                             {"infl": "xe",
                              "value": "1",
                              "text": "會，但只騙富商"},
                             {"infl": "xn",
                              "value": "1",
                              "text": "不會，風險太大了"},
                             {"infl": "xn",
                              "value": "2",
                              "text": "不會，商人也要養家糊口啊"}],
                 "text": "通過魔法，你可以使村里的商人們以為你的銅幣是金幣。你會這樣做嗎？"},
                {"options": [{"infl": "nx",
                              "value": "2",
                              "text": "肯定是更賺錢的那份；穩定的工作聽上去像苦差事"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "可能是前者，盡管我會看看後者幹些什麽"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "後者，除非前者賺的錢多到嚇死人"},
                             {"infl": "lx",
                              "value": "2",
                              "text": "肯定是穩定的那份，因為我有長遠的計劃"}],
                 "text": "你有兩份工作可供選擇。一份酬勞更多，另一份較穩定。你會選哪一份？"},
                {"options": [{"infl": "cx",
                              "value": "2",
                              "text": "這關乎天時地利，還有一時運氣"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "靈活變通會有更多機會"},
                             {"infl": "lx",
                              "value": "1",
                              "text": "按照一個有適度風險的長期計劃來做"},
                             {"infl": "lx",
                              "value": "2",
                              "text": "努力工作，堅持不懈"}],
                 "text": "最佳的致富途徑是什麽？"},
                {"options": [{"infl": "nx",
                              "value": "2",
                              "text": "會，我說話算數"},
                             {"infl": "nx",
                              "value": "1",
                              "text": "會，因為人家會認為我信得過，這很好"},
                             {"infl": "cx",
                              "value": "1",
                              "text": "你可以賭我會否爽約"},
                             {"infl": "cx",
                              "value": "2",
                              "text": "如果這不是什麽好差事，那算了吧"}],
                 "text": "如果你接手一項工作，盡管它會很危險，你會努力完成嗎？"}]}]
alignments = {
    lg: {
        name: "守序善良",
        value: 0,
        description: "守序善良的人物相信，規律而強大的社會和高尚的政府，可以讓大多數人民生活得更好。只要人們相信法律，並試著互相幫助，整個社會就將因此而進步。因此，這個陣營的人物將會朝著這個方向努力，他們會盡可能地為大多數人帶來較多的福利及較少的傷害。他們必定信守自己的承諾。守序善良的人物，特別是聖武士，時常自己陷於善良與法律相沖突的兩難處境。比如履行誓言可能會傷及無辜時，或在宗教法規和地方法律相矛盾時。"
    },
    ng: {
        name: "中立善良",
        value: 0,
        description: "中立善良的人物相信力量平衡是十分重要的事，單方面地強調秩序或混亂，是無法達到至善的。因為整個宇宙中充滿了朝著各式各樣的目標而努力的生物，所以若要追求至善，便不能破壞這種平衡，甚至的設法維持這種平衡，如果說支持社會秩序可以帶來至善，便得以為之。若推翻既有的社會秩序就可以達到至善，那也必須為之。社會結構對他們來說，沒什麽重大意義。中立善良的長處是，行善不為階級偏見所影響。"
    },
    cg: {
        name: "混亂善良",
        value: 0,
        description: "混亂善良的人物雖然喜歡按照自己的意思行事，心地卻不錯。盡管他們認同一切美德和公理，卻不願意受到律法和規範的約束。想要任意驅使這些人，要他們遵照命令做事是不可能的。這些人有自己的一套道德標準，雖然不至於為惡，但也不見得和一般大眾的道德標準完全相同。混亂善良人物常會因為感到受人指使而在團隊內制造矛盾，比起有計劃的行動他們更喜歡即興发揮。混亂善良陣營的人物不介意用惡毒的手段制裁他們認為是邪惡的人，即便並不喜歡這樣做，但他們本身卻並不帶有惡意。"
    },
    ln: {
        name: "守序中立",
        value: 0,
        description: "守序中立的人物而言，秩序和組織是非常重要的。他們認同強大、井然有序的統治階層，不管這個統治階層是專制的暴君，還是安和樂利的民主政府，這些人都不在乎，世界上必須有法律，而法律則必須被遵守。對他們而言，絕對的秩序比什麽道德良知來的重要。只要是規定，不管結果是好是壞，都必須遵行無誤。絕對公正的法官，和絕對服從命令的士兵，都是此陣營的最佳典範。守序中立對善惡持中立態度，但這不代表他們是不道德的、是道德虛無主義者或是沒有道德立場。他們只不過是將道德觀念永遠置於服從信條、傳統或者法律之下。他們通常有強烈的倫理信條，但這一信條是首先基於其信念體系，而非基於善惡認同。"
    },
    nn: {
        name: "絕對中立",
        value: 0,
        description: "絕對中立的人物相信絕對平衡的力量，因此，他們拒絕采取任何被視為邪惡和暴力的行動。絕對中立的人會盡力避免和善良或邪惡，秩序或叛逆的力量合流。有時候他們发現自己被迫得和某個陣營結盟。為了保持平衡，這些人會刻意改變立場，和弱勢者合作。然而，當強弱勢力對換時，他們也會毫不猶豫地跟著改變立場。"
    },
    cn: {
        name: "混亂中立",
        value: 0,
        description: "混亂中立的人按自己一時的興致行動。他是一個完全的個人主義者。他重視自己的自由權利，但並不致力於保護別人的自由。他蔑視權威，憤恨約束並且挑戰傳統。混亂中立者並不會向無政府運動那樣有意瓦解組織。如果這麽做，他必須把自己的陣營轉成善良(希望解放他人)或是邪惡(使異己受苦)。混亂中立的尋常稱謂是“真正混亂”。注意，混亂中立者的行為也許很難預測，但他的舉止並非完全隨機的，他從橋上的走過去的可能性和從橋上跳下去的可能性大小並不相等。混亂中立是一個真正自由於社會約束和對改良社會的空想的陣營。"
    },
    le: {
        name: "守序邪惡",
        value: 0,
        description: "守序邪惡的人有系統地得到他想要的東西，此行為受到他行為準則的限制，但並不顧及受其傷害的人。他關心傳統、忠誠和秩序，但不關心自由、尊嚴和生命。他按規則行動，但沒有憐憫和同情。他覺得待在統治階層里很舒服，願意支配別人，但也樂意為別人服務。他處罰譴責別人並不是根據他們的行為而是根據種族、信仰、祖國或社會階層。他不願違反法律或承諾，這種不願部分是因為他的天性，部分是因為他需要秩序來保護他免受道德上的反對。某些守序邪惡者有特別的禁忌，比如不冷血嗜殺(但讓屬下去做)或不傷害兒童(如果可能的話)。他們認為這些良心上的原則使自己比一般不合人道的惡人水準高。詭計多端擴展自己勢力並他的壓迫人民的貴族是一個守序邪惡的例子。某些守序邪惡的人或生物狂熱的效忠於邪惡，就好像十字軍效忠於良善一樣。傷害別人是他們這麽做的目的，傳播邪惡本身也是他們樂於如此的原因。他們也可能認為行惡是對某種邪惡神明或主人的責任的一部分。守序邪惡有時被稱為“惡魔般的”，因為惡魔是守序邪惡的化身和典型。守序邪惡是一個有方法有意圖並且能常常有所成就的邪惡陣營。"
    },
    ne: {
        name: "中立邪惡",
        value: 0,
        description: "中立邪惡的人物為了自己可以做出任何事，一切都是為了自己，就這麽簡單。他們從不為死在手下的人掉淚，不論是為財、為了高興或只是為了方便。他們不喜歡紀律，也不遵守法律、傳統或任何高貴的信念。然而，他們也不像混亂邪惡者那樣浮躁不安，或熱愛沖突。有些中立邪惡者將邪惡視為一種理想，想要獻身於邪惡。這種惡人大多是邪惡神祇或秘密組織的成員。一般人習慣將中立邪惡稱為“真正的邪惡”。中立邪惡的可怕在於表現出全然的邪惡，完全沒有榮譽感和對象區別。"
    },
    ce: {
        name: "混亂邪惡",
        value: 0,
        description: "混亂邪惡的人物會因為貪婪、憎恨或欲望而做出任何事。他暴躁易怒、滿懷惡意、獨斷暴力而且無法預料。為了得到想要的東西，他會沖動而魯莽地行動，散播邪惡與混亂。所幸他的計劃大多雜亂無章，其團體大多組織散亂。一般而言，混亂邪惡者只有被強迫時才會與人合作，其領袖常要面對鬥爭與暗殺。混亂邪惡的可怕在於不僅破壞美麗與生命，也破壞了美麗與生命賴以存在的秩序。"
    }
}


chunkString = (size, str) => {
  pos = 0; chunks = []
  while pos < str.length {
    chunks.push(str.substr(pos, size))
    pos += size
  }
  return chunks
}

batch_print = msg => {
  buffer = ""; msgs = []
  msg.split("。").forEach(ctx => {
    if ctx.length then
      chunkString(120, ctx + "。").forEach(chk => {
        if (buffer.length + chk.length) > 120
        then { msgs.push(buffer); buffer = chk }
        else { buffer = buffer + chk; }
      })
  })
  if(buffer.length) then msgs.push(buffer)
  msgs.reverse();
  msgs.forEach(m => drrr.print(m))
}


prev_question = record => {
  record.qs -= 1
  if record.qs < 0
  then { record.ch -= 1; record.qs = query[record.ch].questions.length - 1 }
  if record.ch < 0
  then { record.ch = 0; record.qs = 0; false }
  else true
}

next_question = record => {
  record.qs += 1
  if record.qs >= query[record.ch].questions.length
  then { record.ch += 1; record.qs = 0 }
  if record.ch >= query.length
  then false
  else true
}

ask = record => {
  if record.qs == 0 then drrr.dm(record.name, query[record.ch].chapter)
  text = query[record.ch].questions[record.qs].text + "\n"
  text += query[record.ch].questions[record.qs].options.map(
    (opt, index) => (index + 1) + ". " + opt.text).join("\n")
  drrr.dm(record.name, text)
}

judge = rec => {
  a = false; pos = false; t = ""; r = ""; e = false
  Object.keys(alignments).forEach(i => {
      r = i.charAt(0) + "x"
      t = "x" + i.charAt(1)
      c = rec.score[r] + rec.score[t]
      alignments[i].value = c
      if c > a then { a = c; pos = i }
  })
  Object.keys(alignments).forEach(attr => {
      if alignments[attr].value == a then r += 1
  })
  if r != 0 then {
    pos = if rec.score.lx > rec.score.nx && rec.score.lx > rec.score.cx then "l"
        else (if rec.score.cx > rec.score.nx && rec.score.cx > rec.score.lx
                then "c" else "n")
    pos += if rec.score.xg > rec.score.xe && rec.score.xg > rec.score.xn then "g"
        else (if rec.score.xe > rec.score.xn && rec.score.xe > rec.score.xg
                then "e" else "n")
  }
  posEntry = alignments[pos];

  attrDesc = (attr, val) =>
    attr + "：" + "X".repeat(Math.floor(val / 4)) + "(" + val + ")\n";

  t = "#### 陣營傾向：\n"
  Object.keys(alignments).forEach(attrName => {
    attr = alignments[attrName];
    t += attrDesc(attr.name, attr.value)
  })
  drrr.print(t);

  t = "### 詳細得分：\n"
  t += "#### 守序與混亂：\n"
  t += attrDesc("守序", rec.score.lx)
  t += attrDesc("中立", rec.score.nx)
  t += attrDesc("混亂", rec.score.cx)
  t += "#### 善良與邪惡：\n";
  t += attrDesc("善良", rec.score.xg)
  t += attrDesc("中立", rec.score.xn)
  t += attrDesc("邪惡", rec.score.xe)
  drrr.print(t);

  t = "你的陣營是：" + posEntry.name + "\n";
  t += "> " + posEntry.description "\n"
  batch_print(t);
}

dnd_test = () => {

  event [msg, me, dm] (user, cont: "^/start\\s*$") => {
    records[user] = {
      name: user,
      answers: [],
      ch: 0, qs: 0,
    }
    ask(records[user])
  }

  event [me, msg, dm] (user, cont: "^[1234]\\s*$") => {
    if !(user in records) then drrr.dm(user, "/start first");
    else{
      record = records[user]
      ques = query[record.ch].questions[record.qs]
      opt = parseInt(cont) - 1
      val = parseInt(ques.options[opt]["value"])
      record.answers.push([ques.options[opt]["infl"], val, opt])
      if next_question(record)
      then ask(record)
      else {
        record.score = { cx: 0, lx: 0, nx: 0, xe: 0, xg: 0, xn: 0 }
        record.answers.forEach(ans => record.score[ans[0]] += ans[1])
        judge(record);
      }
    }
  }

  event [me, msg, dm] (user, cont: "^/back\\s*$") => {
    if !(user in records) then drrr.dm(user, "/start first");
    else{
      record = records[user]
      if prev_question(record)
      then record.answers.pop()
      else drrr.dm(user, "no previous question!")
      ask(record)
    }
  }

  event [me, msg, dm] (user, cont: "^/log\\s*$") => {
    if !(user in records) then drrr.dm(user, "/start first");
    else{
      record = records[user]
      drrr.dm(user, record.answers.map((ans, index) =>
        String(index + 1) + ":" + (ans[2] + 1)).join(", "))
    }
  }

  event [msg, me, dm] (user, cont: "^/help\\s*$") => {
    drrr.print("1 2 3 4 擇一答題\n/start 重新開始\n/back 上一題\n/log 答題紀錄")
  }
}

// dnd_test();
