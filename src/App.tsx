import { useMemo, useState } from 'react'
import './App.css'

const allQuestion = [
  "いま なに が いちばん ほしい ですか。(lesson 13) ",
  "しゅうまつ は なに を します か。",
  "ソンクランやすみ は どこか いきましたか。",
  "あついですね。エアコンを つけましょうか。",
  "(look at the picture) 〜さん は なに を していますか。",
  "いま、あめ が ふっていますか。",
  "すみません。この カタカナ の よみかた を おしえてください。(lesson 14)",
  "ここ に なまえ を かいてください。",
  "くるま を もっています か。",
  "ごかぞく は なんにん ですか。",
  "おとうさん は どこ で はたらいていますか。",
  "おとうさん の おしごと は なん ですか。",
  "おねえさん は けっこん していますか。",
  "Sala prakaew を しっていますか。",
  "〜さん の でんわ ばんごう を しっていますか。",
  "どこ に すんでいますか。",
  "Toyoya は なに を つくっていますか。",
  "きのう は なに を しましたか",
  "だいがく まで どうやって いきますか。",
  "バンコク は どんな まち ですか。",
  "〜さん の へや は どんな へや ですか。",
  "〜さん は どんな ひと ですか。",
  "〜さん、ひるごはん を たべ に いきませんか。",
  "いらっしゃいませ！ごちゅうもん は？",
  ". (after the meal, you want to pay the bill separately) (lesson 13) ３０００えん です。",
  "we are friends. (lesson 13) のど が かわきましたね。",
  "にもつ が おおい ですね。もちましょうか。",
  "go straight and turn left (right) at the traffic light. stop in the front of that flower shop.",
  "(at the immigration control) パスポートを みせてください。",
  "すみません。ちょっと おかね を かしてください。(lesson 14)",
  "You want to take a photo but don't know if you can do that. Ask for permission. (lesson 15) use a computer",
  "You want to take a photo but don't know if you can do that. Ask for permission. (lesson 15) use a pen"
]

function App() {
  const [count, setCount] = useState<number>(0);
  const randomWord = useMemo(() => allQuestion[Math.floor(Math.random() * (allQuestion.length))], [count])

  return (
    <div className='w-full h-screen'>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col gap-3 border-2 rounded max-w-7xl w-2/5 p-10">
          <div className='font-bold text-3xl flex justify-center'>
            {randomWord}
          </div>
          <span className="font-thin m-auto">
            Number: {count+1}
          </span>
          <button onClick={() => setCount((current) => current + 1)} className="btn btn-primary max-w-60 m-auto">
            Next Question
          </button>
        </div>
      </div>
    </div >
  )
}

export default App
