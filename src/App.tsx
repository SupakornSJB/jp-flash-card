import { useMemo, useState } from 'react'
import './App.css'

const allQuestion = [
  "いま なに が いちばん ほしい ですか。",
  "しゅうまつ は なに を します か。",
  "ソンクランやすみ は どこか いきましたか。",
  "あついですね。エアコンを つけましょうか。",
  "(look at the picture) 〜さん は なに を していますか。",
  "いま、あめ が ふっていますか。",
  "すみません。この カタカナ の よみかた を おしえてください。",
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
  ". (after the meal, you want to pay the bill separately) ３０００えん です。",
  "we are friends. のど が かわきましたね。",
  "にもつ が おおい ですね。もちましょうか。",
  "go straight and turn left (right) at the traffic light. stop in the front of that flower shop.",
  "(at the immigration control) パスポートを みせてください。",
  "すみません。ちょっと おかね を かしてください。",
  "You want to take a photo but don't know if you can do that. Ask for permission. use a computer",
  "You want to take a photo but don't know if you can do that. Ask for permission. use a pen"
]

function App() {
  const [count, setCount] = useState<number>(0);
  const randomWord = useMemo(() => allQuestion[Math.floor(Math.random() * (allQuestion.length))], [count])

  return (
    <div className='w-full h-screen'>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col gap-3 border-2 rounded max-w-7xl w-5/6 lg:w-2/5 p-10 sm:w-4/5 ">
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
