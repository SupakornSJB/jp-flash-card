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
  "〜さん の へや は どんな へや ですか。(Two Adjectives)",
  "〜さん は どんな ひと ですか。(Two Adjectives)",
  "〜さん、ひるごはん を たべ に いきませんか。",
  "いらっしゃいませ！ごちゅうもん は？",
  "(after the meal, you want to pay the bill separately) ３０００えん です。",
  "(we are friends) のど が かわきましたね。",
  "にもつ が おおい ですね。もちましょうか。",
  "go straight and turn left (right) at the traffic light. stop in the front of that flower shop.",
  "(at the immigration control) パスポートを みせてください。",
  "すみません。ちょっと おかね を かしてください。",
  "You want to take a photo but don't know if you can do that. Ask for permission",
  "You want to use a computer but don't know if you can do that. Ask for permission",
  "You want to use a pen but don't know if you can do that. Ask for permission"
]

const allVocabQuestions = [
  "かきます",
  "ききます",
  "はたらきます",
  "いきます",
  "およぎます",
  "いそぎます",
  "のみます",
  "よみます",
  "やすみます",
  "あそびます",
  "よびます",
  "かいます",
  "すいます",
  "あいます",
  "ならいます",
  "もらいます",
  "てつだいます",
  "まちます",
  "もちます",
  "とります",
  "きります",
  "あります",
  "かえります",
  "おわります",
  "おくります",
  "わかります",
  "かかります",
  "はいります",
  "まがります",
  "けします",
  "かします",
  "だします",
  "はなします",
  "ねます",
  "でます",
  "たべます",
  "あげます",
  "かけます",
  "つけます",
  "あけます",
  "みせます",
  "おしえます",
  "むかえます",
  "つかれます",
  "しめます",
  "とめます",
  "はじめます",
  "みます",
  "います",
  "おきます",
  "かります",
  "おります",
  "あびます",
  "できます",
  "たります",
  "します",
  "べんきょうします",
  "けっこんします",
  "かいものします",
  "しょくじします",
  "さんぽします",
  "コピーします",
  "きます",
  "もってきます",
  "つれてきます",
]

function App() {
  const [count, setCount] = useState<number>(0);
  const [vocabMode, setVocabMode] = useState<boolean>(false);
  const randomWord = useMemo(() => {
    if (!vocabMode)
      return allQuestion[Math.floor(Math.random() * (allQuestion.length))]
    return allVocabQuestions[Math.floor(Math.random() * (allVocabQuestions.length))]
  }, [count, vocabMode])

  return (
    <div className='w-full h-screen'>
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col gap-3 border-2 rounded max-w-7xl w-5/6 lg:w-2/5 p-10 sm:w-4/5 ">
          {
            !vocabMode &&
            <div className='font-bold text-3xl flex justify-center'>
              {randomWord}
            </div>
          }
          {
            vocabMode &&
            <div className='text-xl flex justify-center items-center flex-col gap-2'>
              {vocabMode && <p>Meaning, Group, and Te form?</p>}
              <p className="text-3xl font-bold">
                {randomWord}
              </p>
            </div>
          }

          <span className="font-thin m-auto">
            Number: {count + 1}
          </span>
          <div className="flex justify-center">
            <div className="flex gap-2 flex-col sm:flex-row">
              <button className='btn-neutral btn max-w-60 m-auto' onClick={() => setVocabMode((prev) => !prev)}>
                {vocabMode ? "Switch to sentence" : "Switch to Vocab"}
              </button>
              <button onClick={() => setCount((current) => current + 1)} className="btn btn-primary max-w-60 m-auto">
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default App
